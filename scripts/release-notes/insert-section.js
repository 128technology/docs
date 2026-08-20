#!/usr/bin/env node
/**
 * insert-section.js — Insert a release notes section into an existing file.
 *
 * Usage:
 *   node scripts/release-notes/insert-section.js --file <release-notes.md> --section <section.md> --before "## Release X"
 *   node scripts/release-notes/insert-section.js --file <release-notes.md> --section <section.md> --append
 *
 * Inserts the content of <section.md> into <release-notes.md> immediately before
 * the specified heading, or appends to the end of the file.
 */

const fs = require('fs');
const path = require('path');

function printHelp() {
  console.log(`
insert-section.js — Insert a release notes section into an existing file.

Usage:
  node scripts/release-notes/insert-section.js --file <release-notes.md> --section <section.md> --before "## Release X"
  node scripts/release-notes/insert-section.js --file <release-notes.md> --section <section.md> --append

Options:
  --file      Path to the existing release notes markdown file to modify
  --section   Path to the markdown section file to insert
  --before    The heading text to insert before (e.g., "## Release 7.0.1-1r1")
  --append    Append the section to the end of the file instead
  --help      Show this help message

The file is modified in-place. A blank line is added between the inserted section
and the following content.
`);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--help' || argv[i] === '-h') {
      args.help = true;
    } else if (argv[i] === '--file' && argv[i + 1]) {
      args.file = argv[++i];
    } else if (argv[i] === '--section' && argv[i + 1]) {
      args.section = argv[++i];
    } else if (argv[i] === '--before' && argv[i + 1]) {
      args.before = argv[++i];
    } else if (argv[i] === '--append') {
      args.append = true;
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (!args.file || !args.section) {
    console.error('Error: --file and --section are required. Use --help for usage.');
    process.exit(1);
  }

  if (!args.before && !args.append) {
    console.error('Error: Either --before or --append must be specified. Use --help for usage.');
    process.exit(1);
  }

  const filePath = path.resolve(args.file);
  const sectionPath = path.resolve(args.section);

  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
  }
  if (!fs.existsSync(sectionPath)) {
    console.error(`Error: Section file not found: ${sectionPath}`);
    process.exit(1);
  }

  const existing = fs.readFileSync(filePath, 'utf8');
  const section = fs.readFileSync(sectionPath, 'utf8');

  let updated;

  if (args.append) {
    // Append to end with a blank line separator
    updated = existing.trimEnd() + '\n\n' + section;
  } else {
    // Insert before the specified heading
    const idx = existing.indexOf(args.before);
    if (idx === -1) {
      console.error(`Error: Heading not found in file: "${args.before}"`);
      console.error('Available ## headings:');
      const headings = existing.match(/^## .+$/gm) || [];
      headings.forEach(h => console.error(`  ${h}`));
      process.exit(1);
    }
    updated = existing.slice(0, idx) + section + '\n' + existing.slice(idx);
  }

  fs.writeFileSync(filePath, updated);
  console.log(`Inserted section into ${filePath}`);
  if (args.before) {
    console.log(`  Position: before "${args.before}"`);
  } else {
    console.log('  Position: appended to end of file');
  }
}

main();
