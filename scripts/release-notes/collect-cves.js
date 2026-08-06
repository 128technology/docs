#!/usr/bin/env node
/**
 * collect-cves.js — Extract all unique CVE identifiers from JQL results.
 *
 * Usage:
 *   node scripts/release-notes/collect-cves.js --input <jql-results.json> --output <cves.txt>
 *
 * Input:  JSON file from JIRA MCP jql_query tool
 * Output: Comma-separated sorted list of all unique CVE-YYYY-XXXXX identifiers
 */

const fs = require('fs');
const path = require('path');

function printHelp() {
  console.log(`
collect-cves.js — Extract all unique CVE identifiers from JQL results.

Usage:
  node scripts/release-notes/collect-cves.js --input <jql-results.json> --output <cves.txt>

Options:
  --input   Path to the JQL results JSON file (from JIRA MCP tool)
  --output  Path to write the comma-separated sorted CVE list
  --help    Show this help message

Scans all issue labels for values matching CVE-YYYY-XXXXX, deduplicates,
and sorts by year then numeric ID.
`);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--help' || argv[i] === '-h') {
      args.help = true;
    } else if (argv[i] === '--input' && argv[i + 1]) {
      args.input = argv[++i];
    } else if (argv[i] === '--output' && argv[i + 1]) {
      args.output = argv[++i];
    }
  }
  return args;
}

const CVE_PATTERN = /^CVE-\d{4}-\d+$/;

function collectCVEs(issues) {
  const allCVEs = new Set();
  for (const issue of issues) {
    const labels = issue.labels || [];
    for (const label of labels) {
      if (CVE_PATTERN.test(label)) {
        allCVEs.add(label);
      }
    }
  }

  const sorted = [...allCVEs].sort((a, b) => {
    const [, ya, na] = a.match(/CVE-(\d{4})-(\d+)/);
    const [, yb, nb] = b.match(/CVE-(\d{4})-(\d+)/);
    if (ya !== yb) return ya.localeCompare(yb);
    return parseInt(na) - parseInt(nb);
  });

  return sorted;
}

function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (!args.input || !args.output) {
    console.error('Error: --input and --output are required. Use --help for usage.');
    process.exit(1);
  }

  const inputPath = path.resolve(args.input);
  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const issues = data.issues || data;

  if (!Array.isArray(issues)) {
    console.error('Error: Input JSON must contain an "issues" array or be an array.');
    process.exit(1);
  }

  const cves = collectCVEs(issues);

  const outputPath = path.resolve(args.output);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, cves.join(', '));

  console.log(`Collected ${cves.length} unique CVEs from ${issues.length} issues.`);
  console.log(`Output: ${outputPath}`);
}

main();
