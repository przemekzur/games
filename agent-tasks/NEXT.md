# NEXT TASK — Red Frontier

## Use after

Use this task only after PR #11, `Red Frontier — Campaign Spine v4: manifest recap and Mars handoff polish`, is merged into `main`.

If PR #11 is not merged, stop and report that PR #11 must be merged first.

Do not admin-merge the gating PR yourself unless Przemek explicitly asks you to do that.

Expected v4 baseline:

- Earth cargo manifest choice exists.
- Hub shows selected kits and left-behind kit on the Mars card.
- Earth has a read-only manifest recap after completion.
- Mars receipt/ORION copy reflects omitted kits.
- Mars still applies only selected kit effects.

## Branch

Create a new branch from latest `main`:

`feat/red-frontier-habitat-shell-v5`

## PR title

`Red Frontier — Campaign Spine v5: activatable Habitat Shell`

## Goal

Give the Earth cargo tradeoff one concrete Mars mechanic.

Today the Habitat Shell Kit mostly affects first-Habitat cost. This task should turn it into a visible, activatable Mars object that changes the first colony step.

Player feeling:

> I chose Habitat Shell on Earth, and now Mars gives me an actual staged shelter component I can use.

Keep this to one mechanic. Do not add Mars robots yet.

## Target files

Likely changed:

- `mars-colony/index.html`
- `red-frontier-earth/index.html` only if kit text needs tiny copy alignment
- `index.html` only if hub copy needs tiny wording

Do not touch `shared/red-frontier-missions.js`.

## Scope

### 1. Mars: replace/upgrade Habitat Shell discount into an activatable shell

If `rf_campaign_v1.cargo.habitatShellKit === true`, spawn a visible `Folded Habitat Shell` or `Habitat Shell Pallet` near the starter cargo cache.

The shell should be interactable or otherwise clearly activatable through existing Mars UI patterns.

Activation should give a concrete benefit to the first Habitat.

Preferred implementation:

- Player activates the Habitat Shell.
- Activation consumes/marks the shell as used.
- The first Habitat build receives the shell benefit.
- Benefit should be simple and obvious:
  - reduced first Habitat cost, or
  - instant partial construction credit, or
  - converts the shell marker into a Habitat if this is safe with the existing building system.

Safest acceptable version:

- Activating the shell sets `campaign.habitatShellActivated = true`.
- First Habitat cost is reduced by a clear amount, e.g. `-40 materials`.
- Once the first Habitat is built, set `campaign.habitatShellUsed = true`.
- The shell marker changes visual state or disappears.

If converting the shell directly into a working Habitat is safe, do it. If it risks breaking missions/save compatibility, use the activation + discount model.

### 2. Mars: make activation readable

Add clear feedback when the player activates the shell.

Example ORION line:

`Habitat shell unfolded. Not a home yet, but statistically better than dying outside.`

UI/feedback should make it clear that:

- the shell came from Earth cargo,
- it affects the first Habitat only,
- it is one-time use.

### 3. Mars: save/reload state

Persist all needed state in the Mars save payload.

Required flags, names can vary:

- `campaign.habitatShellActivated`
- `campaign.habitatShellUsed`

Reload behavior:

- If shell was not activated, marker remains activatable.
- If shell was activated but first Habitat not built, benefit remains available.
- If shell was used, marker should not reactivate or duplicate benefit.
- No bonus duplication on reload.

Existing old saves must load safely.

### 4. Mars: no Habitat Shell kit case

If Habitat Shell Kit was not selected on Earth:

- no activatable shell marker,
- no first-Habitat shell benefit,
- normal Habitat cost/flow,
- optional dry ORION omitted-kit line from v4 remains enough.

Do not add penalties.

### 5. Earth / hub copy alignment

Only update copy if current kit descriptions are misleading.

Suggested kit text:

`Habitat Shell Kit — stages a fold-out shelter shell for the first Mars habitat.`

Do not add new cargo choices.

## Hard no

Do not add:

- Mars construction drones,
- robot job system on Mars,
- cargo weights,
- cargo economy,
- new cargo kits,
- cargo re-selection,
- multiple Earth endings,
- factions,
- Moon,
- asteroids,
- autonomy,
- dialogue trees,
- external assets,
- build step.

## Acceptance criteria

### Mars with Habitat Shell Kit selected

- Mars spawns a visible Habitat Shell marker/pallet.
- Player can activate it or otherwise clearly use it.
- Activation gives clear feedback.
- First Habitat receives a one-time benefit.
- Benefit cannot be duplicated.
- Save/reload preserves shell state correctly before activation, after activation, and after use if practical.
- Mission tracker still works.

### Mars without Habitat Shell Kit

- No shell marker appears.
- First Habitat uses normal cost/flow.
- Mars remains playable.

### Compatibility

- Mars standalone with no Earth payload behaves normally.
- Old Mars saves load safely.
- Old all-kit Earth payload still enables the shell.
- No console errors.

## Manual test checklist

1. Clear Red Frontier localStorage keys.
2. Complete Earth selecting Habitat Shell Kit.
3. Launch Mars.
4. Confirm shell marker appears.
5. Activate shell.
6. Confirm ORION/feedback line appears.
7. Build first Habitat.
8. Confirm shell benefit applies once.
9. Save and reload before/after shell use if practical.
10. Complete Earth omitting Habitat Shell Kit.
11. Launch Mars.
12. Confirm no shell marker and normal Habitat flow.
13. Launch Mars standalone with no Earth payload.
14. Confirm standalone behavior unchanged.
15. Confirm no console errors.

## PR requirements

PR must include:

- summary,
- files changed,
- implementation notes,
- manual test results,
- known limitations,
- recommendation for next iteration.

## Design rule

One cargo kit, one real mechanic.

Make Habitat Shell feel tangible before adding Mars robots or deeper cargo systems.
