#!/usr/bin/env node
/**
 * find-existing-entries.js — Search existing release notes for reusable entry text.
 *
 * Usage:
 *   node scripts/release-notes/find-existing-entries.js --keys <keys.txt> --found <found.json> --not-found <needs.txt> [--docs-dir docs/]
 *
 * Input:  Newline-separated file of issue keys to search for
 * Output: JSON mapping of key → entry text for found entries, plus a text file of keys not found
 */

const fs = require('fs');
const path = require('path');
const { globSync } = (() => {
  // Use native glob if available (Node 22+), otherwise fall back to manual
  try {
    const { globSync } = require('fs');
    if (globSync) return { globSync };
  } catch (e) {}
  return { globSync: null };
})();

function printHelp() {
  console.log(`
find-existing-entries.js — Search existing release notes for reusable entry text.

Usage:
  node scripts/release-notes/find-existing-entries.js --keys <keys.txt> --found <found.json> --not-found <needs.txt> [--docs-dir docs/]

Options:
  --keys       Path to newline-separated file of issue keys to search for
  --found      Path to write JSON mapping { "KEY": "- **KEY ...** ..." } for found entries
  --not-found  Path to write newline-separated list of keys without existing entries
  --docs-dir   Directory to search for release_notes_128t_*.md files (default: docs/)
  --help       Show this help message

The script searches all release_notes_128t_*.md files for lines matching:
  - **<KEY> ...
and returns the first match found (preferring 7.x files over 6.x).
`);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--help' || argv[i] === '-h') {
      args.help = true;
    } else if (argv[i] === '--keys' && argv[i + 1]) {
      args.keys = argv[++i];
    } else if (argv[i] === '--found' && argv[i + 1]) {
      args.found = argv[++i];
    } else if (argv[i] === '--not-found' && argv[i + 1]) {
      args.notFound = argv[++i];
    } else if (argv[i] === '--docs-dir' && argv[i + 1]) {
      args.docsDir = argv[++i];
    }
  }
  return args;
}

function findReleaseNotesFiles(docsDir) {
  const entries = fs.readdirSync(docsDir);
  const files = entries
    .filter(f => /^release_notes_128t_\d+\.\d+\.md$/.test(f))
    .map(f => path.join(docsDir, f));

  // Sort so that higher versions come first (prefer recent entries)
  files.sort((a, b) => {
    const va = a.match(/(\d+)\.(\d+)/);
    const vb = b.match(/(\d+)\.(\d+)/);
    if (!va || !vb) return 0;
    const majDiff = parseInt(vb[1]) - parseInt(va[1]);
    if (majDiff !== 0) return majDiff;
    return parseInt(vb[2]) - parseInt(va[2]);
  });

  return files;
}

function searchForEntry(key, files) {
  // Escape special regex chars in key
  const escaped = key.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const pattern = new RegExp(`^- \\*\\*${escaped}[^*]*\\*\\*:?.*$`, 'm');

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const match = content.match(pattern);
    if (match) {
      return match[0];
    }
  }
  return null;
}

function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (!args.keys || !args.found || !args.notFound) {
    console.error('Error: --keys, --found, and --not-found are required. Use --help for usage.');
    process.exit(1);
  }

  const docsDir = path.resolve(args.docsDir || 'docs');
  const keysPath = path.resolve(args.keys);

  if (!fs.existsSync(keysPath)) {
    console.error(`Error: Keys file not found: ${keysPath}`);
    process.exit(1);
  }

  const keys = fs.readFileSync(keysPath, 'utf8').trim().split('\n').filter(Boolean);
  const files = findReleaseNotesFiles(docsDir);

  if (files.length === 0) {
    console.error(`Error: No release_notes_128t_*.md files found in ${docsDir}`);
    process.exit(1);
  }

  const found = {};
  const notFound = [];

  for (const key of keys) {
    const entry = searchForEntry(key, files);
    if (entry) {
      found[key] = entry;
    } else {
      notFound.push(key);
    }
  }

  const foundPath = path.resolve(args.found);
  const notFoundPath = path.resolve(args.notFound);
  fs.mkdirSync(path.dirname(foundPath), { recursive: true });
  fs.mkdirSync(path.dirname(notFoundPath), { recursive: true });

  fs.writeFileSync(foundPath, JSON.stringify(found, null, 2));
  fs.writeFileSync(notFoundPath, notFound.join('\n'));

  console.log(`Searched ${keys.length} keys across ${files.length} release notes files:`);
  console.log(`  Found:     ${Object.keys(found).length}`);
  console.log(`  Not found: ${notFound.length}`);
  console.log(`Output: ${foundPath}, ${notFoundPath}`);
}

main();
