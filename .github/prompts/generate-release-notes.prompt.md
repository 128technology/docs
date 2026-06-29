---
description: "Generate or update release notes for a specific SSR software version from a JIRA JQL query. Use when producing release notes based on resolved bugs and features delivered in one or more SSR releases, or when updating an existing release notes file with newly resolved issues."
agent: "agent"
argument-hint: "Target SSR version(s) and JQL query"
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

## Workflow

### Step 1 — Fetch Issues

Run the provided JQL query using the SSR JIRA MCP tools. Collect all returned issues. If the JQL query returns zero issues, inform the user and ask them to verify the query or version labels before proceeding.

### Step 1.5 — Diff Against Existing Notes (Update Mode Only)

Skip this step entirely if mode is `generate`.

1. Read the existing release notes file specified in the output filename.
2. Locate the target `## Release <version>` section (up to the next `## Release` heading or end of file).
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

0. **Check for existing release-note language first.** Search the existing release notes under [docs/](../../docs/) (for example, `release_notes_128t_*.md`) for the issue key (e.g., `I95-12345`, `WAN-1234`). If a prior entry for that issue exists in a *different* release section or file, reuse its title and description verbatim and **skip Steps 2.1, 3, and 4** for that issue — do not call the JIRA or GitHub MCP tools for it. Only continue with the steps below if no prior entry exists anywhere.
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

Use the format from [docs/release_notes_128t_7.1.md](../../docs/release_notes_128t_7.1.md) as the template.

#### Update mode — merge new entries into the existing section

When mode is `update`, do NOT regenerate the document from scratch. Instead:

1. Read the existing file and preserve all content outside the target `## Release <version>` section unchanged.
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

## Release <version>

**Release Date:** <date>

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

**Generate mode:** Present the complete draft for review. After approval, save to the specified output file.

**Update mode:** Present a summary that includes:
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
- Customer names MUST be excluded from Issue titles and description.
- Do NOT run the Docusaurus build after generating release notes.
- Write in second person, active voice, present tense.
- Use Title Case for headings.
