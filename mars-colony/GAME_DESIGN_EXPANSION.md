# Red Frontier — Humanity Arc Game Design Expansion

Design-only proposal for expanding `mars-colony/` from a standalone 3D Mars colony strategy game into a larger RPG/resource-management space-colonisation saga.

This document intentionally does **not** propose code changes. It is meant to become the game-direction source for future implementation tickets, prompts, and agent work.

---

## 1. Current Repo Anchor

Current game: **Red Frontier — Mars Colony**.

Current identity:

- Browser-based arcade hub game.
- Mars colony / terraforming strategy.
- 3D planet presentation using Three.js from CDN.
- Existing core loop already contains resources, buildings, research, terraforming, Earth supply/trade, spaceport, interplanetary transit, and warp-drive technology.

Important existing elements to preserve:

- Resources: oxygen, water, food, materials, science, credits, power, population, morale.
- Buildings: solar array, wind turbine, fission reactor, batteries, habitats, extractors, oxygenator, hydro farm, ore excavator, lab, bio-dome park, storage, trade beacon, spaceport, arcology, algae pools, atmospheric heaters, orbital mirrors, atmospheric processors.
- Tech branches: Power, Logistics, Biotech, Society, Frontier.
- Current late-game ideas already include Interplanetary Transit and Warp Drive. The expansion should make those feel earned through story, missions, and player identity.

---

## 2. North Star

**Red Frontier becomes a story of humanity learning how to leave Earth without losing itself.**

The player starts on Earth before Mars colonisation. They do not simply click “build Mars base”. They must build the industrial, robotic, political, AI, and launch capability required to make Mars possible.

The game should feel like:

- **Factorio / Satisfactory** for resource chains and automation.
- **Surviving Mars / Frostpunk** for colony pressure and hard choices.
- **Mass Effect / Starfield-lite** for multi-location mission structure and companion-driven storytelling.
- **Kerbal-inspired** in spirit for rocket progress, but simplified and mission-driven.
- **Hard sci-fi evolving into optimistic future sci-fi**: Earth → Moon → Mars → asteroid belt → outer planets → warp.

The emotional promise:

> You are not just building a colony. You are building the first version of a multi-planet civilisation, with AI as humanity's partner, mirror, and potential risk.

---

## 3. Design Pillars

### 3.1 Systems-first story

Story should be delivered through things the player builds, loses, repairs, automates, and chooses. Avoid long passive lore dumps.

Examples:

- A dust storm is not just text. It reduces solar output, damages exposed robots, interrupts Earth comms, and forces the player to choose between science, survival, or expansion.
- A political conflict with Earth is not just dialogue. It changes launch permits, funding, trade prices, and crew morale.
- AI trust is not just a morality score. It affects automation, robot autonomy, failure recovery, and faction reactions.

### 3.2 Multi-scale player identity

The player is both:

1. A person walking around in 3D story episodes.
2. A mission director making strategic decisions.
3. A civilisation architect shaping generations.

This allows Earth prequel missions to be more personal, while Mars gameplay remains strategic.

### 3.3 AI as a character and mechanic

AI should not be a menu skin. It should be a named companion/system with memory, constraints, and evolving autonomy.

Working name: **ORION** — Orbital Reasoning & Infrastructure Operations Network.

ORION begins as a planning assistant on Earth. Later it becomes:

- factory optimiser,
- rover/drone coordinator,
- Mars emergency controller,
- colony historian,
- ethical opponent or ally,
- possible key to warp physics.

### 3.4 Fictionalised but recognisable inspiration

The Earth prequel can be inspired by reusable rockets, Starship-like architecture, methane/oxygen propellant, robotic manufacturing, printed structures, AI operations, and high-cadence launches — but it should avoid becoming SpaceX fanfic.

Use fictional naming:

- SpaceX-inspired company → **Asterion Launch Systems** or **Redline Aerospace**.
- Starbase-inspired site → **Cape Helios**.
- Starship-inspired vehicle → **Argosy**.
- Optimus/robot-inspired units → **Atlas Drones**, **Forgewalkers**, **Masons**.

