# AGENTS.md — Release Notes Generator Agent

This repository ships purpose-built agents for each major workflow. **Always start by picking the right agent** — the default VS Code agent handles general coding work; use the specialized agents below for any SSR-related or repo-specific task.

---
## Timing Analysis
Produce a summary of when the analysis started, when did it finish, how much time was spent on reasoning vs tool calls. This should be clear to the user that its just metadata about the analysis and not part of the final report.

---
## ⚡ Agent Routing

**Any agent that receives a request** must apply this routing check as its **first action**, before any analysis, file read, or tool call:

**How to invoke a sub-agent:** Use the `runSubagent` tool with the agent name and pass the original user message verbatim as the argument. Do not summarise or reframe it. Sub-agent invocation is always preferred over asking the user to switch; manual switch is a fallback only when `runSubagent` is unavailable.

**When intent is ambiguous:** Use `vscode/askQuestions` to clarify before routing. A 30-second clarification saves minutes of backtracking. Do not assume scope, bundle path, or symptom — ask first.

> **Why this matters:** Accepting an investigation task in the wrong agent bypasses the investigation loop, playbook routing, output contract, and reporting standard — producing inline chat findings with no `analysis.md`, no `debug.md`, and no evidence ledger.

---
## Artifact Types

> Full definitions, decision rules, and test checklists: [`resources/artifact-type-definitions.md`](resources/artifact-type-definitions.md)

> Skills catalog, available prompts, and the investigation loop live in [`tsi.analysis.agent.md`](.github/agents/tsi.analysis.agent.md).

---
## Edit Policy for Always-Loaded Files

- `copilot-instructions.md` (`applyTo: **/*`): Requires explicit user approval before any edit.
- `agents/AGENTS.md`: Can be updated as part of plan execution tasks.