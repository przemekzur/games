# NEXT TASK — Red Frontier

## Use after

Use this task only after Campaign Spine v2 is merged into `main`.

Expected v2 baseline:

- Mars reads per-kit flags from `rf_campaign_v1.cargo`.
- Mars applies concrete per-kit effects.
- Mars standalone mode still works without Earth payload.
- Save/reload does not duplicate cargo effects.

## Branch

Create a new branch from latest `main`:

`feat/red-frontier-cargo-manifest-v3`

## PR title

`Red Frontier — Campaign Spine v3: Earth cargo manifest choice`

## Goal

Add a minimal cargo-manifest choice to the Earth prequel.

Today Earth writes a fixed cargo package with all kits enabled. Mars already reads per-kit flags. This task should let the player choose a limited cargo package on Earth so different Earth completions create different Mars starts.

Player feeling:

> I cannot send everything. My Earth decision changes the Mars opening.

## Target files

Likely changed:

- `red-frontier-earth/index.html`
- `mars-colony/index.html` only for compatibility/polish if needed
- `index.html` only if hub copy needs tiny wording

Do not touch `shared/red-frontier-missions.js` unless absolutely necessary.

## Cargo kits

Use the existing four cargo keys:

- `powerKit`
- `waterSurvey`
- `constructionDronePattern`
- `habitatShellKit`

## Required behavior

### Earth

Before final cargo-program authorisation, show a small cargo manifest choice.

Keep it simple:

- player chooses exactly 3 of 4 kits, or
- player chooses 2 of 4 if the UI is cleaner.

Preferred: choose exactly 3 of 4. This creates a real tradeoff without being too punishing.

The final `rf_campaign_v1` payload must write only the selected kits as `true`; unselected kits should be `false` or omitted consistently.

Example payload shape:

```js
cargo: {
  powerKit: true,
  waterSurvey: false,
  constructionDronePattern: true,
  habitatShellKit: true
}
```

The completion modal should list the selected kits and clearly say the package is limited.

### Mars

Mars must continue to read the cargo flags defensively.

If a kit is missing or false:

- do not apply that kit effect,
- do not spawn that kit marker,
- do not mention that kit in the receipt.

If old payloads exist where all four kits are true, they should still work.

If no Earth payload exists, Mars remains standalone and unchanged.

## UI guidance

Earth manifest UI can be a modal or terminal panel.

It should be clear and small:

- Kit name
- One-line Mars consequence
- selected/unselected state
- selected count, for example `Selected 2/3`
- disabled confirm until the required number is selected

Suggested kit descriptions:

- Power Kit — stabilises early power and cargo reserve.
- Water Survey Kit — marks a shallow ice seam near the landing site.
- Habitat Shell Kit — reduces first Habitat deployment cost.
- Construction Drone Pattern — delivers the validated drone fabrication core.

No complex inventory.
No cargo weights.
No advanced balancing.

## Scope limits

Do not add:

- more cargo kits,
- cargo weights,
- cargo economy,
- multiple Earth endings,
- Mars robots,
- autonomy,
- factions,
- Moon,
- asteroids,
- dialogue trees,
- external assets,
- build step.

## Save/reload safety

- Earth still writes `rf_earth_prequel_complete`.
- Earth writes `rf_campaign_v1` with selected cargo.
- Mars applies selected kit effects once per Mars save.
- Mars reload does not duplicate effects.
- Old Mars saves still load.
- Old all-kit Earth payloads still work.

## Acceptance criteria

### Earth

- Earth prequel boots cleanly.
- Existing mission flow still works.
- Cargo manifest appears before final authorisation.
- Player can select the required number of kits.
- Player cannot confirm with too few or too many kits.
- Final modal lists selected kits.
- `rf_campaign_v1.cargo` reflects the selected kits.

### Mars

- Mars standalone still behaves unchanged.
- Mars after Earth applies only selected kit effects.
- Unselected kit effects do not appear.
- Old all-kit payload still works.
- Save/reload does not duplicate effects or ORION lines.
- No console errors.

## Manual test checklist

1. Clear Red Frontier localStorage keys.
2. Complete Earth up to cargo authorisation.
3. Confirm manifest appears.
4. Try confirming with too few kits; confirm is blocked.
5. Select the required number of kits.
6. Authorise cargo.
7. Confirm `rf_campaign_v1.cargo` matches selection.
8. Launch Mars.
9. Confirm only selected cargo effects appear.
10. Save Mars.
11. Reload Mars.
12. Confirm effects do not duplicate.
13. Test old all-true payload if practical.
14. Clear Earth payload.
15. Start Mars standalone.
16. Confirm standalone behavior unchanged.

## PR requirements

PR must include:

- summary,
- files changed,
- implementation notes,
- manual test results,
- known limitations,
- recommendation for next iteration.

## Design rule

This is the first real strategic choice in the Earth to Mars spine. Keep it small, legible, and reliable.
