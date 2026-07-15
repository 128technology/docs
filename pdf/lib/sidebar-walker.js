/*
 * Flattens the Docusaurus sidebars.js "docs" tree into an ordered list
 * of entries used to drive PDF rendering and TOC/outline construction.
 *
 * Each entry has:
 *   { kind: 'part' | 'chapter' | 'doc', title, docId?, depth, path[] }
 *
 * - kind 'part': a top-level group label in sidebars.js (e.g. "About").
 * - kind 'chapter': a nested { type: 'category', label, items } object.
 * - kind 'doc': a doc id string (referenced by Docusaurus).
 *
 * 'path' is the array of ancestor titles, used to build the outline tree.
 */

const path = require('path');

function flatten(sidebars) {
  const out = [];
  const docs = sidebars.docs;
  if (!docs || typeof docs !== 'object') {
    throw new Error('sidebars.js does not export a "docs" object');
  }

  for (const [partLabel, items] of Object.entries(docs)) {
    out.push({ kind: 'part', title: partLabel, depth: 0, path: [partLabel] });
    walkItems(items, 1, [partLabel], out);
  }
  return out;
}

function walkItems(items, depth, ancestors, out) {
  if (!Array.isArray(items)) return;
  for (const item of items) {
    if (typeof item === 'string') {
      out.push({
        kind: 'doc',
        docId: item,
        title: null, // resolved later from the rendered <h1>
        depth,
        path: ancestors,
      });
    } else if (item && item.type === 'category') {
      const label = item.label || '(unnamed category)';
      const nextAncestors = ancestors.concat([label]);
      out.push({ kind: 'chapter', title: label, depth, path: nextAncestors });
      walkItems(item.items, depth + 1, nextAncestors, out);
    }
  }
}

function loadFlatSidebar(repoRoot) {
  const sidebarsPath = path.join(repoRoot, 'sidebars.js');
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const sidebars = require(sidebarsPath);
  return flatten(sidebars);
}

module.exports = { flatten, loadFlatSidebar };
