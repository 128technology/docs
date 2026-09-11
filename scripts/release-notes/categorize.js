#!/usr/bin/env node
/**
 * categorize.js — Categorize JQL results into CVE, Feature, Caveat, and Resolved buckets.
 *
 * Usage:
 *   node scripts/release-notes/categorize.js --input <jql-results.json> --output <categorized.json>
 *
 * Input:  JSON file from JIRA MCP jql_query tool (contains .issues[] with key, issue_type, labels)
 * Output: JSON file with categorized issue keys:
 *   {
 *     "cve": [{ "key": "I95-...", "cveLabels": ["CVE-2024-..."] }],
 *     "features": ["I95-..."],
 *     "caveats": ["I95-..."],
 *     "resolved": ["I95-..."],
 *     "summary": { "total": N, "cve": N, "features": N, "caveats": N, "resolved": N }
 *   }
 */

const fs = require('fs');
const path = require('path');

function printHelp() {
  console.log(`
categorize.js — Categorize JQL results into CVE, Feature, Caveat, and Resolved buckets.

Usage:
  node scripts/release-notes/categorize.js --input <jql-results.json> --output <categorized.json>

Options:
  --input   Path to the JQL results JSON file (from JIRA MCP tool)
  --output  Path to write the categorized output JSON
  --help    Show this help message

Categorization rules:
  - CVE:      Any issue with a label matching CVE-YYYY-XXXXX
  - Feature:  issue_type is "Epic" or "Feature Request"
  - Caveat:   Has label "Caveats" (and is NOT a CVE issue)
  - Resolved: Everything else (Bug, Story, Task, Sub-task without Caveats label)
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

function categorize(issues) {
  const cve = [];
  const features = [];
  const caveats = [];
  const resolved = [];

  for (const issue of issues) {
    const labels = issue.labels || [];
    const cveLabels = labels.filter(l => CVE_PATTERN.test(l));
    const hasCVE = cveLabels.length > 0;
    const isCaveat = labels.includes('Caveats');
    const isFeature = issue.issue_type === 'Epic' || issue.issue_type === 'Feature Request';

    if (hasCVE) {
      cve.push({ key: issue.key, cveLabels });
    } else if (isFeature) {
      features.push(issue.key);
    } else if (isCaveat) {
      caveats.push(issue.key);
    } else {
      resolved.push(issue.key);
    }
  }

  return {
    cve,
    features: features.sort(sortByKey),
    caveats: caveats.sort(sortByKey),
    resolved: resolved.sort(sortByKey),
    summary: {
      total: issues.length,
      cve: cve.length,
      features: features.length,
      caveats: caveats.length,
      resolved: resolved.length,
    },
  };
}

function sortByKey(a, b) {
  const ma = a.match(/^(.+?)-(\d+)$/);
  const mb = b.match(/^(.+?)-(\d+)$/);
  if (!ma || !mb) return 0;
  if (ma[1] !== mb[1]) return ma[1].localeCompare(mb[1]);
  return parseInt(ma[2]) - parseInt(mb[2]);
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

  const result = categorize(issues);

  const outputPath = path.resolve(args.output);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

  console.log(`Categorized ${result.summary.total} issues:`);
  console.log(`  CVE:      ${result.summary.cve}`);
  console.log(`  Features: ${result.summary.features}`);
  console.log(`  Caveats:  ${result.summary.caveats}`);
  console.log(`  Resolved: ${result.summary.resolved}`);
  console.log(`Output: ${outputPath}`);
}

main();
