# Agent Task Handoff Protocol

This folder is the communication layer between Przemek, ChatGPT, and coding agents.

Instead of sending long prompts through chat, ChatGPT writes structured task briefs here. The coding agent pulls the repo, reads the active task, implements it, and reports back in the PR. Przemek then tells ChatGPT to review/pull the result and prepare the next task.

## Files

- `NEXT.md` — the active task for the coding agent.
- `DONE.md` — optional parking place for completed task summaries.
- `NOTES.md` — optional longer design notes or decisions that should survive chat context.

## Agent workflow

1. Pull latest `main`.
2. Read `agent-tasks/NEXT.md`.
3. Create the branch named in the task brief.
4. Implement only the requested scope.
5. Open a PR with the requested title.
6. Include:
   - summary,
   - files changed,
   - manual test results,
   - known limitations,
   - recommendation for next iteration.
7. Do not expand scope beyond the task brief.
8. Do not remove or rewrite this protocol unless explicitly asked.

## Human workflow

1. Przemek asks ChatGPT to prepare/update `agent-tasks/NEXT.md`.
2. Przemek tells the coding agent: `pull main and follow agent-tasks/NEXT.md`.
3. Coding agent opens a PR.
4. Przemek tells ChatGPT to review the PR.
5. ChatGPT either requests a polish pass or updates `NEXT.md` for the next task.

## Rules

- The task brief is the source of truth.
- If the task conflicts with chat history, follow the task brief.
- If implementation needs a scope decision, prefer the smallest playable version and document the limitation in the PR.
- Preserve existing saves and standalone playability unless the task explicitly says otherwise.
- No surprise systems. No sideways expansion.
