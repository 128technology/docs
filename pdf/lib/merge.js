/*
 * Merges per-doc PDF buffers (plus cover + TOC) into a single PDF and
 * post-processes it to:
 *
 *   1. Rewrite TOC link annotations (URI -> GoTo absolute page).
 *   2. Build a PDF outline (bookmarks) from the parts/chapters/docs tree.
 *   3. Stamp "Page N / M" in the bottom margin of every page except cover.
 */

const {
  PDFDocument,
  PDFName,
  PDFDict,
  PDFArray,
  PDFNumber,
  PDFString,
  PDFRef,
  StandardFonts,
  rgb,
} = require('pdf-lib');

const TARGET_URI_PREFIX = 'https://pdf.local/target/';

/**
 * @param {Object} params
 * @param {Uint8Array} params.coverPdf
 * @param {Uint8Array} params.tocPdf            placeholder, may be replaced
 * @param {Array} params.docs                   from render-pages
 * @param {Array} params.flatSidebar            from sidebar-walker
 * @param {Map<number, {kind, pageOffset, doc}>} params.targetMap
 *        Map of targetId (used in TOC HTML) -> { docId, pageOffset }
 *        where pageOffset is into that doc's PDF.
 * @returns {Promise<Uint8Array>}
 */
async function mergeAll({ coverPdf, tocPdf, docs, flatSidebar, targetMap }) {
  const merged = await PDFDocument.create();

  // 1. Embed cover
  const coverSrc = await PDFDocument.load(coverPdf);
  const coverPages = await merged.copyPages(coverSrc, coverSrc.getPageIndices());
  coverPages.forEach((p) => merged.addPage(p));
  const coverPageCount = coverPages.length;

  // 2. Embed TOC (we'll know its page count so we can compute absolute
  //    page numbers for everything that follows).
  const tocSrc = await PDFDocument.load(tocPdf);
  const tocPages = await merged.copyPages(tocSrc, tocSrc.getPageIndices());
  tocPages.forEach((p) => merged.addPage(p));
  const tocPageCount = tocPages.length;

  // 3. Embed each doc and record absolute start page (0-based) by docId.
  const docStarts = new Map(); // docId -> absolute 0-based page index
  for (const d of docs) {
    const src = await PDFDocument.load(d.pdfBytes);
    const pages = await merged.copyPages(src, src.getPageIndices());
    const startIdx = merged.getPageCount();
    pages.forEach((p) => merged.addPage(p));
    docStarts.set(d.docId, startIdx);
  }

  // 4. Rewrite TOC link annotations from URI -> GoTo absolute page.
  const tocAbsoluteStart = coverPageCount; // 0-based
  const allPages = merged.getPages();
  for (let i = 0; i < tocPageCount; i += 1) {
    rewriteLinkAnnots(allPages[tocAbsoluteStart + i], (uri) => {
      if (!uri.startsWith(TARGET_URI_PREFIX)) return null;
      const id = Number(uri.slice(TARGET_URI_PREFIX.length));
      const target = targetMap.get(id);
      if (!target) return null;
      const docStart = docStarts.get(target.docId);
      if (docStart == null) return null;
      const absPage = docStart + (target.pageOffset || 0);
      return absPage;
    });
  }

  // 5. Build outline (bookmarks).
  buildOutline(merged, { flatSidebar, docs, docStarts, tocAbsoluteStart });

  // 6. Stamp page numbers (skip cover).
  await stampPageNumbers(merged, { skip: coverPageCount });

  return merged.save();
}

/* ---------- link annotation rewriting ---------- */

function rewriteLinkAnnots(page, mapUriToAbsPage) {
  const annots = page.node.lookup(PDFName.of('Annots'));
  if (!annots || !(annots instanceof PDFArray)) return;
  const pdfDoc = page.doc;
  const allPages = pdfDoc.getPages();

  for (let i = 0; i < annots.size(); i += 1) {
    const annot = annots.lookup(i, PDFDict);
    if (!annot) continue;
    const subtype = annot.lookup(PDFName.of('Subtype'));
    if (subtype !== PDFName.of('Link')) continue;
    const action = annot.lookup(PDFName.of('A'), PDFDict);
    if (!action) continue;
    const s = action.lookup(PDFName.of('S'));
    if (s !== PDFName.of('URI')) continue;
    const uriObj = action.lookup(PDFName.of('URI'));
    if (!uriObj) continue;
    const uri = uriObj.asString ? uriObj.asString() : String(uriObj);
    const absPage = mapUriToAbsPage(uri);
    if (absPage == null) continue;
    const targetPage = allPages[absPage];
    if (!targetPage) continue;

    // Replace URI action with a Dest pointing to /XYZ top-of-page.
    annot.delete(PDFName.of('A'));
    const dest = PDFArray.withContext(pdfDoc.context);
    dest.push(targetPage.ref);
    dest.push(PDFName.of('XYZ'));
    dest.push(pdfDoc.context.obj(null));
    dest.push(pdfDoc.context.obj(null));
    dest.push(pdfDoc.context.obj(null));
    annot.set(PDFName.of('Dest'), dest);
  }
}

