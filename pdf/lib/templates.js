/*
 * HTML templates for the cover page and the table of contents.
 *
 * Both are rendered to PDF via Puppeteer in the same A4 format used
 * for the docs so the merged document is visually consistent.
 *
 * TOC links use href="https://pdf.local/target/<n>" placeholders.
 * After merge, the orchestrator rewrites the matching link annotations
 * to GoTo actions pointing at absolute page numbers in the final
 * document.
 */

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildCoverHtml({ title, subtitle }) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @page { size: A4; margin: 20mm; }
  html, body { height: 100%; margin: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    text-align: center; color: #111;
  }
  h1 { font-size: 32pt; margin: 0 0 24pt; line-height: 1.2; }
  .subtitle { font-size: 14pt; color: #555; }
</style></head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <div class="subtitle">${escapeHtml(subtitle)}</div>
</body></html>`;
}

/**
 * Build TOC HTML.
 *
 * @param {Array} tocEntries  Flat entry list. Each entry:
 *   { level: 1|2|3|4, text, targetId }
 *   - level 1: part heading
 *   - level 2: chapter or doc title (depending on flattening)
 *   - level 3: H2 inside a doc
 *   - level 4: H3 inside a doc
 *   targetId is a unique integer used to wire up post-merge link rewriting.
 *   For non-clickable entries (parts, chapters), pass targetId = null.
 */
function buildTocHtml(tocEntries) {
  const rows = tocEntries
    .map((e) => {
      const cls = `lvl${e.level}`;
      if (e.targetId == null) {
        return `<div class="${cls} entry"><span class="text">${escapeHtml(e.text)}</span></div>`;
      }
      return `<div class="${cls} entry"><a href="https://pdf.local/target/${e.targetId}"><span class="text">${escapeHtml(e.text)}</span></a></div>`;
    })
    .join('\n');

  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @page { size: A4; margin: 20mm; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 10.5pt; color: #111;
  }
  h1 { font-size: 22pt; margin: 0 0 16pt; }
  .entry { margin: 2pt 0; line-height: 1.4; }
  .entry a { color: #0a58ca; text-decoration: none; }
  .lvl1 { font-weight: 700; font-size: 13pt; margin-top: 12pt; }
  .lvl2 { margin-left: 12pt; font-weight: 600; }
  .lvl3 { margin-left: 28pt; }
  .lvl4 { margin-left: 44pt; color: #444; font-size: 9.5pt; }
</style></head>
<body>
  <h1>Table of Contents</h1>
  ${rows}
</body></html>`;
}

module.exports = { buildCoverHtml, buildTocHtml };
