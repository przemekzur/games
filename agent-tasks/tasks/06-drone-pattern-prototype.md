# Task 06 — Mars Drone Pattern Prototype

## Use after

Use only after PR #12, `Red Frontier — Campaign Spine v5: activatable Habitat Shell`, is merged into `main`.

If PR #12 is not merged, stop.

## Goal

Give the Construction Drone Pattern its first concrete Mars payoff.

Player feeling:

> Earth validated the drone pattern, and Mars can now wake one simple construction helper.

## Target files

Likely changed:

- `mars-colony/index.html`
- `red-frontier-earth/index.html` only if kit text needs tiny copy alignment

Do not touch `shared/red-frontier-missions.js` unless absolutely necessary.

## Required behavior

### 1. Drone Pattern Core activation

If `rf_campaign_v1.cargo.constructionDronePattern === true`, the existing Drone Pattern Core marker should be activatable.

Activation should wake/fabricate one small Mars helper drone.

Visual guidance:

- small rover/drone mesh,
- cyan eye/light,
- starts near cargo cache or drone core,
- clear ORION line.

Example ORION line:

`Construction pattern accepted. I have fabricated one helper drone. Try not to assign it philosophy.`

### 2. One helper job only

The helper drone performs exactly one tiny job:

`stabilise-cargo-pad`

Behavior:

- Drone moves from Drone Pattern Core to cargo cache / nearby pad marker.
- Works for about 2–4 seconds.
- Leaves a visible result:
  - reinforced cargo pad,
  - anchor posts,
  - beacon ring,
  - compact foundation marker.
- Grants a small one-time benefit only if safe:
  - `+20 materials`, or
  - `+10 credits +10 materials`.

No repeat job.

### 3. Minimal runner only

Allowed:

- one active drone,
- one job,
- tiny local Mars runner.

Not allowed:

- queue UI,
- autonomy,
- multiple drones,
- job selection UI,
- moving robot system into `shared/` unless absolutely necessary.

### 4. Save/reload state

Persist state in Mars save payload.

Suggested flags:

- `campaign.dronePatternActivated`
- `campaign.droneHelperJobDone`

Reload behavior:

- selected but not activated: core remains activatable,
- activated but job unfinished: restore safe state or complete conservatively without duplicated reward,
- finished: result marker remains, reward does not duplicate, core cannot reactivate.

### 5. No mission-chain dependency

Do not alter Mars mission chain.

The helper drone is optional cargo payoff.

## No-kit behavior

If Construction Drone Pattern was not selected:

- no drone activation,
- no helper drone,
- no job,
- Mars remains playable.

## Acceptance criteria

- Drone Pattern Core appears when kit selected.
- Player can activate it.
- Helper drone appears.
- Helper job runs and completes.
- Visible result remains.
- Reward applies once if implemented.
- Save/reload does not duplicate drone, job result, or reward.
- No-kit and standalone flows remain unchanged.
- Habitat Shell v5 still works.
- No console errors.

## Hard no

Do not add multiple Mars drones, robot queue UI, autonomy modes, reusable robot economy, new cargo kits, factions, Moon, asteroids, external assets, or build step.
