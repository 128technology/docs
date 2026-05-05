# SSR Docs — Contributor Reference

This file is a quick-reference map of the **SSR / SSN documentation repository** for contributors and AI agents. It is **not** customer-facing — for the public site, see https://docs.128technology.com.

- New here? Start with [GETTING_STARTED.md](GETTING_STARTED.md).
- Working with an AI agent? See [copilot-instructions.md](copilot-instructions.md).
- Customer contribution guide? See [docs/CONTRIBUTING.md](../docs/CONTRIBUTING.md).
- Local build instructions? See the top-level [README.md](../README.md).

---

## What this repo is

[Docusaurus](https://docusaurus.io/) source for the Session Smart Networking Platform (SSN) / Session Smart Router (SSR) public documentation site. Merges to `master` publish to https://docs.128technology.com.

---

## Key SSR artifacts

| Path | Purpose | When to edit |
|------|---------|--------------|
| [docs/](../docs/) | Published doc pages (`.md` / `.mdx`). | Adding or updating user-facing content. |
| [docs/_*.md](../docs/) | **Partials** — imported by other pages. | Extracting reusable snippets (install steps, warnings, claim flows). Never link to or register in sidebars. |
| [kb/](../kb/) | Knowledge-base articles. Filenames: `YYYY-MM-DD-<case-id>.md`. | Documenting a specific customer issue, with symptom/cause/resolution. |
| [sidebars.js](../sidebars.js) | Navigation registration. | Required whenever you add a new top-level page. |
| [docusaurus.config.js](../docusaurus.config.js) | Site config: navbar, theme, plugins, Mermaid, strict-build settings. | Rare. Coordinate with doc-site maintainers. |
| [static/img/](../static/img/) | Image assets. Reference as `/img/<file>`. | Adding diagrams, screenshots, GIFs. |
| [src/](../src/) | Custom React components and theme overrides. | Site-wide UI changes only. |
| [pdf/](../pdf/) | Generated/printable PDFs. | Generally hands-off; built by tooling. |
| [linkinator.config.json](../linkinator.config.json) | Link-checker config. | Tweaking link-audit ignores. |
| [aws/](../aws/) | AWS-specific helpers/scripts. | Infrastructure, not docs content. |
| [build/](../build/) | Generated Docusaurus output. | **Never edit.** |
| [.github/copilot-instructions.md](copilot-instructions.md) | Rules for AI agents working in this repo. | When agent behavior or repo conventions change. |
| [.github/CODEOWNERS](CODEOWNERS) | Auto-review assignment. | When ownership changes. |
| [.github/ISSUE_TEMPLATE/](ISSUE_TEMPLATE/) | Bug/feature templates. | Refining intake. |

---

## Repo structure (top level)

```
docs/         Published doc pages and partials
kb/           Knowledge-base articles (date-prefixed)
static/       Static assets (images, fonts) served as /img, /font, etc.
src/          Custom React components, theme swizzles, plugins
pdf/          PDF outputs
aws/          AWS deployment helpers
build/        Generated site (do not edit)
.github/      Repo metadata: agent rules, contributor docs, templates
sidebars.js          Navigation registration
docusaurus.config.js Site configuration
docker-compose.yml   Local dev container
package.json         Node deps and scripts
```

---

## Doc-id naming patterns

Doc id = filename without extension. Sidebars and links reference the id, not the path.

| Prefix | Example | Use |
|--------|---------|-----|
| `about_*` | `about_128t.md` | Product / company overview pages. |
| `bcp_*` | `bcp_sdwan_design_guide.md` | Best Common Practices — opinionated design guidance. |
| `cc_fips_*` | `cc_fips_access_mgmt.md` | Common Criteria / FIPS hardening content. |
| `_*` | `_install_prereqs.md` | **Partials.** Imported via MDX, never registered in sidebars. |
| `release_notes_128t_<version>` | `release_notes_128t_6.3.md` | Release notes per minor version. |
| `kb/YYYY-MM-DD-<case-id>` | `kb/2024-04-24-I95-55904.md` | KB entries, dated by publish/update date. |

---

## Where things go (decision table)

| You are writing… | Put it here | Also do |
|---|---|---|
| A configuration guide for a feature | `docs/<topic>.md` | Add id to [sidebars.js](../sidebars.js). |
| A deployment / install guide | `docs/<topic>.md` (or `.mdx`) | Reuse install partials; add a topology diagram; register in sidebar. |
| A customer-issue writeup | `kb/YYYY-MM-DD-<case-id>.md` | Use required KB frontmatter (title, date, tags, `hide_table_of_contents`). |
| A reusable snippet shared by ≥2 pages | `docs/_<name>.md` | Import via MDX; do **not** add to sidebar. |
| A concept / overview | `docs/<topic>.md` | Link from related how-to pages; end with "Where to next." |
| A Best Common Practice | `docs/bcp_<topic>.md` | Include rationale, trade-offs, "when not to use this." |
| An image | `static/img/<file>` | Reference as `/img/<file>`; add alt text. |
| A simple diagram | Inline Mermaid in the page | Mermaid is enabled in [docusaurus.config.js](../docusaurus.config.js). |
| A complex topology | Lucidchart → SVG export → `static/img/` | Reference as `/img/<file>.svg`. |

---

## Build & validate

Run from the project root:

```bash
docker-compose up
```

The build is **strict** — these settings will throw on any failure:

- `onBrokenAnchors: 'throw'`
- `markdown.hooks.onBrokenMarkdownLinks: 'throw'`
- `markdown.hooks.onBrokenMarkdownImages: 'throw'`

A clean build means no MDX compile errors, no broken-link/anchor/image throws, and the new page renders at http://localhost:3000 (and appears in the sidebar if registered).

Optional link audit (after a successful build):

```bash
npm run check-links
```

Optional formatting:

```bash
npm run prettier
```

---

## Issue / PR workflow

1. Open or pick up an issue using a [.github/ISSUE_TEMPLATE/](ISSUE_TEMPLATE/) template.
2. Branch from `master`.
3. Make the change; run `docker-compose up` until clean.
4. Open a PR. [.github/CODEOWNERS](CODEOWNERS) automatically requests review from the docs owners for any `docs/**` change.
5. Wait for CI; address feedback; merge.

PR expectations:
- Build is green.
- New pages are registered in [sidebars.js](../sidebars.js).
- Screenshots have no customer data, real public IPs, or license keys.
- Headings are Title Case; voice is second-person, active, present tense.

---

## Style at a glance

Full rules: [.github/copilot-instructions.md](copilot-instructions.md) §7.

- Sentence-case headings.
- Second person, active voice, present tense.
- Canonical terms: *Session Smart Router (SSR)*, *Session Smart Networking Platform (SSN)*, *conductor*, *router*, *authority*, *PCLI*.
- Code fences always specify a language hint (`text`, `bash`, `yaml`, `json`).
- Admonitions use Docusaurus syntax: `:::note`, `:::tip`, `:::caution`, `:::important`, `:::danger`, closed with `:::`.

---

## For AI agents

Read [.github/copilot-instructions.md](copilot-instructions.md) before making edits. Key constraints:

- Don't invent PCLI commands, config knobs, GUI paths, or version numbers — cite a source file.
- Don't edit [build/](../build/).
- Don't register partials in [sidebars.js](../sidebars.js).
- Don't relax strict-build settings to make a build pass.
- Run `docker-compose up` yourself; don't ask the user to run it.
