# Red Frontier One-Shot Agent Handoff

Use this file when Przemek wants a longer coding-agent run instead of one PR per tiny task.

## Start condition

Start only after PR #12, `Red Frontier — Campaign Spine v5: activatable Habitat Shell`, is merged into `main`.

If PR #12 is not merged, stop and report that PR #12 must be merged first.

Do not admin-merge PR #12 unless Przemek explicitly asks you to merge it.

## Worktree safety

Use a clean worktree or clean clone.

Do not touch unrelated local WIP, especially the separate loop game files that may exist in the user's working tree.

Recommended:

```bash
git fetch origin
git worktree add ../games-red-frontier-spine -b feat/red-frontier-one-shot-spine origin/main
cd ../games-red-frontier-spine
```

## Source of truth

Read these files in order:

1. `agent-tasks/README.md`
2. `agent-tasks/CURRENT_STATE.md`
3. `agent-tasks/ROADMAP.md`
4. This file
5. The numbered task files in `agent-tasks/tasks/`

## One-shot branch

If doing the full batch in one PR, use branch:

`feat/red-frontier-cargo-payoffs-one-shot`

PR title:

`Red Frontier — Campaign Spine: cargo payoffs and completion pass`

## Execution order

Implement in this order:

1. `agent-tasks/tasks/06-drone-pattern-prototype.md`
2. `agent-tasks/tasks/07-water-survey-field-marker.md`
3. `agent-tasks/tasks/08-power-kit-stabilisation.md`
4. `agent-tasks/tasks/09-spine-qa-balance.md`
5. `agent-tasks/tasks/10-completion-polish.md`

Commit after each task if possible.

Suggested commit messages:

- `Implement Mars drone pattern prototype`
- `Implement water survey field marker`
- `Implement power kit stabilisation`
- `Balance Red Frontier campaign spine`
- `Polish Red Frontier campaign completion flow`

## Scope control

This is not permission to build every idea.

Hard no:

- Moon,
- asteroids,
- factions,
- warp,
- companions,
- dialogue trees,
- procedural economy,
- complex cargo weights,
- multiple drones,
- robot queue UI,
- autonomy modes,
- build step,
- external assets.

## If the batch becomes too large

If implementation becomes risky, split at a clean boundary:

- PR A: V6 only.
- PR B: V7 + V8.
- PR C: V9 + V10.

Document why it was split.

## Final PR requirements

The final PR body must include:

- summary,
- tasks completed,
- files changed,
- implementation notes,
- manual test results,
- known limitations,
- skipped/deferred items,
- recommendation for next iteration or playtest.

## Minimum manual test matrix

Run at least these scenarios:

1. Fresh browser, complete Earth with Power + Water + Habitat.
2. Launch Mars and confirm only those three kit effects appear.
3. Fresh browser, complete Earth with Power + Habitat + Drone.
4. Launch Mars and confirm Water effect is absent and Drone effect appears.
5. Fresh browser, complete Earth with Water + Habitat + Drone.
6. Launch Mars and confirm Power effect is absent.
7. Mars standalone with no Earth payload.
8. Old all-true payload.
9. Save/reload after each one-time cargo effect.
10. Confirm no console errors.

## Desired final state

At the end of this one-shot run:

- every cargo kit has a visible Mars payoff,
- omitted kits are absent without adding punishments,
- one-time flags survive reload,
- Earth to Mars handoff is readable,
- Mars remains standalone,
- the first 10 minutes of the campaign feel coherent.
