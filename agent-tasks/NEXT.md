# NEXT TASK — Red Frontier

## Use after

Use this task only after PR #10, `Red Frontier — Campaign Spine v3: Earth cargo manifest choice`, is merged into `main`.

If PR #10 is not merged, stop and report that PR #10 must be merged first.

Do not admin-merge the gating PR yourself unless Przemek explicitly asks you to do that.

Expected v3 baseline:

- Earth shows a cargo manifest before final authorisation.
- Player chooses exactly 3 of 4 cargo kits.
- Earth writes selected kits into `rf_campaign_v1.cargo`.
- Mars applies only selected kit effects.
- Mars standalone still works.

## Branch

Create a new branch from latest `main`:

`feat/red-frontier-manifest-recap-v4`

## PR title

`Red Frontier — Campaign Spine v4: manifest recap and Mars handoff polish`

## Goal

Make the Earth cargo choice visible across the handoff.

Today the manifest choice works mechanically. This task should make the player understand what they chose, what they left behind, and what Mars will receive.

Player feeling:

> I made a tradeoff on Earth, and the game remembers that tradeoff before Mars begins.

## Target files

Likely changed:

- `index.html`
- `red-frontier-earth/index.html`
- `mars-colony/index.html` only for small copy/recap polish if needed

Do not touch `shared/red-frontier-missions.js`.

## Scope

### 1. Hub: surface selected manifest on the Mars card

If `rf_campaign_v1` exists and contains cargo choices, the hub should show a compact status on the Red Frontier Mars card.

Example:

`Earth cargo authorised: Power Kit · Habitat Shell · Drone Pattern`

Also show a small line for the missing kit:

`Left behind: Water Survey Kit`

Keep it short. Do not build a campaign launcher.

If no Earth payload exists, hub behavior should remain normal.

### 2. Earth: final modal should show selected and omitted kits

Earth completion modal already lists selected kits. Add or polish one short line showing what was left behind.

Example:

`Left behind at Cape Helios: Water Survey Kit.`

If all four kits are present from an old payload or debug path, handle it gracefully.

### 3. Earth: add a small manifest replay affordance after completion

Add a simple way to review the last authorised manifest from the Earth page after completion.

Preferred small solution:

- On reload, if `rf_campaign_v1` exists, the intro or terminal can mention the previous manifest.
- Or add a small button near the final/terminal state: `Review authorised cargo`.

Keep it tiny. No edit/re-pick after completion in this task.

### 4. Mars: polish intro/receipt copy for omitted kits

When Mars detects Earth cargo, it should list received kits only.

Add one dry ORION line or receipt note for omitted kits if easy:

`Manifest gap noted: Water Survey Kit absent. I will pretend this was a strategic decision.`

Do not add missing-kit penalties beyond simply not applying that kit effect.

## Hard no

Do not add:

- cargo re-selection,
- cargo weights,
- cargo economy,
- new cargo kits,
- Mars robots,
- activatable Habitat shell yet,
- autonomy,
- Moon,
- asteroids,
- factions,
- dialogue trees,
- external assets,
- build step.

## Acceptance criteria

### Hub

- With selected cargo payload, Mars card shows selected kits.
- Hub also shows omitted kit if one exists.
- With no Earth payload, hub remains normal.
- Both Red Frontier cards still launch.

### Earth

- Completion modal lists selected kits.
- Completion modal or review path shows omitted kit.
- Existing Earth mission flow still works.
- `rf_campaign_v1` still writes correctly.

### Mars

- Mars still applies only selected kit effects.
- Mars receipt/intro remains accurate.
- Omitted kit is not applied or spawned.
- Save/reload does not duplicate effects or ORION lines.
- Standalone Mars remains unchanged.

## Manual test checklist

1. Clear Red Frontier localStorage keys.
2. Complete Earth with one kit omitted.
3. Confirm final modal lists selected kits and omitted kit.
4. Return to hub.
5. Confirm Mars card shows selected kits and omitted kit.
6. Launch Mars.
7. Confirm Mars receipt/intro matches selected kits.
8. Confirm omitted kit effect does not appear.
9. Save and reload Mars.
10. Confirm no duplicate cargo effects.
11. Clear Earth payload.
12. Confirm hub and Mars standalone behave normally.
13. Confirm no console errors.

## PR requirements

PR must include:

- summary,
- files changed,
- implementation notes,
- manual test results,
- known limitations,
- recommendation for next iteration.

## Design rule

This is handoff polish, not a new system.

Make the choice readable before adding more Mars mechanics.
