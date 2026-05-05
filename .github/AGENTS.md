# AGENTS.md — Release Notes Generator Agent

This repository ships purpose-built agents for each major workflow. **Always start by picking the right agent** — the default VS Code agent handles general coding work; use the specialized agents below for any SSR-related or repo-specific task.

---
## Timing Analysis
Produce a summary of when the analysis started, when did it finish, how much time was spent on reasoning vs tool calls. This should be clear to the user that its just metadata about the operation.

---
## ⚡ Agent Routing

**Any agent that receives a request** must apply this routing check as its **first action**, before any analysis, file read, or tool call:

**How to invoke a sub-agent:** Use the `runSubagent` tool with the agent name and pass the original user message verbatim as the argument. Do not summarise or reframe it. Sub-agent invocation is always preferred over asking the user to switch; manual switch is a fallback only when `runSubagent` is unavailable.

**When intent is ambiguous:** Use `vscode/askQuestions` to clarify before routing. A 30-second clarification saves minutes of backtracking. Do not assume scope, bundle path, or symptom — ask first.

> **Why this matters:** Accepting an investigation task in the wrong agent bypasses the investigation loop, playbook routing, output contract, and reporting standard — producing inline chat findings with no `analysis.md`, no `debug.md`, and no evidence ledger.

---


## Artifact Types

> Full definitions, decision rules, and test checklists: [`resources/artifact-type-definitions.md`](resources/artifact-type-definitions.md)

---

## MCP Tools

MCP tools for `tsi.analysis` are registered in `mcp_server/tsi/server.py`.

Canonical inventory:
- `.github/agents/tsi.analysis.agent.md` for analyst-facing capability mapping
- `mcp_server/tsi/server.py` for the authoritative registration list

---

## Shell Conventions

```bash
# Always use a QUOTED heredoc delimiter when writing Python inline via bash:
python3 << 'PYEOF'   # correct — disables shell variable interpolation
python3 << PYEOF     # WRONG — breaks f-strings containing ${var}
PYEOF
```

---

## Commit Workflow

```bash
# Before any gh pr create, run:
gh auth status
# If GITHUB_TOKEN env var is overriding the keyring: skip gh pr create,
# surface the URL: https://github.com/<org>/<repo>/compare/<branch>
# Do NOT attempt GITHUB_TOKEN="" workaround under auto-approval mode.
```

---

## Edit Policy for Always-Loaded Files

- `copilot-instructions.md` (`applyTo: **/*`): Requires explicit user approval before any edit.
- `AGENTS.md`, `INDEX.md`, `playbooks/*`: Can be updated as part of plan execution tasks.

---

## Available Agents

| Agent | File | Purpose |
|-------|------|---------|
| `patch-release-notes-generator` | `.github/agents/patch-release-notes-generator.md` | Generate patch release notes from Jira issues |
| `ssr-doc-validator` | `.github/agents/ssr-doc-validator.agent.md` | Validate doc accuracy by SSH-ing to machines, installing/upgrading SSR, running PCLI commands, and comparing actual vs documented output |