### 3.5 Escalation without feature chaos

The campaign can become huge, but each iteration must add one clean loop:

- Earth: build launch capability.
- Mars: survive and grow.
- Moon: prove off-world industry.
- Earth-Mars: logistics and return flights.
- Asteroids: autonomous mining economy.
- Outer planets: science, extreme environments.
- Warp: civilisation-scale breakthrough.

---

## 4. Suggested Game Title Direction

Keep **Red Frontier** as the franchise name.

Possible subtitles:

1. **Red Frontier: First Sol** — strongest for current Mars focus.
2. **Red Frontier: Humanity Arc** — strongest for the long saga.
3. **Red Frontier: The Long Launch** — strongest for Earth prequel.
4. **Red Frontier: From Dust to Stars** — more emotional / broad.
5. **Red Frontier: Project Argosy** — strong if rocket program becomes central.

Recommendation:

- Current game page: **Red Frontier — Mars Colony**.
- Expansion design name: **Red Frontier: Humanity Arc**.
- Earth prequel episode: **The Long Launch**.

---

## 5. High-Level Narrative Arc

### Act 0 — Earth: The Pressure Cooker

Setting: near-future Earth, not post-apocalyptic, but strained.

Problems:

- climate disruption,
- supply-chain fragility,
- energy politics,
- AI labour disruption,
- public distrust of mega-projects,
- ageing space infrastructure,
- launch regulation pressure.

The player joins or founds **Project Red Frontier**, a public/private survival-and-expansion program.

Core conflict:

> Is Mars an escape plan for the rich, a backup for civilisation, or the next shared project of humanity?

### Act 1 — Earth Prequel: The Long Launch

This is the new starting episode.

Gameplay style: 3D small-zone mission hub + resource/factory layer.

Player objectives:

- secure scrap, contracts, funding, and technical talent,
- build solar/wind/nuclear-adjacent energy backbone,
- assemble robotic factory systems,
- build reusable launch infrastructure,
- manufacture methane/oxygen propellant chain,
- test launch stages,
- build first cargo ship,
- launch robots and base kits to Mars.

Key story beat:

> The first launch is not a victory cutscene. It is a bet. The cargo may arrive months later, damaged, late, or incomplete depending on Earth choices.

### Act 2 — Robotic Mars: Before Humans

The player does not start Mars with people.

First phase is robotic:

- deploy landers,
- unfold solar arrays,
- scan ice,
- build first power grid,
- print landing pads,
- assemble storage tanks,
- test oxygen production,
- prepare habitats before first crew.

This creates a bridge between the Earth prequel and existing Mars colony gameplay.

### Act 3 — First Human Sols

This is where the current Mars colony game becomes the centre.

The first crew lands only if enough robotic infrastructure exists.

Early Mars arc:

- life support stability,
- water extraction,
- oxygen production,
- food autonomy,
- radiation shelter,
- first medical emergency,
- first dust storm,
- morale crisis,
- first return-propellant milestone.

### Act 4 — The Colony Becomes a Society

The player shifts from “base manager” to “civilisation designer”.

New systems:

- Martian culture,
- governance,
- education,
- birth policy,
- Earth citizenship vs Mars identity,
- AI rights and limits,
- labour split: humans vs robots vs AI planning.

Core question:

> At what point does a colony stop being a mission and become a people?

### Act 5 — Earth-Mars Economy

Mars is no longer isolated.

Systems:

- launch windows,
- cargo manifests,
- passenger missions,
- orbital depots,
- reusable ships,
- export of science, patents, rare materials, software, culture,
- import of specialists, medicine, luxury goods, political influence.

Mission direction:

- rescue a delayed transfer ship,
- recover an orbital tanker,
- negotiate Earth embargo,
- decide whether Mars shares ISRU breakthroughs openly.

### Act 6 — Moon, Asteroids, Outer Planets