/* ---------- outline (bookmarks) ---------- */

/**
 * The outline mirrors the sidebar tree:
 *   Part
 *     Chapter (optional, may nest)
 *       Doc title (H1)
 *
 * Doc-level H2/H3 entries are intentionally not added to bookmarks to
 * keep the outline manageable; they appear in the TOC instead.
 */
function buildOutline(pdfDoc, { flatSidebar, docs, docStarts }) {
  const context = pdfDoc.context;

  // Build node tree from the flat sidebar.
  // Each node: { title, pageRef|null, children:[] }
  const root = { title: null, pageRef: null, children: [] };
  const stack = [{ depth: -1, node: root }];

  const docMeta = new Map(docs.map((d) => [d.docId, d]));
  const allPages = pdfDoc.getPages();

  for (const entry of flatSidebar) {
    while (stack.length > 1 && stack[stack.length - 1].depth >= entry.depth) {
      stack.pop();
    }
    const parent = stack[stack.length - 1].node;

    let title = entry.title;
    let pageRef = null;
    if (entry.kind === 'doc') {
      const meta = docMeta.get(entry.docId);
      if (!meta) continue;
      title = meta.title || entry.docId;
      const abs = docStarts.get(entry.docId);
      if (abs != null && allPages[abs]) pageRef = allPages[abs].ref;
    }

    const node = { title, pageRef, children: [] };
    parent.children.push(node);

    if (entry.kind !== 'doc') {
      stack.push({ depth: entry.depth, node });
    }
  }

  if (root.children.length === 0) return;

  // Walk the tree and create PDFDict outline items.
  // We create refs first so parents can reference children.
  const outlinesRef = context.nextRef();
  const outlinesDict = context.obj({});
  outlinesDict.set(PDFName.of('Type'), PDFName.of('Outlines'));

  const built = buildOutlineNodes(context, root.children, outlinesRef);
  if (built.firstRef) {
    outlinesDict.set(PDFName.of('First'), built.firstRef);
    outlinesDict.set(PDFName.of('Last'), built.lastRef);
    outlinesDict.set(PDFName.of('Count'), PDFNumber.of(built.openCount));
  }
  context.assign(outlinesRef, outlinesDict);

  pdfDoc.catalog.set(PDFName.of('Outlines'), outlinesRef);
}

function buildOutlineNodes(context, nodes, parentRef) {
  if (!nodes || nodes.length === 0) {
    return { firstRef: null, lastRef: null, openCount: 0 };
  }

  // First, allocate refs for every node at this level.
  const refs = nodes.map(() => context.nextRef());
  let openCount = nodes.length;

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    const dict = context.obj({});
    dict.set(PDFName.of('Title'), PDFString.of(node.title || ''));
    dict.set(PDFName.of('Parent'), parentRef);
    if (i > 0) dict.set(PDFName.of('Prev'), refs[i - 1]);
    if (i < nodes.length - 1) dict.set(PDFName.of('Next'), refs[i + 1]);

    // Destination — prefer this node's own page, otherwise first descendant
    // with a page so clicking a part jumps somewhere useful.
    const pageRef = node.pageRef || firstDescendantPage(node);
    if (pageRef) {
      const dest = PDFArray.withContext(context);
      dest.push(pageRef);
      dest.push(PDFName.of('XYZ'));
      dest.push(context.obj(null));
      dest.push(context.obj(null));
      dest.push(context.obj(null));
      dict.set(PDFName.of('Dest'), dest);
    }

    if (node.children && node.children.length > 0) {
      const child = buildOutlineNodes(context, node.children, refs[i]);
      if (child.firstRef) {
        dict.set(PDFName.of('First'), child.firstRef);
        dict.set(PDFName.of('Last'), child.lastRef);
        // Negative count = collapsed by default; positive = expanded.
        dict.set(PDFName.of('Count'), PDFNumber.of(-child.openCount));
      }
    }

    context.assign(refs[i], dict);
  }

  return {
    firstRef: refs[0],
    lastRef: refs[refs.length - 1],
    openCount,
  };
}

function firstDescendantPage(node) {
  if (!node.children) return null;
  for (const c of node.children) {
    if (c.pageRef) return c.pageRef;
    const deeper = firstDescendantPage(c);
    if (deeper) return deeper;
  }
  return null;
}

/* ---------- page numbers ---------- */

async function stampPageNumbers(pdfDoc, { skip = 0 } = {}) {
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const total = pages.length;
  for (let i = 0; i < total; i += 1) {
    if (i < skip) continue;
    const page = pages[i];
    const { width } = page.getSize();
    const text = `Page ${i - skip + 1} / ${total - skip}`;
    const size = 8;
    const textWidth = font.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: (width - textWidth) / 2,
      y: 18, // ~6mm above the bottom edge of A4
      size,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
  }
}

module.exports = { mergeAll };
