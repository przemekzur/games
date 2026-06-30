# NEXT TASK — Red Frontier

## Use after

Use this task only after PR #12, `Red Frontier — Campaign Spine v5: activatable Habitat Shell`, is merged into `main`.

If PR #12 is not merged, stop and report that PR #12 must be merged first.

Do not admin-merge the gating PR yourself unless Przemek explicitly asks you to do that.

Expected v5 baseline:

- Habitat Shell Kit creates an activatable Mars shell pallet.
- Activating it arms a one-time first-Habitat benefit.
- The first Habitat consumes/forfeits the shell either way.
- Save/reload preserves shell state.
- Mars standalone and no-kit flows still work.

## Branch

Create a new branch from latest `main`:

`feat/red-frontier-drone-pattern-v6`

## PR title

`Red Frontier — Campaign Spine v6: Mars drone pattern prototype`

## Goal

Give the Construction Drone Pattern its first concrete Mars payoff.

Today the Drone Pattern is mostly a crate/story promise. This task should turn it into a small Mars-side prototype: one visible drone core that can deploy one tiny helper job.

Player feeling:

> Earth validated the drone pattern, and Mars can now wake one simple construction helper.

Keep this as one mechanic. No full robot economy yet.

## Target files

Likely changed:

- `mars-colony/index.html`
- `red-frontier-earth/index.html` only if kit text needs tiny copy alignment
- `index.html` only if hub copy needs tiny wording

Do not touch `shared/red-frontier-missions.js` unless absolutely necessary.

## Scope

### 1. Mars: Drone Pattern Core becomes activatable

If `rf_campaign_v1.cargo.constructionDronePattern === true`, the existing Drone Pattern Core marker should be activatable.

Activation should wake or fabricate one small Mars construction helper.

Keep it visually simple:

- small rover/drone mesh,
- cyan eye/light,
- starts near the cargo cache or drone core,
- clear ORION line on activation.

Example ORION line:

`Construction pattern accepted. I have fabricated one helper drone. Try not to assign it philosophy.`

### 2. One authored helper job only

The helper drone should perform exactly one tiny job.

Preferred job:

`stabilise-cargo-pad`

Behavior:

- Drone moves from the Drone Pattern Core to the cargo cache / nearby pad marker.
- Works for about 2–4 seconds.
- Leaves a small visible result, e.g. reinforced cargo pad, anchor posts, beacon ring, or compact foundation marker.
- Grants a small one-time benefit, such as:
  - +20 materials, or
  - +10 credits and +10 materials, or
  - improves cargo cache visual state only if avoiding balance changes is safer.

The job must complete once and not repeat on reload.

### 3. Minimal job runner allowed, but no full system

You may implement a tiny local Mars job runner if needed.

Keep it smaller than the Earth robot system:

- one active drone,
- one job,
- no queue UI,
- no autonomy modes,
- no multiple drones,
- no job selection UI.

If copying a compact pattern from Earth is cleaner, do that locally in `mars-colony/index.html`.

Do not move robot code into `shared/` in this iteration unless the implementation becomes dramatically simpler and remains low risk.

### 4. Save/reload state

Persist drone state in the Mars save payload.

Required behavior:

- If Drone Pattern Kit was not selected: no drone core activation, no drone.
- If selected but not activated: core remains activatable.
- If activated but job not finished: either restore a safe activated state or complete conservatively without duplication. Prefer restoring if simple.
- If job finished: result marker remains, benefit does not duplicate, core cannot reactivate.

Suggested flags, names can vary:

- `campaign.dronePatternActivated`
- `campaign.droneHelperJobDone`

No duplicate rewards on reload.

### 5. No mission-chain dependency yet

Do not alter the Mars mission chain.

The helper drone is a cargo payoff, not a required objective.

Mars must remain playable if the player ignores the drone core.

### 6. Earth / hub copy alignment

Only update copy if current kit descriptions are misleading.

Suggested kit text:

`Construction Drone Pattern — fabricates one Mars helper drone for a cargo-pad stabilisation job.`

Do not add new cargo choices.

## Hard no

Do not add:

- multiple Mars drones,
- robot queue UI,
- autonomy modes,
- reusable robot job economy,
- new cargo kits,
- cargo re-selection,
- cargo weights,
- factions,
- Moon,
- asteroids,
- dialogue trees,
- external assets,
- build step.

## Acceptance criteria

### Mars with Construction Drone Pattern selected

- Drone Pattern Core appears as before.
- Player can activate it.
- A visible helper drone appears/wakes.
- Drone performs one small job.
- Job leaves a visible completed result.
- Any reward/benefit applies once only.
- Save/reload does not duplicate drone, job result, or reward.
- Mission tracker still works.

### Mars without Construction Drone Pattern

- No drone activation is available.
- No helper drone appears.
- Mars remains playable.

### Compatibility

- Mars standalone with no Earth payload behaves normally.
- Old Mars saves load safely.
- Old all-kit Earth payload enables the drone pattern.
- Habitat Shell v5 behavior still works.
- No console errors.

## Manual test checklist

1. Clear Red Frontier localStorage keys.
2. Complete Earth selecting Construction Drone Pattern.
3. Launch Mars.
4. Confirm Drone Pattern Core can be activated.
5. Activate it.
6. Confirm helper drone appears.
7. Confirm helper job runs and completes.
8. Confirm visible job result remains.
9. Confirm reward/benefit applies once.
10. Save and reload before/after job completion if practical.
11. Complete Earth omitting Construction Drone Pattern.
12. Launch Mars.
13. Confirm no drone activation/helper appears.
14. Launch Mars standalone with no Earth payload.
15. Confirm standalone behavior unchanged.
16. Confirm Habitat Shell v5 still works if selected.
17. Confirm no console errors.

## PR requirements

PR must include:

- summary,
- files changed,
- implementation notes,
- manual test results,
- known limitations,
- recommendation for next iteration.

## Design rule

One cargo kit, one helper action.

Make the drone pattern tangible without turning Mars into a robot-management game yet.