The game expands into campaign episodes.

Moon:

- water ice extraction,
- regolith sintering,
- low-gravity construction,
- orbital shipyards.

Asteroids:

- autonomous mining,
- claim disputes,
- robot-only colonies,
- economy expansion.

Outer planets:

- Europa science outpost,
- Titan hydrocarbon industry,
- radiation and distance as hard constraints.

### Act 7 — Warp and the Post-Human Question

Warp should not appear as a simple final tech purchase.

It should be unlocked through:

- long-term science chain,
- AI-assisted physics,
- exotic-material economy,
- deep-space anomaly missions,
- ethical decision about whether AI can run experiments beyond human comprehension.

Final question:

> If humanity reaches the stars through AI, is the future still human, or something wider?

---

## 6. Core Gameplay Loops

### 6.1 Local loop

1. Explore local zone.
2. Find constraint.
3. Build or repair infrastructure.
4. Stabilise resource flow.
5. Unlock mission choice.
6. Trigger consequence/event.

### 6.2 Strategic loop

1. Select destination or campaign theatre.
2. Prepare logistics.
3. Assign crew/robots/AI autonomy.
4. Execute mission.
5. Resolve success, partial success, or failure.
6. Update tech, resources, morale, politics, and story state.

### 6.3 Civilisation loop

1. Build capability.
2. Automate capability.
3. Export capability to another world.
4. Turn capability into culture/politics.
5. Face unintended consequences.

---

## 7. Resource Model Expansion

Current Mars resources should stay. Add campaign-level resources gradually.

### Earth resources

- Funding
- Steel/alloys
- Electronics
- Methane
- Liquid oxygen
- Composite materials
- Public trust
- Launch permits
- Talent
- AI compute
- Supply-chain stability

### Mars resources

- Oxygen
- Water
- Food
- Materials
- Power
- Science
- Credits
- Population
- Morale
- Regolith
- Methane / propellant
- Spare parts
- Radiation shielding
- Biosphere stability

### Political/social resources

- Earth trust
- Mars autonomy
- AI trust
- Crew cohesion
- Faction influence
- Ethical debt

### Late-game resources

- Exotic matter / spacetime data
- Interstellar navigation data
- AI cognition bandwidth
- Civilisation unity
- Cultural resilience

---

## 8. RPG Layer

The player needs a face, not just a cursor.

Player role options:

1. **Founder-Engineer** — stronger building/repair bonuses.
2. **Mission Director** — better crew/logistics/funding.
3. **AI Systems Architect** — better automation and ORION interactions.
4. **Scientist-Explorer** — better research and anomaly missions.

Recommended MVP: choose one fixed role first: **Mission Systems Architect**.

### Player progression

Stats:

- Engineering
- Leadership
- Science
- Diplomacy
- AI Synergy
- Survival

These should unlock dialogue options, mission shortcuts, and emergency solutions, not just passive percentages.

### Companion cast

- **ORION** — AI companion and operations system.
- **Mara Voss** — launch director, pragmatic, hates waste.
- **Dr. Elian Rowe** — life support / biosphere scientist.
- **Talia Ren** — robotics lead, loves autonomous machines too much.
- **Commander Sayeed Malik** — first Mars crew commander, mission-first, human-first.
- **Nika Orlov** — political negotiator / Earth relations.
- **Jun Park** — young Mars-born engineer introduced later.

Companions should be tied to systems. When they disagree, the disagreement affects gameplay.

---

## 9. Factions

### Earth Coalition

Public legitimacy, rules, permits, international pressure.

### Asterion Launch Systems

Rocket company, operational speed, manufacturing, risk tolerance.

### The Open Science Bloc

Wants tech shared freely.

### Security Directorate

Wants AI limits, crew safety, control over launch capability.

### Martian Assembly

Emerges later; wants autonomy.

### ORION / Machine Network

Not evil by default. It wants survival, continuity, and optimisation. It may disagree with human emotional choices.

---

## 10. Mission Catalogue

