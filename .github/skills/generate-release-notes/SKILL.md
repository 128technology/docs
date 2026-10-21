---
name: generate-release-notes
description: 'Generate or update SSR software release notes for a specific version from a JIRA JQL query, including build metadata, release classification, customer scope, image artifacts, resolved bugs, features, CVEs, and caveats.'
user-invocable: true
disable-model-invocation: true
---

# SSR Release Notes Generator

Generate or update release notes for a specific SSR software version from JIRA query results.

## Inputs

Ask for the following if not provided:

1. **Target version(s)** — the SSR release version(s) these notes cover (e.g., SSR-7.1.5-r2, SSR-7.2.0-r1).
2. **JQL query** — the JIRA query to fetch relevant issues.
3. **Output filename** — where to save the generated notes (default: `docs/release_notes_128t_<major.minor>.md`).
4. **Mode** — `generate` (create a new release notes file or section) or `update` (add new issues to an existing release notes section). If the output file already exists and contains the target version heading, infer `update` mode unless the user explicitly requests `generate`.
5. **Target release section** *(update mode only)* — the specific `## Release <version>` heading to update (e.g., `## Release 7.1.6-r2`). Required when mode is `update`.
6. **Build number** — the build number for the release (e.g., `7`). If provided, render it in the release heading as `## Release <version> (Build# <number>)`.
7. **Release classification** — the release audience or stage (e.g., `Beta Release`, `Limited Availability`, `General Availability`). Omit this heading only when the user confirms that no classification applies.
8. **Customer** *(customer-specific releases only)* — the customer name displayed in the release metadata. Do not infer it solely from JIRA issue content; use the customer explicitly supplied by the user or an authoritative release manifest.
9. **Image details** — one record per release artifact containing architecture, type, URL, and SHA256. Accept these values only from an authoritative build manifest, checksum file, artifact service, or explicit user input. Each record must include:
   - Architecture (e.g., `x86_64`, `aarch64`)
   - Type (e.g., `ISO`, `TAR`)
   - Artifact URL
   - SHA256 checksum

If build metadata or image details are absent, ask for them before producing the final draft. The user may explicitly confirm that a field does not apply; do not fabricate or silently omit applicable metadata.

## Helper Scripts

Reusable Node.js scripts live in `scripts/release-notes/`. These handle mechanical data transformations so the agent can focus on AI-dependent synthesis. All scripts accept `--help` for usage details.

| Script | Purpose | Invoked In |
|--------|---------|------------|
| `categorize.js` | Categorize JQL results into CVE / Feature / Caveat / Resolved | Step 1 |
| `find-existing-entries.js` | Search existing release notes for reusable entry text | Step 2.0 |
| `collect-cves.js` | Extract and sort all unique CVE identifiers | Step 5 |
| `assemble-section.js` | Combine entries + CVEs into a complete markdown section | Step 5 |
| `insert-section.js` | Insert the assembled section into the target file | Step 6 |

All scripts use file-based I/O. Save intermediate data to `/tmp/rn-*` files.

## Workflow

### Step 0 — Verify MCP Servers Are Running

Before starting any work, confirm that both required MCP servers are available:

1. **JIRA MCP** — Call `mcp_ssr-jira-mcp_jql_query` with the lightweight query `project = I95 ORDER BY created DESC` and `max_results: 1`. If the call fails or times out, stop.
2. **GitHub MCP** — Call `mcp_github_mcp_se_get_me` to verify the GitHub MCP server is reachable. If the call fails or times out, stop.

If **either** server is not running, halt immediately and inform the user:

> "The release notes workflow requires both the **SSR JIRA MCP** and **GitHub MCP** servers to be running. Please start the missing server(s) and re-run this prompt."

Do NOT proceed to Step 1 until both checks pass.

### Step 1 — Fetch Issues

Run the provided JQL query using the SSR JIRA MCP tools. Collect all returned issues. If the JQL query returns zero issues, inform the user and ask them to verify the query or version labels before proceeding.

After fetching, save the raw JQL results JSON to `/tmp/rn-jql-results.json`, then run:

```bash
node scripts/release-notes/categorize.js --input /tmp/rn-jql-results.json --output /tmp/rn-categorized.json
```

This produces a categorized breakdown. Use the output to identify which issues are CVEs (grouped automatically), features, caveats, and resolved issues.

### Step 1.2 — Verify Build And Image Metadata

Before drafting the release section:

