# SSR Documentation PDF Generator

Generates a single PDF of all SSR documentation listed in
[`../sidebars.js`](../sidebars.js).

The tool drives a headless Chromium against the standard Docusaurus
production build (`../build/`), so every page is rendered exactly as it
appears on the live site — including MDX components, partials, Mermaid
diagrams, syntax-highlighted code, tables and images.

## Output

- A4 page size, 20mm margins, footer page numbers.
- Cover page (title + build date).
- Clickable table of contents for document titles (H1).
- PDF outline / bookmarks following the sidebar structure.
- Single file at `pdf/out/ssr-docs.pdf` by default.

## Prerequisites

- Node 18+ (matches the repo's `engines` constraint).
- A working `yarn build` in the repo root (the tool can run this for
  you).

## Install

```bash
cd pdf
npm install
```

The first `npm install` downloads Puppeteer's bundled Chromium (~150 MB).

## Run

```bash
# Use existing ../build, build if missing
node build-pdf.js

# Force a fresh `yarn build` first
node build-pdf.js --rebuild

# Render only the first 5 docs (useful while iterating)
node build-pdf.js --limit 5

# Custom output location
node build-pdf.js --out out/ssr-docs-2026-05.pdf
```

## How it works

1. Ensures `../build/` exists (runs `yarn build` if not, or if
   `--rebuild` is passed).
2. Starts a local static server on a random port serving `../build/`.
3. Loads `../sidebars.js` and flattens the `docs` tree into an ordered
   list of `part` / `chapter` / `doc` entries.
4. For every doc entry, opens `/docs/<docId>` in headless Chromium,
   injects a print stylesheet (hides navbar, sidebar, footer, edit
   links, pagination), waits for Mermaid SVGs to render, then captures
   a PDF via `page.pdf()`.
5. Renders a cover HTML and a TOC HTML to PDF. TOC entries point at
   placeholder URIs (`https://pdf.local/target/<n>`).
6. Merges cover + TOC + every doc PDF with `pdf-lib`, then:
   - rewrites TOC URI link annotations into in-document GoTo actions
     targeting the correct absolute page;
   - constructs a PDF outline (bookmarks) mirroring the sidebar
     structure;
   - stamps "Page N / M" in the bottom margin of every page after the
     cover.

## Files

- [build-pdf.js](build-pdf.js) — orchestrator.
- [print.css](print.css) — print stylesheet injected into each doc page.
- [lib/sidebar-walker.js](lib/sidebar-walker.js) — flattens
  `sidebars.js`.
- [lib/server.js](lib/server.js) — local static file server.
- [lib/render-pages.js](lib/render-pages.js) — Puppeteer renderer.
- [lib/templates.js](lib/templates.js) — cover + TOC HTML.
- [lib/merge.js](lib/merge.js) — PDF merge, link rewriting, outline,
  page numbers.

## Notes & limitations

- TOC sub-entries (H2 / H3) link to the page in the PDF where the
  heading is *approximately* located. The page offset is estimated by
  measuring the heading's vertical position in the browser against the
  effective A4 printable height. Top-of-doc links are always exact.
- KB articles (under `../kb/`) are intentionally not included; they are
  organized as a blog, not in `sidebars.js`.
- Re-running without `--rebuild` reuses an existing `../build/`. Delete
  the folder or pass `--rebuild` to force a fresh build.