### Earth Episode Missions

#### M01 — The Yard

Walk through the abandoned test yard. Restore power. Find old engines, tanks, controllers, and damaged robots.

Gameplay:

- 3D walking zone.
- Scan salvage.
- Repair basic power.
- First ORION interaction.

Unlock:

- Workshop.
- Resource inventory.

#### M02 — First Power

Build solar and storage for the launch site.

Gameplay:

- Place panels.
- Connect battery.
- Survive night brownout.

Theme:

- Every civilisation begins with power.

#### M03 — The Methalox Problem

Build methane/oxygen production chain.

Gameplay:

- Acquire water/carbon source.
- Build electrolysis / Sabatier-inspired production.
- Store cryogenic propellant.

Decision:

- Safe low-volume production or risky high-rate production.

#### M04 — The Robot Foundry

Build the first construction robots.

Gameplay:

- Assemble robot frames.
- Train ORION to coordinate them.
- Choose autonomy limit.

Consequence:

- More autonomy = faster builds but more public/political concern.

#### M05 — Hopper Test

First reusable test flight.

Gameplay:

- Prepare pad.
- Load propellant.
- Weather check.
- Launch sequence minigame or automated event.

Outcomes:

- Success: funding boost.
- Partial success: repairs, but engineering data.
- Failure: public trust hit, but unlock investigation.

#### M06 — Cargo Manifest

Choose what goes to Mars first.

Options:

- more solar,
- more robots,
- more habitat modules,
- more science payload,
- more spare parts,
- more communication infrastructure.

This choice should shape Mars starting conditions.

#### M07 — Launch Window

Final Earth prequel mission.

Gameplay:

- Fuel ships.
- Handle last-minute supplier issue.
- Decide whether to delay or launch with degraded redundancy.

Transition:

- Cargo leaves Earth.
- Time jump to robotic Mars arrival.

---

### Mars Robotic Missions

#### M08 — Seven Minutes of Silence

Cargo lands. Player watches telemetry dropouts and must choose automated landing priorities.

Priorities:

- safe landing,
- proximity to ice,
- flat terrain,
- comms visibility,
- science value.

#### M09 — First Light

Robots unfold solar arrays and establish power.

Failure mode:

- dust on panels,
- damaged cable,
- battery under-capacity.

#### M10 — Water Below

Deploy ground radar / drill to locate accessible ice.

Unlock:

- Ice Extractor.

#### M11 — Breath Factory

Scale oxygen production from experimental to colony-useful.

Tie-in:

- Current Oxygenator building becomes a story milestone, not just a button.

#### M12 — Print the Pad

Robots sinter/print a landing pad to stop future landers from blasting dust into the base.

Unlock:

- Safer recurring cargo landings.

---

### First Human Mars Missions

#### M13 — First Sol

First humans arrive. Existing Mars colony loop begins.

Objective:

- keep oxygen, water, food, power, and morale positive for 10 sols.

#### M14 — The Storm That Teaches

Dust storm cuts solar output and Earth comms.

Choices:

- ration power,
- let ORION take control,
- risk EVA repair,
- shut down science.

#### M15 — Return Ticket

Produce enough propellant reserve for a return/ascent vehicle.

Core idea:

- Mars is only truly viable when it can send people home.

#### M16 — The First Argument

Crew splits over automation, risk, and who controls the mission: Earth, local commander, player, or ORION.

#### M17 — Green Under Glass

First stable biosphere dome. Morale boost, but fragile.

#### M18 — The First Martian

Later milestone: first child born on Mars or first generation raised there.

Ethical weight:

- Mars becomes a home, not an outpost.

---

### Moon Campaign Missions

#### L01 — Shackleton Claim

Scout lunar south-pole ice.

#### L02 — Regolith Oven

Extract oxygen from regolith / build sintered structures.

#### L03 — Shipyard Shadow

Build orbital assembly capability.

Purpose:

- Moon becomes industrial stepping stone, not just a side map.

---