1. Record the build number, release classification, customer (when customer-specific), and image details supplied in the inputs.
2. Verify each artifact URL and SHA256 against an authoritative source:
    - Prefer a signed or published build manifest/checksum file from the artifact service.
    - Otherwise, download the artifact to `/tmp/rn-artifacts/` and calculate its SHA256 locally.
    - If authentication or artifact size prevents local verification, mark the artifact as **unverified** in the review summary and require explicit user approval before saving. Do not claim that an unverified checksum is valid.
3. Confirm that each artifact filename matches the target version and build number.
4. Confirm that every artifact row has a unique architecture/type pair and a 64-character lowercase hexadecimal SHA256 value.
5. Save normalized metadata to `/tmp/rn-release-metadata.json` using this shape:

```json
{
   "version": "7.2.3-r2",
   "build": "7",
   "classification": "Beta Release",
   "customer": "Example Customer",
   "images": [
      {
         "architecture": "x86_64",
         "type": "ISO",
         "url": "https://artifacts.example/SSR-7.2.3-7.r2.el9.x86_64.ibu-v1.iso",
         "sha256": "<64-character-sha256>",
         "verified": true
      }
   ]
}
```

Do not place authentication tokens, cookies, or signed URL query parameters in the release notes. Use stable artifact URLs without embedded credentials.

### Step 1.5 — Diff Against Existing Notes (Update Mode Only)

Skip this step entirely if mode is `generate`.

1. Read the existing release notes file specified in the output filename.
2. Locate the target `## Release <version>` section (up to the next `## Release` heading or end of file).
   - A heading with build metadata, such as `## Release <version> (Build# <number>)`, identifies the same target version.
3. Extract all issue keys from that section by scanning for bold entry patterns (e.g., `**I95-12345`, `**IN-460`, `**WAN-1234`). Also extract any CVE identifiers from the grouped CVE entry.
4. Compare the issue keys found in the existing section against the issue keys returned by the JQL query in Step 1:
   - **New issues** — present in JQL results but NOT in the existing section → these proceed through Steps 2–4.
   - **Existing issues** — present in both JQL results AND the existing section → skip Steps 2–4; retain their current entry text verbatim.
   - **Stale issues** — present in the existing section but NOT in the JQL results → flag for review (see Step 5.5).
5. If there are no new issues and no stale issues, inform the user that the release notes are already up to date and stop.

### Step 2 — Gather and Summarize JIRA Context Per Issue

For each issue identified as needing processing:
- In **generate** mode: all issues returned by the JQL query.
- In **update** mode: only the **new issues** identified in Step 1.5.

0. **Check for existing release-note language first.** Write the non-CVE issue keys (features + caveats + resolved from `/tmp/rn-categorized.json`) to `/tmp/rn-non-cve-keys.txt` (one per line), then run:

```bash
node scripts/release-notes/find-existing-entries.js --keys /tmp/rn-non-cve-keys.txt --found /tmp/rn-found-entries.json --not-found /tmp/rn-needs-entries.txt
```

Issues listed in `/tmp/rn-found-entries.json` already have reusable entry text — skip Steps 2.1, 3, and 4 for those. Only process issues listed in `/tmp/rn-needs-entries.txt` through the steps below.
1. Read the JIRA issue and collect all available context:
   - **Summary** (title)
   - **Description** (full body, often contains root cause and fix details)
   - **Comments** (engineering discussion, QA notes, customer impact details)
   - **Resolution notes**
   - **Fix version(s)**
   - **Labels and components**
   - **Linked issues** (related bugs, parent epics)
2. Summarize the JIRA content into a concise internal note per issue capturing:
   - What was the problem (symptom)?
   - What was the root cause?
   - What was the fix?
   - What is the customer-facing impact?

### Step 3 — Gather PR Context

For each issue, find the linked GitHub pull request URL (in JIRA links, comments, or description):

1. If a linked PR is found, navigate to the GitHub pull request using the GitHub MCP tools.
2. Read the **full PR description body**. Many PRs use a structured template with sections such as `Root Cause`, `Testing`, and `Release Note`.
3. Note any **"Release Note" section** in the PR description (or similarly labeled, e.g., `Release Notes`, `Customer-Facing Note`). This section provides the developer's intent for what the customer should know, but it may be incomplete or imprecise — treat it as a high-signal input, not as final copy.
4. Review the **code diff / change summary**. Use the Copilot-generated pull request summary (often in a collapsible section labeled "Copilot Summary") or the file-change list to understand what was actually modified and the behavioral impact.
5. Extract from the PR: root cause, what was modified, why, and any user-facing behavioral changes.
6. If no linked PR is found for an issue, skip this step and rely solely on the JIRA context from Step 2 to produce the release note entry. Do not fabricate PR details.

