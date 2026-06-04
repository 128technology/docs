---
description: "Generate release notes for a specific SSR software version from a JIRA JQL query. Use when producing release notes based on resolved bugs and features delivered in one or more SSR releases."
agent: "agent"
argument-hint: "Target SSR version(s) and JQL query"
---

# SSR Release Notes Generator

Generate release notes for a specific SSR software version from JIRA query results.

## Inputs

Ask for the following if not provided:

1. **Target version(s)** — the SSR release version(s) these notes cover (e.g., SSR-7.1.5-r2, SSR-7.2.0-r1).
2. **JQL query** — the JIRA query to fetch relevant issues.
3. **Output filename** — where to save the generated notes (default: `docs/release_notes_128t_<major.minor>.md`).

## Workflow

### Step 1 — Fetch Issues

Run the provided JQL query using the SSR JIRA MCP tools. Collect all returned issues. If the JQL query returns zero issues, inform the user and ask them to verify the query or version labels before proceeding.

### Step 2 — Gather and Summarize JIRA Context Per Issue

For each issue returned by the JQL query:

0. **Check for existing release-note language first.** Search the existing release notes under [docs/](../../docs/) (for example, `release_notes_128t_*.md`) for the issue key (e.g., `I95-12345`, `WAN-1234`). If a prior entry for that issue exists, reuse its title and description verbatim and **skip Steps 2.1, 3, and 4** for that issue — do not call the JIRA or GitHub MCP tools for it. Only continue with the steps below if no prior entry exists.
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
2. Read the PR description.
3. **Prefer the GitHub Copilot-generated pull request summary** (often found in a collapsible section or labeled "Copilot Summary") over the manually written description when both are available.
4. Extract the technical details of the change: what was modified, why, and any behavioral changes.
5. If no linked PR is found for an issue, skip this step and rely solely on the JIRA context from Step 2 to produce the release note entry. Do not fabricate PR details.

### Step 4 — Synthesize Final Release Note Entry

For each issue, combine the JIRA summary (Step 2) and PR context (Step 3) into a single customer-facing release note entry:

- Use the JIRA context for **symptom and customer impact**.
- Use the PR context for **technical accuracy of the fix description**.
- Distill into one clear, concise sentence(s) or short paragraph suitable for a customer audience.

### Step 5 — Generate Release Notes Document

Use the format from [docs/release_notes_128t_7.1.md](../../docs/release_notes_128t_7.1.md) as the template. 

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

### Step 6 — Review and Save

Present the complete draft for review. After approval, save to the specified output file.

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