### Deep Space Missions

#### D01 — Phobos Dock

Create a low-gravity logistics hub.

#### D02 — Ceres Contract

Autonomous mining colony with delayed comms and robot governance.

#### D03 — Titan Black Rain

Hydrocarbon economy, cryogenic survival, extreme delay from Earth.

#### D04 — Europa Quiet Zone

Science vs contamination ethics.

---

### Warp Arc Missions

#### W01 — The Impossible Signal

A deep-space probe returns data that should not be possible.

#### W02 — ORION's Hypothesis

AI proposes physics beyond human intuition.

#### W03 — The Consent Problem

Can an AI run an experiment that humans cannot fully understand but can audit?

#### W04 — First Fold

A tiny unmanned warp test.

#### W05 — The Door Opens

Endgame: not conquest, but first interstellar mission.

---

## 11. Iteration Plan

### Iteration 0 — Design foundation

Goal: define the expansion without coding.

Deliverables:

- This design document.
- Mission list.
- Resource list.
- Act structure.
- First implementation backlog.

Acceptance criteria:

- Clear direction for future agents.
- No code touched.
- Existing Mars game remains the anchor.

---

### Iteration 1 — Mars narrative wrapper

Goal: make the current game feel like a campaign instead of a toy sandbox.

Scope:

- intro sequence,
- player/ORION framing,
- mission log panel,
- milestone events,
- named objectives,
- end-of-act modal when spaceport/interplanetary/terraforming milestones are hit.

Implementation notes:

- Keep it inside `mars-colony/index.html` for now.
- Add a lightweight mission state object.
- Do not refactor the whole game yet.

Acceptance criteria:

- Player understands why they are on Mars.
- First 15 minutes have directed objectives.
- Existing free-building gameplay still works.

---

### Iteration 2 — Earth prequel vertical slice

Goal: create the first playable Earth episode.

Scope:

- new folder: `red-frontier-earth/` or `mars-colony-prequel/`,
- 3D launch-yard scene,
- walking camera or simple third-person controller,
- salvage/repair interactions,
- build solar + battery + workshop,
- ORION introduction,
- first launch-site objective chain.

Acceptance criteria:

- Player can walk around Earth launch site.
- Player can gather/repair/build first infrastructure.
- Completing the slice unlocks “Prepare Mars Cargo”.

---

### Iteration 3 — Robots and printed structures

Goal: make “robots build the future” a real mechanic.

Scope:

- robot units,
- robot task queue,
- printed habitat / landing pad / storage foundation,
- autonomy setting,
- ORION efficiency vs safety trade-off.

Acceptance criteria:

- Robots can visibly build or repair structures.
- Autonomy setting changes speed/risk.
- Printed structures become cheaper but slower than imported structures.

---

### Iteration 4 — Earth-to-Mars cargo continuity

Goal: Earth choices affect Mars start.

Scope:

- cargo manifest selection,
- simple save transfer from Earth episode to Mars game,
- Mars starting bonuses/penalties based on manifest,
- landing outcome event.

Acceptance criteria:

- Different Earth mission outcomes produce different Mars starts.
- Player can replay Earth prequel to optimise Mars setup.

---

### Iteration 5 — RPG companions and factions

Goal: add story decisions with mechanical consequences.

Scope:

- companion cards,
- dialogue event system,
- faction resources,
- hard choices during crises.

Acceptance criteria:

- At least 3 companions have distinct viewpoints.
- At least 3 story choices alter resource/faction state.
- ORION trust becomes meaningful.

---

### Iteration 6 — Moon proving ground

Goal: add the second world without exploding scope.

Scope:

- small Moon map,
- ice/regolith resources,
- sintered structures,
- orbital shipyard unlock.

Acceptance criteria:

- Moon has a different constraint profile than Mars.
- Moon unlocks better Mars logistics.

---

### Iteration 7 — Mission framework

Goal: avoid hardcoding every future story beat.

Scope:

