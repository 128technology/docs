#!/usr/bin/env node
/*
 * Orchestrator. Run with:
 *
 *   cd pdf && npm install
 *   node build-pdf.js                  # uses ../build, builds if missing
 *   node build-pdf.js --rebuild        # forces a fresh `yarn build`
 *   node build-pdf.js --site ../build  # explicit site dir
 *   node build-pdf.js --out out/ssr-docs.pdf
 *
 * Pipeline:
 *   1. Ensure the static site exists (optionally run `yarn build`).
 *   2. Serve it locally.
 *   3. Walk sidebars.js -> flat ordered list.
 *   4. Render every doc page to its own PDF buffer with Puppeteer.
 *   5. Build cover + TOC HTML, render those to PDF.
 *   6. Merge everything, rewrite TOC links, add outline, stamp page numbers.
 *   7. Write the final PDF.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const puppeteer = require('puppeteer');

const { loadFlatSidebar } = require('./lib/sidebar-walker');
const { startServer } = require('./lib/server');
const { renderDoc, renderHtmlToPdf } = require('./lib/render-pages');
const { buildCoverHtml, buildTocHtml } = require('./lib/templates');
const { mergeAll } = require('./lib/merge');

const REPO_ROOT = path.resolve(__dirname, '..');
const DEFAULT_SITE = path.join(REPO_ROOT, 'build');
const DEFAULT_OUT = path.join(__dirname, 'out', 'ssr-docs.pdf');

function parseArgs(argv) {
  const opts = {
    rebuild: false,
    site: DEFAULT_SITE,
    out: DEFAULT_OUT,
    limit: null,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--rebuild') opts.rebuild = true;
    else if (a === '--site') opts.site = path.resolve(argv[++i]);
    else if (a === '--out') opts.out = path.resolve(argv[++i]);
    else if (a === '--limit') opts.limit = Number(argv[++i]);
    else if (a === '-h' || a === '--help') {
      process.stdout.write(
        'Usage: node build-pdf.js [--rebuild] [--site DIR] [--out FILE] [--limit N]\n',
      );
      process.exit(0);
    }
  }
  return opts;
}

function ensureSite({ site, rebuild }) {
  const indexHtml = path.join(site, 'index.html');
  if (!rebuild && fs.existsSync(indexHtml)) {
    log(`Using existing build at ${site}`);
    return;
  }
  log(`Running \`yarn build\` (this may take a few minutes)...`);
  const res = spawnSync('yarn', ['build'], {
    cwd: REPO_ROOT,
    stdio: 'inherit',
  });
  if (res.status !== 0) {
    throw new Error(`yarn build failed with exit code ${res.status}`);
  }
  if (!fs.existsSync(indexHtml)) {
    throw new Error(`Expected ${indexHtml} after build but it does not exist`);
  }
}

function log(msg) {
  // eslint-disable-next-line no-console
  console.log(`[pdf] ${msg}`);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  ensureSite(opts);

  const flatSidebar = loadFlatSidebar(REPO_ROOT);
  const docEntries = flatSidebar.filter((e) => e.kind === 'doc');
  const renderList = opts.limit
    ? docEntries.slice(0, opts.limit)
    : docEntries;
  log(
    `Sidebar yielded ${flatSidebar.length} entries (${docEntries.length} docs; rendering ${renderList.length}).`,
  );

  const { baseUrl, close } = await startServer(opts.site);
  log(`Serving site at ${baseUrl}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    // Render every doc.
    const docs = [];
    const renderedDocIds = new Set();
    for (let i = 0; i < renderList.length; i += 1) {
      const entry = renderList[i];
      const idx = `${i + 1}/${renderList.length}`;
      try {
        const result = await renderDoc(browser, baseUrl, entry.docId);
        docs.push(result);
        renderedDocIds.add(entry.docId);
        log(`  [${idx}] ${entry.docId} (${result.pageCount}p)`);
      } catch (err) {
        log(`  [${idx}] FAILED ${entry.docId}: ${err.message}`);
      }
    }

    // Build TOC entries with target ids.
    let nextId = 1;
    const targetMap = new Map();
    const tocEntries = [];

    // Filter the flat sidebar down to just what actually rendered so we
    // don't TOC something that didn't make it into the PDF.
    const renderedFlat = flatSidebar.filter(
      (e) => e.kind !== 'doc' || renderedDocIds.has(e.docId),
    );

    // For each doc we add an entry for the doc title + each H2/H3.
    const docMeta = new Map(docs.map((d) => [d.docId, d]));
    for (const entry of renderedFlat) {
      if (entry.kind === 'part') {
        tocEntries.push({ level: 1, text: entry.title, targetId: null });
        continue;
      }
      if (entry.kind === 'chapter') {
        tocEntries.push({ level: 2, text: entry.title, targetId: null });
        continue;
      }
      // doc
      const meta = docMeta.get(entry.docId);
      if (!meta) continue;

      // Doc title (page H1) at level 2 (or 3 if nested under a chapter).
      // Per spec: TOC contains only the doc title / H1 — no H2/H3 sub-entries.
      const docLevel = entry.depth >= 2 ? 3 : 2;
      const titleTargetId = nextId++;
      targetMap.set(titleTargetId, { docId: entry.docId, pageOffset: 0 });
      tocEntries.push({
        level: docLevel,
        text: meta.title || entry.docId,
        targetId: titleTargetId,
      });
    }

    log(`TOC contains ${tocEntries.length} entries.`);

    // Render cover + TOC PDFs.
    const today = new Date().toISOString().slice(0, 10);
    const coverHtml = buildCoverHtml({
      title: 'Session Smart Networking Platform Documentation',
      subtitle: `Build date: ${today}`,
    });
    const coverPdf = await renderHtmlToPdf(browser, coverHtml);
    log('Rendered cover.');

    const tocHtml = buildTocHtml(tocEntries);
    const tocPdf = await renderHtmlToPdf(browser, tocHtml);
    log('Rendered TOC.');

    // Merge.
    log('Merging...');
    const finalBytes = await mergeAll({
      coverPdf,
      tocPdf,
      docs,
      flatSidebar: renderedFlat,
      targetMap,
    });

    fs.mkdirSync(path.dirname(opts.out), { recursive: true });
    fs.writeFileSync(opts.out, finalBytes);
    log(`Wrote ${opts.out} (${(finalBytes.length / 1024 / 1024).toFixed(2)} MB)`);
  } finally {
    await browser.close();
    await close();
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
