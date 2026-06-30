# NEXT TASK — Red Frontier

## Status

Use this task **after PR #8 is merged into `main`**.

If PR #8 is not merged yet, stop and merge/rebase first. The next task depends on Campaign Spine v1 being present:

- Earth writes `rf_campaign_v1`.
- Mars reads optional Earth cargo payload.
- Mars applies one-time cargo bonus/cache/story beat.
- Hub shows Part I / Part II ordering.

## Branch

Create a new branch from latest `main`:

```bash
git checkout main
git pull
git checkout -b feat/red-frontier-cargo-unpacking-v2
```

## PR title

`Red Frontier — Campaign Spine v2: concrete cargo unpacking`

## Goal

Make the Earth cargo package feel specific on Mars.

Campaign Spine v1 made Mars remember Earth through:

- `rf_campaign_v1`,
- visible cargo cache,
- one-time flat resource bonus,
- ORION acknowledgement.

Campaign Spine v2 should make the cargo kits produce concrete Mars consequences.

Player feeling:

> Earth did not just send generic resources. It sent specific tools that change the first Mars minutes.

Both games must stay standalone.

## Likely files changed

- `mars-colony/index.html`
- `red-frontier-earth/index.html` only if modal/cargo copy needs a tiny update
- `index.html` only if hub copy needs a tiny update

Do not add new folders.
Do not touch `shared/red-frontier-missions.js` unless absolutely necessary.

## Scope

### 1. Mars: unpack each cargo kit into a concrete effect

When Mars detects `rf_campaign_v1.earthComplete === true`, apply each cargo kit once.

Use existing `campaign.earthCargoApplied` or equivalent save flags to prevent duplication.

Old saves must load safely.

### A. Power Kit

Concrete effect:

- Keep existing starter Solar Array behavior.
- Add a visible small `Power Kit Crate` or battery pallet near the starter Solar Array.
- Add a small power/credits/materials bonus only if needed.

Do not overbalance.

### B. Water Survey Kit

Concrete effect:

- Add a visible `Survey Marker` near a good early ice/extractor location.
- Improve the early water objective hint when Earth cargo exists.
- Optional small water bonus is fine, but the marker/hint matters more than numbers.

Suggested ORION line:

> Cape Helios survey pack mapped a shallow ice seam. Not magic. Just better homework.

### C. Habitat Shell Kit

Concrete effect:

- Add a visible `Habitat Shell Crate` / `Folded Habitat Shell` near the starter zone.
- This should reduce the cost of the first Habitat OR give a one-time materials credit when building the first Habitat.

Preferred simple implementation:

- When Earth cargo exists and `habitatShellKit` is present, the first Habitat costs less by a clear amount, e.g. `-40 materials / -20 credits`.
- Show this in the build tooltip/card if practical.
- If tooltip changes are risky, show an ORION/system line before the first Habitat build:

> Habitat shell kit staged. First Habitat construction cost reduced.

Do not pre-place an actual working Habitat yet unless it is very safe.

### D. Construction Drone Pattern

Concrete effect:

- Do not add full Mars drone gameplay yet.
- Add a visible `Drone Pattern Core` cargo crate.
- Add a story/ORION beat that says Mars can later fabricate drones.
- Optional: unlock a future `Drone Bay` card visually disabled/coming soon if the Mars UI has a safe place for it.

Keep it as future promise unless adding a tiny cosmetic drone is trivial.

Important:

Do not port the Earth robot job system into Mars in this iteration unless it is very small and low risk.

## 2. Replace/augment flat bonus with itemized cargo application

Current v1 bonus:

- `+60 materials`
- `+40 credits`
- `+20 science`
- `+20 water`

For v2, prefer itemized bonuses/effects:

Suggested:

- Power Kit: `+20 credits` or small power reserve note
- Water Survey Kit: `+20 water` + survey marker/hint
- Habitat Shell Kit: first Habitat discount
- Drone Pattern: `+20 science` + Drone Pattern Core marker

Total should remain roughly comparable to v1, but more meaningful.

Avoid making Mars too easy.

## 3. Mars UI / feedback

When Earth cargo is applied, show a compact cargo receipt using one of:

- ORION feed line sequence,
- toast,
- intro paragraph.

It should list:

- Power Kit
- Water Survey Kit
- Habitat Shell Kit
- Construction Drone Pattern

Do not create a complex inventory panel yet.

## 4. Save/reload safety

Cargo effects must be one-time per Mars save.

Required:

- Save whether Earth cargo was applied.
- Save whether first Habitat discount was already used, if implemented.
- Reload must not duplicate cargo effects.
- Reload must not repeat ORION spam.
- Existing old Mars saves with no `campaign` field must load.

## 5. Standalone behavior

If no `rf_campaign_v1` exists:

- Mars behaves as it does today.
- No cargo markers.
- No cargo bonuses.
- No altered build costs.
- No continuity ORION lines.

## 6. Earth

Earth already writes fixed cargo:

```js
cargo: {
  powerKit: true,
  waterSurvey: true,
  constructionDronePattern: true,
  habitatShellKit: true
}
```

Only update Earth if:

- final modal copy needs to better match the concrete Mars effects, or
- cargo payload key names need to be made safer.

Do not add cargo choice UI yet.

## Hard no

Do not add:

- cargo selection UI,
- complex cargo manifest balancing,
- Mars construction drones,
- full cargo unpacking economy,
- autonomy,
- robot queue UI,
- factions,
- companions,
- Moon,
- asteroids,
- warp expansion,
- dialogue trees,
- external assets,
- build step.

## Acceptance criteria

### Earth

- Earth still completes normally.
- `rf_campaign_v1` still writes correctly.
- Completion modal still makes sense.

### Mars standalone

- With no Earth payload, Mars behaves as before.
- Old saves still load.
- No console errors.

### Mars after Earth

- Mars detects `rf_campaign_v1`.
- Cargo kit receipt is communicated.
- Visible cargo kit markers appear.
- Water survey marker appears.
- First Habitat discount or equivalent habitat-shell benefit works once.
- Drone Pattern Core appears or is acknowledged.
- Itemized bonuses/effects apply once.
- Save/reload does not duplicate bonuses, discount, markers, or ORION lines.
- Mission tracker still works.
- Mars remains playable.

## Manual test checklist

1. Clear Red Frontier localStorage keys.
2. Complete Earth.
3. Confirm `rf_campaign_v1` contains all four cargo kits.
4. Launch Mars.
5. Confirm cargo receipt/ORION acknowledgement.
6. Confirm visible cargo kit markers.
7. Confirm water survey marker/hint.
8. Build first Habitat and confirm shell-kit benefit works once.
9. Save Mars.
10. Reload Mars.
11. Confirm effects do not duplicate.
12. Clear Earth payload.
13. Start Mars standalone.
14. Confirm no cargo effects.
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

This is still not a cargo economy.

Make the four Earth kits feel real on Mars, but keep the system simple and reliable.