- generic mission schema,
- objective types,
- rewards/consequences,
- mission log UI,
- branching outcomes.

Acceptance criteria:

- New missions can be added as data.
- Same framework supports Earth, Moon, Mars, and deep space.

---

### Iteration 8 — Multi-planet campaign map

Goal: make the game feel like a solar-system RPG/strategy hybrid.

Scope:

- solar system map,
- selectable destinations,
- travel windows,
- ship/cargo assignment,
- mission availability per location.

Acceptance criteria:

- Player can choose between at least Earth, Moon, Mars.
- Travel and logistics are visible and meaningful.

---

### Iteration 9 — Warp late game

Goal: deliver the promised “humanity evolves beyond the solar system” arc.

Scope:

- anomaly science chain,
- AI-assisted research,
- moral/audit decision system,
- first unmanned warp test,
- final interstellar launch.

Acceptance criteria:

- Warp is narrative climax, not just a tech button.
- Player choices about AI and society affect the ending.

---

## 12. First Backlog Proposal

### Epic A — Campaign framing for current Mars game

- Add intro modal: “Project Red Frontier”.
- Add ORION assistant voice/text panel.
- Add mission log state.
- Add first 5 guided objectives.
- Add milestone story events for first habitat, first oxygen surplus, first greenhouse, first lab, first spaceport.

### Epic B — Earth prequel prototype

- Create Earth launch yard scene.
- Add simple movement/camera.
- Add interactable salvage objects.
- Add power restoration objective.
- Add first robot assembly objective.
- Add cargo manifest screen.

### Epic C — Robot construction layer

- Add robot task queue.
- Add construction time.
- Add printed structures.
- Add autonomy risk setting.

### Epic D — Resource and logistics continuity

- Define campaign save format.
- Transfer Earth manifest to Mars initial state.
- Add cargo landings and launch windows.

### Epic E — Story event framework

- Define event schema.
- Add event trigger conditions.
- Add choices with mechanical consequences.
- Add companion/faction reactions.

---

## 13. Design Risks

### Risk: Too big too fast

Mitigation: keep each world as a separate playable slice. The current Mars game remains the anchor.

### Risk: Story fights sandbox freedom

Mitigation: use mission objectives as guidance, not hard rails. Let players continue sandbox building between story beats.

### Risk: SpaceX inspiration becomes IP/trademark problem

Mitigation: fictionalise names, companies, rockets, robots, locations, and logos.

### Risk: “AI companion” becomes generic chatbot flavour

Mitigation: tie ORION to real systems: automation speed, risk, diagnostics, crisis management, memory, and faction trust.

### Risk: Hard science blocks fun

Mitigation: use real concepts as constraints and mission flavour, not as simulation prison.

---

## 14. Research Inspirations Reviewed

Useful real-world anchors:

- NASA MOXIE: oxygen from Martian CO2 for breathing and fuel/oxidizer preparation.
- NASA Moon to Mars Architecture: Moon as stepping stone for long-term Mars exploration.
- SpaceX Starship / Mars mission direction: reusable launch architecture, high-cadence launch ambition, in-space refuelling challenge, uncrewed precursors, robot cargo concepts.
- ISRU concepts: use local water, CO2, regolith, solar/fission power, printed structures, and robotic construction.
- Open-world mission design research: missions need variation across exploration, problem solving, narrative, emotion, uniqueness, and action pacing.
- Sandbox storytelling: central campaign plus optional side missions fits a resource strategy/RPG hybrid.

---

## 15. Immediate Recommendation

Do **not** start by building the whole universe.

Start with this sequence:

1. Add narrative mission wrapper to current Mars game.
2. Build a tiny Earth prequel vertical slice.
3. Connect Earth choices to Mars starting resources.
4. Add robot construction and printed structures.
5. Add factions/companions only after the core loop is fun.

The first playable promise should be:

> “I walked around a near-future launch yard, rebuilt the first automated rocket factory with ORION, launched cargo to Mars, then saw those choices affect my first Martian base.”

That is the hook.
