# Task 07 — Water Survey Field Marker

## Use after

Use after Task 06 is implemented or explicitly skipped.

## Goal

Make the Water Survey Kit tangible on Mars.

Player feeling:

> Earth sent survey data, so Mars begins with a known shallow ice seam instead of blind guessing.

## Target files

Likely changed:

- `mars-colony/index.html`
- `red-frontier-earth/index.html` only if kit text needs tiny copy alignment

Do not touch `shared/red-frontier-missions.js` unless absolutely necessary.

## Required behavior

### 1. Survey marker

If `rf_campaign_v1.cargo.waterSurvey === true`, Mars should show a visible survey marker near a good early water/extractor location.

Visual guidance:

- small tripod,
- stake,
- glowing ground ring,
- label-like shape if existing UI supports it,
- no external assets.

### 2. Clear early hint

The early water/extractor objective hint should improve when Water Survey Kit exists.

Example ORION line:

`Cape Helios survey pack mapped a shallow ice seam. Not magic. Just better homework.`

### 3. One-time benefit

Choose one small benefit:

- `+20 water` on cargo application, or
- first water/extractor build gets a small cost reduction, or
- first water/extractor action completes faster if such a system exists.

Prefer the simplest safe implementation already compatible with v2/v3 behavior.

### 4. Save/reload state

Persist any one-time state.

No duplicate benefits on reload.

Survey marker should re-spawn if the kit exists and the marker is still relevant.

### 5. No-kit behavior

If Water Survey Kit was not selected:

- no survey marker,
- no survey hint,
- no water benefit,
- Mars remains playable.

Do not add a penalty.

## Acceptance criteria

- With Water Survey Kit selected, marker appears.
- Hint/ORION text reflects survey data.
- Benefit applies once only.
- With Water Survey omitted, no marker/hint/benefit appears.
- Standalone Mars unchanged.
- Save/reload does not duplicate benefit or spam ORION lines.
- No console errors.

## Hard no

Do not add a complex map, scanning minigame, new terrain system, new resource economy, external assets, or build step.
