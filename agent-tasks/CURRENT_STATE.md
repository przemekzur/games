# Red Frontier Current State

This file summarizes the campaign-spine work so a coding agent can continue without chat context.

## Repo

`przemekzur/games`

## Active protocol

- `agent-tasks/README.md` defines the handoff protocol.
- `agent-tasks/NEXT.md` is still the single-next-task file.
- `agent-tasks/ONE_SHOT.md` is the multi-task handoff for a longer agent run.
- `agent-tasks/tasks/` contains numbered task briefs.

## Important process rule

Do not start a task if its gating PR is not merged into `main`.

Do not admin-merge a gating PR unless Przemek explicitly says to merge it.

Use a clean worktree/clone. Do not touch unrelated local WIP such as the separate loop game.

## Campaign state so far

### Earth prequel

Path: `red-frontier-earth/index.html`

Title: `Red Frontier — The Long Launch`

Current features:

- Earth prequel vertical slice at Cape Helios.
- Shared mission schema.
- Construction drone sequence.
- Robot job abstraction.
- Two Earth robot jobs:
  - print foundation,
  - place cargo beacon.
- Cargo program authorisation.
- Cargo manifest choice: pick exactly 3 of 4 kits.
- Writes:
  - `rf_earth_prequel_complete`,
  - `rf_campaign_v1`.

Cargo keys:

```js
cargo: {
  powerKit: boolean,
  waterSurvey: boolean,
  constructionDronePattern: boolean,
  habitatShellKit: boolean
}
```

### Mars colony

Path: `mars-colony/index.html`

Title: `Red Frontier — Mars Colony`

Current features:

- Fully standalone if no Earth payload exists.
- Reads optional `rf_campaign_v1` payload.
- Applies selected kit effects once per Mars save.
- Shows cargo cache / kit markers.
- Preserves old saves safely.
- Habitat Shell Kit v5 PR adds an activatable folded shell pallet that arms a first-Habitat benefit.

### Hub

Path: `index.html`

Current features:

- Shows The Long Launch as Part I.
- Shows Mars Colony as Part II.
- Shows selected and left-behind cargo on Mars card if Earth manifest exists.

## Latest known PRs

- PR #10 — Campaign Spine v3: Earth cargo manifest choice — merged before v4.
- PR #11 — Campaign Spine v4: manifest recap and Mars handoff polish — expected baseline for v5.
- PR #12 — Campaign Spine v5: activatable Habitat Shell — open at the time this pack was created.

## One-shot start condition

Before using `agent-tasks/ONE_SHOT.md`, PR #12 must be merged into `main`.

If PR #12 is still open, stop and ask Przemek to merge it or explicitly approve merging it.
