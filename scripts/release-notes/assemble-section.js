#!/usr/bin/env node
/**
 * assemble-section.js — Assemble a complete release notes section from components.
 *
 * Usage:
 *   node scripts/release-notes/assemble-section.js \
 *     --found <found.json> \
 *     --new <new-entries.json> \
 *     --cves <cves.txt> \
 *     --version <version> \
 *     --date <date> \
 *     --features <key1,key2,...> \
 *     --output <section.md>
 *
 * Input:
 *   --found     JSON mapping { "KEY": "- **KEY ...:** ..." } of reused entries
 *   --new       JSON mapping { "KEY": "- **KEY ...:** ..." } of newly synthesized entries
 *   --cves      Text file with comma-separated CVE list (or empty if no CVEs)
 *   --version   Release version string (e.g., "7.0.5-lts")
 *   --date      Release date string (e.g., "July 2026")
 *   --features  Comma-separated list of issue keys that are features/epics
 *   --caveats   (optional) Comma-separated list of issue keys that are caveats
 *
 * Output: Complete markdown section ready for insertion
 */

const fs = require('fs');
const path = require('path');

function printHelp() {
  console.log(`
assemble-section.js — Assemble a complete release notes section from components.

Usage:
  node scripts/release-notes/assemble-section.js \\
    --found <found.json> \\
    --new <new-entries.json> \\
    --cves <cves.txt> \\
    --version <version> \\
    --date <date> \\
    --features <key1,key2,...> \\
    [--caveats <key1,key2,...>] \\
    --output <section.md>

Options:
  --found      Path to JSON file mapping issue keys to reused entry text
  --new        Path to JSON file mapping issue keys to newly synthesized entry text
  --cves       Path to text file with comma-separated sorted CVE list (empty file = no CVEs)
  --version    Release version (e.g., "7.0.5-lts")
  --date       Release date (e.g., "July 2026")
  --features   Comma-separated issue keys categorized as features/epics
  --caveats    (optional) Comma-separated issue keys categorized as caveats
  --output     Path to write the assembled markdown section
  --help       Show this help message

Output structure:
  ## Release <version>
  **Release Date:** <date>
  ### New Features (if any feature keys present)
  ### Resolved Issues (CVE group first, then individual entries)
  ### Caveats (if any caveat keys present)
`);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--help' || argv[i] === '-h') {
      args.help = true;
    } else if (argv[i] === '--found' && argv[i + 1]) {
      args.found = argv[++i];
    } else if (argv[i] === '--new' && argv[i + 1]) {
      args.new = argv[++i];
    } else if (argv[i] === '--cves' && argv[i + 1]) {
      args.cves = argv[++i];
    } else if (argv[i] === '--version' && argv[i + 1]) {
      args.version = argv[++i];
    } else if (argv[i] === '--date' && argv[i + 1]) {
      args.date = argv[++i];
    } else if (argv[i] === '--features' && argv[i + 1]) {
      args.features = argv[++i];
    } else if (argv[i] === '--caveats' && argv[i + 1]) {
      args.caveats = argv[++i];
    } else if (argv[i] === '--output' && argv[i + 1]) {
      args.output = argv[++i];
    }
  }
  return args;
}

function sortByKey(a, b) {
  const ma = a.match(/^(.+?)-(\d+)$/);
  const mb = b.match(/^(.+?)-(\d+)$/);
  if (!ma || !mb) return 0;
  if (ma[1] !== mb[1]) return ma[1].localeCompare(mb[1]);
  return parseInt(ma[2]) - parseInt(mb[2]);
}

function buildSubsection(keys, allEntries) {
  const sorted = [...keys].sort(sortByKey);
  const lines = [];
  for (let i = 0; i < sorted.length; i++) {
    const entry = allEntries[sorted[i]];
    if (!entry) {
      console.warn(`Warning: No entry text found for ${sorted[i]}, skipping.`);
      continue;
    }
    lines.push(entry);
    if (i < sorted.length - 1) {
      lines.push('------');
    }
  }
  return lines.join('\n');
}

function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (!args.found || !args.new || !args.cves || !args.version || !args.date || !args.output) {
    console.error('Error: --found, --new, --cves, --version, --date, and --output are required. Use --help for usage.');
    process.exit(1);
  }

  // Load inputs
  const foundEntries = JSON.parse(fs.readFileSync(path.resolve(args.found), 'utf8'));
  const newEntries = JSON.parse(fs.readFileSync(path.resolve(args.new), 'utf8'));
  const cvesText = fs.readFileSync(path.resolve(args.cves), 'utf8').trim();
  const featureKeys = new Set((args.features || '').split(',').filter(Boolean));
  const caveatKeys = new Set((args.caveats || '').split(',').filter(Boolean));

  // Merge all entries
  const allEntries = { ...foundEntries, ...newEntries };
  const allKeys = Object.keys(allEntries);

  // Partition keys into sections
  const featureList = allKeys.filter(k => featureKeys.has(k));
  const caveatList = allKeys.filter(k => caveatKeys.has(k));
  const resolvedList = allKeys.filter(k => !featureKeys.has(k) && !caveatKeys.has(k));

  // Build section
  let section = `## Release ${args.version}\n\n**Release Date:** ${args.date}\n`;

  // New Features
  if (featureList.length > 0) {
    section += '\n### New Features\n\n';
    section += buildSubsection(featureList, allEntries);
    section += '\n';
  }

  // Resolved Issues
  if (resolvedList.length > 0 || cvesText) {
    section += '\n### Resolved Issues\n\n';

    // CVE group first
    if (cvesText) {
      section += `- **The following CVEs have been identified and resolved in this release:** ${cvesText}`;
      if (resolvedList.length > 0) {
        section += '\n------\n';
      } else {
        section += '\n';
      }
    }

    // Individual resolved entries
    if (resolvedList.length > 0) {
      section += buildSubsection(resolvedList, allEntries);
      section += '\n';
    }
  }

  // Caveats
  if (caveatList.length > 0) {
    section += '\n### Caveats\n\n';
    section += buildSubsection(caveatList, allEntries);
    section += '\n';
  }

  // Write output
  const outputPath = path.resolve(args.output);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, section);

  console.log(`Assembled section for Release ${args.version}:`);
  console.log(`  Features: ${featureList.length}`);
  console.log(`  Resolved: ${resolvedList.length}` + (cvesText ? ' + CVE group' : ''));
  console.log(`  Caveats:  ${caveatList.length}`);
  console.log(`Output: ${outputPath}`);
}

main();