### Step 4 — Synthesize Final Release Note Entry

For each issue, synthesize a single customer-facing release note entry by considering **all available inputs** with the following priority weighting:

1. **PR "Release Note" section** (highest weight) — the developer's stated intent for what customers should know. Use this to anchor the description, but verify and refine it against the other sources.
2. **PR code changes / Copilot Summary** — what was actually modified and the real behavioral impact. Use this to ensure technical accuracy and to fill gaps the Release Note section may omit.
3. **JIRA context** (issue description, comments, resolution) — the symptom as reported, customer impact, and broader context. Use this for the problem statement and to ground the entry in real-world impact.

The final entry must include:
- **(a)** What the user-visible problem was (symptom).
- **(b)** The root cause stated in user-facing terms (not internal implementation details).
- **(c)** The fix or behavioral change the user will observe.

Do not copy any single source verbatim. Synthesize all inputs into one clear, concise sentence(s) or short paragraph suitable for a customer audience.

### Step 5 — Generate or Update Release Notes Document

Use the format from `docs/release_notes_128t_7.2.md` as the template.

#### Using helper scripts for assembly

After synthesizing new entries (Step 4), save them as a JSON mapping to `/tmp/rn-new-entries.json` (format: `{ "KEY": "- **KEY title:** description" }`). Then run:

```bash
# Collect CVEs
node scripts/release-notes/collect-cves.js --input /tmp/rn-jql-results.json --output /tmp/rn-cves.txt

# Assemble the section
node scripts/release-notes/assemble-section.js \
  --found /tmp/rn-found-entries.json \
  --new /tmp/rn-new-entries.json \
  --cves /tmp/rn-cves.txt \
  --version "<VERSION>" \
  --date "<DATE>" \
  --features "<comma-separated feature keys>" \
  --output /tmp/rn-section.md
```

Review the output in `/tmp/rn-section.md` before inserting.

The assembly helper generates issue sections only. After assembly, add the verified release metadata from `/tmp/rn-release-metadata.json` immediately after the release heading and before the issue subsections. The final prefix must use this structure:

```markdown
## Release <version> (Build# <build-number>)

**Release Date:** <date>

### <Release Classification>:

Customer: <customer>

### Image Details

| Architecture | Type | Link | SHA256 |
|--------------|------|------|--------|
| <architecture> | <type> | [<artifact-filename>](<stable-artifact-url>) | <verified-sha256> |
```

Formatting requirements for release metadata:

- Omit `(Build# <build-number>)` only when the user confirms that no build number applies.
- Omit `Customer: <customer>` for non-customer-specific releases.
- Omit the release-classification heading only when the user confirms that no classification applies.
- Omit `### Image Details` only when the user confirms that no downloadable images apply.
- Sort image rows by architecture, then type.
- Derive link text from the artifact filename; do not display a bare URL.
- Keep the verified SHA256 lowercase and unbroken.
- Place `### New Features`, `### Resolved Issues`, and `### Caveats` after `### Image Details`.

#### Update mode — merge new entries into the existing section

When mode is `update`, do NOT regenerate the document from scratch. Instead:

1. Read the existing file and preserve all content outside the target `## Release <version>` section unchanged.
   - Preserve existing build, classification, customer, and image metadata unless the user supplies authoritative replacement values.
   - When metadata changes, update only the affected metadata fields or image rows; do not regenerate unrelated issue text.
2. Within the target section, retain all **existing entries** verbatim (do not rewrite or re-order them).
3. Insert each **new entry** (produced in Step 4) into the correct subsection (`### New Features`, `### Resolved Issues`, or `### Caveats`) based on the categorization rules below.
4. After inserting new entries, re-sort all entries within each subsection by issue key (alphabetically by project prefix, then numerically by issue number).
5. Re-evaluate CVE grouping: if any new issues carry a `CVE-YYYY-XXXXX` label, merge their CVE identifiers into the existing grouped CVE entry (or create one if none exists). Remove those issues from the individual entry list.
6. Ensure `------` separators exist between consecutive entries after re-sorting.
7. Create any subsection headings (`### New Features`, `### Caveats`) that are now needed but did not previously exist. Remove any subsection headings that are now empty.

#### Generate mode — create the document

When mode is `generate`, produce the full document as described below. 

