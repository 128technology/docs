---
description: "Generate release notes for a WAN Assurance plugin version from the RPM spec changelog and JIRA. Use when producing release notes for a new mist-wan-assurance plugin release."
agent: "agent"
argument-hint: "Target plugin version (e.g. 3.102.0)"
---

# WAN Assurance Plugin Release Notes Generator

Generate release notes for a specific WAN Assurance plugin version using the RPM spec changelog and JIRA issues.

## Inputs

Ask for the following if not provided:

1. **Target version** — the plugin version to generate notes for (e.g., `3.102.0`). The RPM spec uses the format `<version>-<release>` (e.g., `3.102.0-1`); only the version portion (`3.102.0`) is needed.
2. **Spec file path** — default is `~/github/ssn-ssr-plugins/plugins/mist_wan_assurance/128T-mist-wan-assurance.spec.in`. If the file is not found at that path, ask the user to provide the correct path.
3. **Output filename** — where to save the generated notes (default: `docs/release_notes_wan_assurance_plugin_<major.minor>.md`, e.g., `docs/release_notes_wan_assurance_plugin_3.102.md`).

## Workflow

### Step 1 — Read the Spec Changelog

Read the RPM spec file at the path determined in Inputs.

> **Efficiency tip:** Do NOT read the entire spec file sequentially. The `%changelog` section is always near the bottom. Run `grep -n "%changelog\|<target-version>" <spec-file>` first to find the exact line numbers for the changelog header and all matching version entries, then `read_file` only those line ranges.

1. Locate the `%changelog` section at the bottom of the file.
2. Find **all changelog entries** whose version matches the target version (e.g., all entries for `3.102.0-*`). A changelog block starts with a line like:
   ```
   * Wed Jan 01 2025 Author Name <email> 3.102.0-1
   ```
3. Extract from each matching changelog entry:
   - **Release date** from the header line.
   - **Patch version** — map the RPM release suffix (`-1`, `-2`, …) to the corresponding patch release (e.g., `3.102.0`, `3.102.1`, …).
   - **JIRA issue IDs** referenced in the bullet items (e.g., `WAN-1234`). These are the primary source for which issues belong to each patch release.
   - **Brief change descriptions** from the bullets — used as a fallback if a JIRA issue cannot be fetched.
4. If no changelog entries are found for the target version, tell the user and stop.

> **Note:** The spec changelog establishes which JIRA issues belong to each patch release and provides release dates. All issue content — titles, descriptions, resolutions — must be sourced from JIRA and GitHub in the steps below, not from the changelog bullets.

### Step 2 — Fetch JIRA Issues

For each patch version identified in Step 1, build the full issue list by combining two sources:

**Source A — Spec changelog IDs:** Use the JIRA issue IDs extracted from the spec changelog bullets in Step 1 as the seed list for this patch.

**Source B — JIRA fixVersion query:** Also run the following JQL using the SSR JIRA MCP tools to catch any issues not mentioned in the changelog:
```
fixVersion in (wan-assurance-<version>) ORDER BY key ASC
```
(Construct the fixVersion label as `wan-assurance-<version>`, e.g., `wan-assurance-3.102.0`.)

Merge both lists, deduplicate by issue key, and proceed with the combined set. If both sources return no issues, note that and continue.

### Step 3 — Gather and Summarize JIRA Context Per Issue

For each issue returned by the JQL query:

0. **Check for existing release-note language first.** Search the existing WAN Assurance release notes under [docs/](../../docs/) (e.g., `release_notes_wan_assurance_plugin_*.md`) for the issue key (e.g., `WAN-1234`). If a prior entry exists, reuse its title and description verbatim and **skip Steps 3.1–3.2** for that issue.
1. Read the JIRA issue and collect all available context:
   - **Summary** (title)
   - **Description** (full body — root cause and fix details)
   - **Comments** (engineering discussion, QA notes, customer impact)
   - **Resolution notes**
   - **Issue type** (Bug, Feature Request, Epic, Story, Task, Sub-task)
   - **Labels** (note any `Caveats` label or CVE labels in `CVE-YYYY-XXXXX` format)
   - **Fix version(s)**
2. Synthesize a concise internal note per issue:
   - What was the problem (symptom)?
   - What was the root cause?
   - What was the fix?
   - What is the customer-facing impact?

### Step 4 — Gather PR Context (Optional)

For each JIRA issue, find the linked GitHub pull request URL (in JIRA links, comments, or description):

1. If a linked PR is found, navigate to it using the GitHub MCP tools.
2. Read the PR description. **Prefer the GitHub Copilot-generated pull request summary** (often found in a collapsible section or labeled "Copilot Summary") over the manually written description when both are available.
3. Extract: what was changed, why, and any behavioral differences.
4. If no linked PR is found, rely solely on the JIRA context from Step 3. Do not fabricate PR details.

### Step 5 — Synthesize Final Release Note Entry Per Issue

For each issue, combine JIRA context (Step 3) and PR context (Step 4) following the same synthesis logic as the SSR release notes generator:

- Use the **JIRA context** for symptom and customer impact.
- Use the **PR context** for technical accuracy of the fix description.
- For any issue where JIRA could not be fetched, fall back to the spec changelog bullet from Step 1 and keep the description brief.
- Distill into one clear, concise sentence or short paragraph suitable for a customer audience.

**Customer-facing writing rules — apply strictly:**

