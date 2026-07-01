# Task 08 — Power Kit Stabilisation

## Use after

Use after Task 07 is implemented or explicitly skipped.

## Goal

Make the Power Kit tangible on Mars.

Player feeling:

> Earth sent a power kit, so the first Mars minutes feel more stable and prepared.

## Target files

Likely changed:

- `mars-colony/index.html`
- `red-frontier-earth/index.html` only if kit text needs tiny copy alignment

Do not touch `shared/red-frontier-missions.js` unless absolutely necessary.

## Required behavior

### 1. Visible Power Kit object

If `rf_campaign_v1.cargo.powerKit === true`, Mars should show a visible Power Kit crate, battery pallet, or reserve cell near the starter Solar Array / cargo cache.

Visual guidance:

- compact battery pallet,
- subtle pulsing power ring,
- cyan/amber small indicator,
- no external assets.

### 2. Small stabilisation benefit

Choose one small, reliable benefit:

- one-time `+20 credits`, or
- one-time `+20 materials`, or
- first power-related build receives a small discount, or
- emergency reserve that prevents/softens the first early power shortfall if that logic exists.

Prefer the simplest implementation that is obvious and does not destabilize balance.

### 3. Feedback

Add a short ORION/system line when the kit is applied or activated.

Example:

`Power kit online. The colony now has a small reserve, which is a polite way to say one fewer excuse.`

### 4. Save/reload state

Persist any one-time state.

No duplicate benefit on reload.

Power Kit marker should not duplicate.

### 5. No-kit behavior

If Power Kit was not selected:

- no Power Kit marker,
- no power stabilisation benefit,
- Mars remains playable.

Do not add a penalty.

## Acceptance criteria

- With Power Kit selected, visible Power Kit marker appears.
- Benefit applies once only.
- Feedback line appears once only.
- With Power Kit omitted, no marker/benefit appears.
- Standalone Mars unchanged.
- Save/reload does not duplicate benefit or marker.
- No console errors.

## Hard no

Do not add a power-grid simulation, battery economy, new resource system, external assets, or build step.
