/*
 * Renders each doc page to a PDF buffer via headless Chromium.
 *
 * For every entry of kind 'doc' it returns:
 *   {
 *     docId,
 *     title,         // text of the first <h1>
 *     pdfBytes,      // Uint8Array PDF buffer
 *     headings: [{ level, text, anchor, pageOffset }],
 *     pageCount,     // page count for this doc's PDF
 *   }
 *
 * Heading 'pageOffset' is the 0-based page index inside the doc's PDF.
 * The merger turns those into absolute page numbers for the TOC + outline.
 */

const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const PRINT_CSS = fs.readFileSync(
  path.join(__dirname, '..', 'print.css'),
  'utf8',
);

const PAGE_OPTIONS = {
  format: 'A4',
  printBackground: true,
  margin: {
    top: '20mm',
    bottom: '20mm',
    left: '20mm',
    right: '20mm',
  },
  preferCSSPageSize: false,
};

async function preparePage(page, url) {
  await page.emulateMediaType('print');
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 90_000 });
  await page.addStyleTag({ content: PRINT_CSS });

  // Wait for Mermaid diagrams to finish client-side rendering.
  await page
    .waitForFunction(
      () => {
        const containers = document.querySelectorAll(
          '.docusaurus-mermaid-container, .mermaid',
        );
        if (containers.length === 0) return true;
        return Array.from(containers).every((el) => el.querySelector('svg'));
      },
      { timeout: 45_000, polling: 250 },
    )
    .catch(() => {
      // Page either has no mermaid or it failed to render in time; continue.
    });

  // Web fonts ready (best-effort).
  await page
    .evaluate(() => (document.fonts ? document.fonts.ready : null))
    .catch(() => {});
}

async function extractHeadings(page) {
  return page.evaluate(() => {
    const article =
      document.querySelector('article') ||
      document.querySelector('main') ||
      document.body;
    if (!article) return { title: null, headings: [] };
    const nodes = article.querySelectorAll('h1, h2, h3');
    const headings = [];
    let title = null;
    nodes.forEach((node) => {
      const level = Number(node.tagName.substring(1));
      // Strip anchor link characters like '#' that Docusaurus appends
      const raw = node.innerText || node.textContent || '';
      const text = raw.replace(/\s*#\s*$/, '').trim();
      if (!text) return;
      if (level === 1 && !title) title = text;
      headings.push({ level, text, anchor: node.id || null });
    });
    return { title, headings };
  });
}

/**
 * Approximate page index for each heading inside a freshly-rendered page.
 * Done client-side by measuring bounding boxes against the print area.
 *
 * This is intentionally rough: it returns the 0-based PDF page where the
 * heading is expected to appear (so the TOC links land near the right
 * spot). Exact positioning would require parsing PDF text positions.
 */
async function measureHeadingPages(page) {
  return page.evaluate(() => {
    // Approximate printable height for A4 with 20mm top/bottom margins
    // (effective ~257mm tall). At ~96dpi that's ~972px. The browser
    // uses CSS pixels for layout, so this is a reasonable proxy.
    const PRINT_HEIGHT_PX = 972;
    const article =
      document.querySelector('article') ||
      document.querySelector('main') ||
      document.body;
    if (!article) return [];
    const nodes = article.querySelectorAll('h1, h2, h3');
    const articleTop = article.getBoundingClientRect().top + window.scrollY;
    const result = [];
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const top = rect.top + window.scrollY - articleTop;
      const pageOffset = Math.max(0, Math.floor(top / PRINT_HEIGHT_PX));
      result.push({
        level: Number(node.tagName.substring(1)),
        pageOffset,
      });
    });
    return result;
  });
}

async function renderDoc(browser, baseUrl, docId) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1024, height: 1400 });
    const url = `${baseUrl}/docs/${docId}/index.html`;
    await preparePage(page, url);

    const { title, headings } = await extractHeadings(page);
    const positions = await measureHeadingPages(page);
    // Pair headings with their pageOffset by index (same DOM order).
    const merged = headings.map((h, i) => ({
      ...h,
      pageOffset: positions[i] ? positions[i].pageOffset : 0,
    }));

    const pdfBytes = await page.pdf(PAGE_OPTIONS);
    const pdf = await PDFDocument.load(pdfBytes);
    const pageCount = pdf.getPageCount();

    return {
      docId,
      title: title || docId,
      pdfBytes,
      headings: merged,
      pageCount,
    };
  } finally {
    await page.close();
  }
}

async function renderHtmlToPdf(browser, html) {
  const page = await browser.newPage();
  try {
    await page.emulateMediaType('print');
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const bytes = await page.pdf(PAGE_OPTIONS);
    return bytes;
  } finally {
    await page.close();
  }
}

module.exports = { renderDoc, renderHtmlToPdf };