- **Three-part structure: symptom → fix → scope.** A good resolution entry answers: *what broke, what was done to fix it, and who is affected.* All three parts should be present, but not all need separate sentences — fold them together naturally. A pure symptom restatement ("The service was restarting; this is now resolved.") is not acceptable.
  - *Too thin (symptom only):* "The mist-agent service will no longer restart on conductor-managed deployments without a Mist org."
  - *Acceptable:* "On conductor-managed deployments without a Mist org configured, the mist-agent service could enter a continuous restart loop after an upgrade. The upgrade process now preserves the pre-upgrade service state, preventing unnecessary restarts."
- **Describe the implementation at the right altitude.** One level above the code is correct — describe *what changed functionally*, not *how the code changed*. "The upgrade process now preserves the pre-upgrade state of the mist-agent service" is right. "The Phoenix manifest now uses passthrough instead of explicitly enabling systemd units" is too deep.
- **Keep it tight — 1–3 sentences max.** First sentence: symptom + affected scenario. Second sentence: what was changed to fix it (functional, not mechanical). Third sentence (optional): scope qualifier or action needed by the customer.
- **Avoid jargon leakage.** Words/phrases to omit unless unavoidable: Phoenix manifest, passthrough, systemd unit, watcher.path, highstate, Salt, pillar, spec file, RPM, .service file. Replace with outcome language: "the upgrade process now preserves…", "the service will no longer…", "the configuration is now correctly applied when…".
- **Test your sentence:** Ask — *does this tell the customer what broke and what now works, without requiring them to read the PR?* If the fix is still opaque after reading, add one functional sentence about what changed.

**Categorization rules:**

- Issues of type **Feature Request** or **Epic** → `### New Features`.
- Issues of type Bug, Story, Task, or Sub-task **without** a `Caveats` label → `### Resolved Issues`.
- Any issue (any type) **with** a `Caveats` label → `### Caveats` section instead of `Resolved Issues`.
- Issues with a label matching `CVE-YYYY-XXXXX` → grouped into a single CVE notice at the top of `### Resolved Issues`:
  ```
  **The following CVEs have been identified and resolved in this release:** CVE-YYYY-XXXXX, …
  ```
  CVE issues must NOT appear as separate `Resolved Issues` entries.
- Omit any section heading that has no entries.
- Sort issues within a section by issue key: alphabetically by project prefix, then numerically (e.g., `WAN-9` before `WAN-100`).

### Step 6 — Generate Release Notes Document

Use [docs/release_notes_wan_assurance_plugin_3.13.md](../../docs/release_notes_wan_assurance_plugin_3.13.md) as the formatting template.

Output structure:

```markdown
---
title: WAN Assurance Plugin <major.minor> Release Notes
sidebar_label: '<major.minor>'

---
## Release <version>

**Release Date:** <Month D, YYYY>

### New Features

- **<WAN-XXXX> <concise title>**

<feature description — capability statement, 1–3 sentences>

### Resolved Issues

- **<WAN-XXXX> <concise title>**

  _**Resolution**_ <customer-facing description of what was fixed>

### Caveats

- **<WAN-XXXX> <concise title>**

  _**Caveat**_ <description of known limitation or caveat>

---
## Release <version>

…
```

**Formatting rules:**

- Each bug/fix entry uses `_**Resolution**_` followed by the fix description (no "Resolved an issue where…" prefix — match the 3.13 style exactly).
- New feature entries use a plain paragraph after the bold title (no `_**Resolution**_`).
- Separate release sections (`## Release X.Y.Z`) with a horizontal rule (`---`).
- Do NOT add `------` separators between individual entries within a section (unlike SSR release notes).
- Order release sections newest-first (highest version at the top).
- Only include patch versions that actually have changelog entries or JIRA issues.

### Step 7 — Register in Sidebar

After saving the file, insert the new doc id at the **top** of the `"WAN Assurance Plugin"` category items array in [sidebars.js](../../sidebars.js):

```js
"release_notes_wan_assurance_plugin_<major.minor>",
```

Example — adding `3.102`:
```js
"items": [
  "release_notes_wan_assurance_plugin_3.102",   // ← new entry
  "release_notes_wan_assurance_plugin_3.101",
  …
]
```

### Step 8 — Review and Save

Present the complete draft for user review. After approval:
1. Save to the specified output file.
2. Apply the sidebar registration from Step 7.
3. Report: files created/modified, sidebar entry added.
4. Remind the user to run `docker-compose up` to validate the build before publishing.

## Important

- Do NOT fabricate JIRA details, spec changelog entries, dates, or fix descriptions.
- Every entry must be grounded in the spec changelog, the JIRA issue, and/or the linked PR.
- Customer names MUST be excluded from issue titles and descriptions.
- Write in second person, active voice, present tense.
- If the spec file is not found at the default path, ask the user for the correct path before proceeding.

## Example Invocation

```
Target version: 3.102.0
Spec file: ~/github/ssn-ssr-plugins/plugins/mist_wan_assurance/128T-mist-wan-assurance.spec.in
```

This will:
1. Parse all `3.102.*` changelog entries from the spec.
2. Query JIRA for `fixVersion in (wan-assurance-3.102.0)` (and any additional patch versions found).
3. Generate `docs/release_notes_wan_assurance_plugin_3.102.md`.
4. Register `release_notes_wan_assurance_plugin_3.102` at the top of the WAN Assurance Plugin sidebar.
