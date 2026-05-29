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

Run the provided JQL query using the SSR JIRA MCP tools. Collect all returned issues.

### Step 2 — Gather and Summarize JIRA Context Per Issue

For each issue returned by the JQL query:

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

1. Navigate to the GitHub pull request using the GitHub MCP tools.
2. Read the PR description.
3. **Prefer the GitHub Copilot-generated pull request summary** (often found in a collapsible section or labeled "Copilot Summary") over the manually written description when both are available.
4. Extract the technical details of the change: what was modified, why, and any behavioral changes.

### Step 4 — Synthesize Final Release Note Entry

For each issue, combine the JIRA summary (Step 2) and PR context (Step 3) into a single customer-facing release note entry:

- Use the JIRA context for **symptom and customer impact**.
- Use the PR context for **technical accuracy of the fix description**.
- Distill into one clear, concise sentence or short paragraph suitable for a customer audience.

### Step 5 — Generate Release Notes Document

Use the format from [docs/release_notes_128t_7.1.md](../../docs/release_notes_128t_7.1.md) as the template. Structure the output as follows:

```markdown
---
title: "SSR <major.minor> Release Notes"
sidebar_label: "<major.minor>"
---

## Release <version>

**Release Date:** <date>

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
- Within each version, group under `### New Features`, `### Resolved Issues`, or `### Caveats` as appropriate.

### Step 6 — Review and Save

Present the complete draft for review. After approval, save to the specified output file.

## Example Invocation

```
Versions: SSR-7.1.5-r2, SSR-7.1.6-r2, SSR-7.2.0-r1
JQL: type in (Bug) AND status in (Resolved, Closed) AND resolution in (Done) AND "Delivered To[Labels]" in (SSR-7.1.5-r2, SSR-7.1.6-r2, SSR-7.2.0-r1) order by updated DESC
```

## Important

- Do NOT fabricate issue details. Every entry must be grounded in the JIRA issue and/or the linked PR description.
- Do NOT run the Docusaurus build after generating release notes.
- Write in second person, active voice, present tense.
- Use Title Case for headings.