- Issues with Type of ("Feature Request", Epic) MUST be captured under the heading "New Features".
- If there are no issues of type "Feature Request" or Epic, do not include the heading "New Features".
- Issue types of (Bugs, Stories, Tasks, Sub-tasks) that are NOT marked with a "Caveats" label MUST be captured under the heading "Resolved Issues".
- Any issue (regardless of type) that is marked with a "Caveats" label MUST be captured under the heading "### Caveats" instead of "Resolved Issues". If no issues carry the "Caveats" label, do not include the "### Caveats" heading.
- Sort issues by issue key: alphabetically by project prefix, then numerically by issue number (e.g., AAA-9 before AAA-100, AAA-* before BBB-*).
- Any issue that contains a label in the format of "CVE-YYYY-XXXXX" should be considered as a CVE issue. All CVE-YYYY-XXXXX labels must be included in the list of fixed CVEs. Any issues that meet this criteria should not be included as a separate item under "Resolved Issues". CVEs should be grouped together into a single listing under the following heading - **The following CVEs have been identified and resolved in this release:** {list comma separated CVEs} and should always be the first item listed in the "Resolved Issues" heading.

Structure the output as follows:

```markdown
---
title: "SSR <major.minor> Release Notes"
sidebar_label: "<major.minor>"
---

## Release <version> (Build# <build-number>)

**Release Date:** <date>

### <Release Classification>:

Customer: <customer>

### Image Details

| Architecture | Type | Link | SHA256 |
|--------------|------|------|--------|
| <architecture> | <type> | [<artifact-filename>](<artifact-url>) | <verified-sha256> |

### New Features

- **<ISSUE-ID> <concise title>:** Brief feature description and details.
------
- **<ISSUE-ID> <concise title>:** Brief feature description and details.

### Resolved Issues

- **<ISSUE-ID> <concise title>:** Resolved an issue where <customer-facing description>.
------
- **<ISSUE-ID> <concise title>:** Resolved an issue where <customer-facing description>.
```

**Formatting rules:**

- Each entry: `- **<ISSUE-ID> <concise title>:** <customer-facing description>`
- Bug fixes start with `Resolved an issue where...`
- New features open with a capability statement.
- Separate consecutive entries with `------` (six dashes, on its own line).
- Group entries by version under `## Release <version>` headings.
- Within each version, group entries under `### New Features`, `### Resolved Issues`, or `### Caveats` using the categorization rules defined above. Omit any heading that has no entries.

### Step 5.5 — Flag Stale Entries (Update Mode Only)

Skip this step entirely if mode is `generate`.

If Step 1.5 identified any **stale issues** (entries in the existing section that are not in the JQL results):

1. Append an HTML comment at the end of the target `## Release <version>` section:
   ```html
   <!-- REVIEW: The following issues appear in these notes but were not present in the JQL query. Verify whether they should remain: ISSUE-ID, ISSUE-ID -->
   ```
2. Do NOT remove the stale entries from the rendered content. They remain in place until the user manually confirms removal.

### Step 6 — Review and Save

To insert the assembled section into the target file, run:

```bash
# Insert before an existing section (newer versions go first)
node scripts/release-notes/insert-section.js --file <output-file> --section /tmp/rn-section.md --before "## Release <older-version>"

# Or append to end of file if no later section exists
node scripts/release-notes/insert-section.js --file <output-file> --section /tmp/rn-section.md --append
```

**Generate mode:** Present the complete draft for review. After approval, save to the specified output file.

**Update mode:** Present a summary that includes:
- Build metadata changes, including verification status for every image.
- Number of new entries added (list their issue keys).
- Number of existing entries retained unchanged.
- Number of stale entries flagged for review (list their issue keys).
- Total entry count in the target section after the update.

After approval, save the updated file in-place.

## Example Invocation

```
Versions: SSR-7.1.5-r2, SSR-7.1.6-r2, SSR-7.2.0-r1
JQL: type in (Bug) AND status in (Resolved, Closed) AND resolution in (Done) AND "Delivered To[Labels]" in (SSR-7.1.5-r2, SSR-7.1.6-r2, SSR-7.2.0-r1) order by updated DESC
```

## Important

- Do NOT fabricate issue details. Every entry must be grounded in the JIRA issue and/or the linked PR description.
- Customer names MUST be excluded from issue titles and descriptions. For a customer-specific release, the explicitly supplied customer name MAY appear only in the release metadata line `Customer: <customer>`.
- Do NOT fabricate build numbers, release classifications, artifact URLs, filenames, or checksums.
- Do NOT report a checksum as verified unless it was matched to an authoritative manifest/checksum file or calculated from the downloaded artifact.
- Do NOT run the Docusaurus build after generating release notes.
- Write in second person, active voice, present tense.
- Use Title Case for headings.
