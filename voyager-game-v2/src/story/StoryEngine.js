// Story chapters following Voyager's journey home — v2
//
// New in v2:
//  • 10 chapters instead of 7, covering more of the series arc
//  • Branching dialog with persistent story flags (flagSeskaDefied, flagSevenAboard, …)
//  • dialogSequence may be a FUNCTION of game state — earlier choices change later scenes
//  • Choices may carry `when: (state) => bool` to appear conditionally

// Helper: read a story flag (flags are stored as numeric state keys, 0/undefined = unset)
const flag = (s, name) => (s[name] || 0) > 0;

export const CHAPTERS = [
  // ── Chapter 1 ──────────────────────────────────────────────────────────────
  {
    id: 0,
    title: 'The Caretaker',
    subtitle: 'Stranded 70,000 light years from home',
    triggerSystem: 0,
    intro: [
      'Stardate 48315.6',
      'A coherent tetryon beam tore the USS Voyager out of the Badlands and hurled her across the galaxy — a journey of seventy thousand light years in an instant.',
      'The being responsible, the Caretaker, is dead. His array — the only way home — has been destroyed to protect the Ocampa from the Kazon.',
      'Now two crews, Starfleet and Maquis, stand on one bridge. Ahead lies a seventy-five year voyage through space no Federation ship has ever charted.',
      '"We\'re alone, in an uncharted part of the galaxy. We\'ve already made some friends here, and some enemies. But one thing is clear — both crews are going to have to work together if we\'re to survive. That\'s an order."',
    ],
    dialogSequence: [
      {
        speaker: 'Captain Janeway',
        portrait: '👩‍✈️',
        text: 'I destroyed our only way home to save a people we\'d never met. Some of you agree with that decision. Some of you don\'t. Either way — we move forward. I need options, people.',
        choices: [
          { text: 'Set course for the Alpha Quadrant. Maximum warp.', effect: { morale: 5, flagBoldCaptain: 1 }, next: 1 },
          { text: 'Survey nearby systems first. We\'ll need resources.', effect: { dilithium: 12, flagCautiousCaptain: 1 }, next: 1 },
        ],
      },
      {
        speaker: 'Commander Chakotay',
        portrait: '👨‍✈️',
        text: 'My people aren\'t Starfleet, Captain. Some of them think we should take Voyager and settle the first habitable world we find. I can hold them together — but they need to know this is their ship too.',
        choices: [
          { text: 'Make B\'Elanna Torres my chief engineer. That\'s a statement.', effect: { morale: 10, flagMaquisTrust: 1 }, next: 2 },
          { text: 'They\'ll earn positions like everyone else — on merit.', effect: { morale: -3, energy: 25 }, next: 2 },
        ],
      },
      {
        speaker: 'Neelix',
        portrait: '👨‍🍳',
        text: 'Ahem! Pardon the intrusion — Neelix, Talaxian, at your service! Guide, chef, ambassador, morale officer! You\'ll find no one who knows this sector better. Well. Parts of it. Some parts.',
        choices: [
          { text: 'Welcome aboard, Mr. Neelix. We could use a guide.', effect: { morale: 5, replicatorRations: 20 }, next: -1 },
          { text: 'You can stay. But stay out of my ready room.', effect: { deuterium: 8 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch0-explore', text: 'Explore 3 systems in the Ocampa Sector', check: (s) => s.systemsVisited >= 3 },
      { id: 'ch0-survive', text: 'Survive your first combat encounter', check: (s) => s.enemiesDefeated >= 1 },
    ],
  },

  // ── Chapter 2 ──────────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'Kazon Gauntlet',
    subtitle: 'Running the blockade',
    triggerSystem: 4,
    intro: [
      'The Kazon Collective — eighteen sects, one hunger. To a people who measure worth in water and weapons, a Federation starship is the greatest prize in the quadrant.',
      'And they have help. Seska — Cardassian spy, former Maquis, former friend — has defected to the Kazon-Nistrim and taken Voyager\'s secrets with her.',
      'She knows every shield frequency. Every weak point. Every name on the crew manifest.',
    ],
    dialogSequence: (s) => [
      {
        speaker: 'Tuvok',
        portrait: '🧝',
        text: 'Captain, long-range sensors detect multiple Kazon patrols converging on our projected course. The probability that Seska has predicted our route is approximately 87 percent.',
        choices: [
          { text: 'Then we go straight through. Punch a hole in their line.', effect: { morale: 5, flagKazonWar: 1 }, next: 1 },
          { text: 'Plot a course through the Sobras debris fields. Quietly.', effect: { energy: 40, flagKazonStealth: 1 }, next: 1 },
        ],
      },
      {
        speaker: 'B\'Elanna Torres',
        portrait: '👩‍🔧',
        text: flag(s, 'flagMaquisTrust')
          ? 'Chief Engineer Torres reporting, Captain. I\'ve re-modulated the shields — Seska\'s old access codes are dead. She wants a fight? She\'ll get one she doesn\'t recognize.'
          : 'Torres here. I rebuilt the shield grid from scratch — every code Seska knew is gone. Would\'ve been done two days ago if your Starfleet engineers trusted my work.',
        choices: [
          { text: 'Outstanding work. Reinforce forward shields.', effect: { shields: 20, deuterium: -8 }, next: 2 },
          { text: 'Save the deuterium. We\'ll trust your re-modulation.', effect: { deuterium: 10 }, next: 2 },
        ],
      },
      {
        speaker: 'Seska (hailing frequency)',
        portrait: '🦎',
        text: 'Hello, Captain. You\'re a long way from home. Hand over your transporter technology and Maje Culluh might let your crew live as guests instead of corpses. Old friends deserve one warning.',
        choices: [
          { text: '"You want my ship? Come and take it." Close channel.', effect: { morale: 8, flagSeskaDefied: 1 }, next: -1 },
          { text: 'Feed her false schematics through the comm stream.', effect: { flagSeskaDeceived: 1, bioNeural: 3 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch1-kazon', text: 'Defeat 3 Kazon vessels', check: (s) => s.enemiesDefeated >= 4 },
      { id: 'ch1-reach', text: 'Reach the Sikaris system', check: (s) => s.visitedSystems.has(8) },
    ],
  },

  // ── Chapter 3 ──────────────────────────────────────────────────────────────
  {
    id: 2,
    title: 'The Phage',
    subtitle: 'Faces of the enemy',
    triggerSystem: 6,
    intro: [
      'The Vidiians were once artists, scholars, explorers — a civilisation two thousand years old.',
      'Then came the Phage: a disease that consumes the body faster than it can heal. Their cure is monstrous in its simplicity. They harvest replacements. From the living.',
      'Their sodality\'s medical ships now stalk these lanes, scanners tuned to healthy organs. Voyager\'s crew reads as a warehouse of spare parts.',
    ],
    dialogSequence: [
      {
        speaker: 'The Doctor',
        portrait: '💉',
        text: 'I\'ve analysed their harvesting technology. Repulsive — and decades beyond Federation medicine. Captain, if we could obtain a sample of their dermal regeneration matrix, I could improve burn treatment efficiency by 300 percent.',
        choices: [
          { text: 'Arrange a trade. Medicine for medicine.', effect: { bioNeural: 10, flagVidiianTruce: 1 }, next: 1 },
          { text: 'We don\'t deal with organ harvesters. Battle stations.', effect: { torpedoes: 3, flagVidiianWar: 1 }, next: 1 },
        ],
      },
      {
        speaker: 'Vidiian Surgeon (viewscreen)',
        portrait: '🧟',
        text: 'Federation vessel. Do not judge what you have not endured. I was a sculptor once. I had a family. Now I survive on the lungs of a Talaxian and the face of a stranger. Give us your dead, at least — they no longer need what we lack.',
        choices: [
          { text: 'Offer our medical database instead. The Doctor may help.', effect: { morale: 5, flagDoctorRenowned: 1 }, next: -1 },
          { text: 'Nothing on this ship is for harvest. Leave or be fired upon.', effect: { morale: 3 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch2-vidiian', text: 'Survive Vidiian space (defeat 2 more vessels)', check: (s) => s.enemiesDefeated >= 6 },
      { id: 'ch2-reach', text: 'Reach the Nekrit Supply Depot', check: (s) => s.visitedSystems.has(10) },
    ],
  },

  // ── Chapter 4 ──────────────────────────────────────────────────────────────
  {
    id: 3,
    title: 'The Nekrit Expanse',
    subtitle: 'Beyond the map\'s edge',
    triggerSystem: 10,
    intro: [
      'At the supply depot, Neelix stares at the star charts and finally admits the truth: this is the edge of everything he knows.',
      'Beyond lies the Nekrit Expanse — a thousand light years of plasma storms, dead colonies, and signals that repeat in no known language.',
      'From here on, every star is a stranger.',
    ],
    dialogSequence: (s) => [
      {
        speaker: 'Neelix',
        portrait: '👨‍🍳',
        text: 'Captain, I... I have a confession. Past this depot, my maps are rumor and secondhand spacer\'s tales. I\'ve been afraid that the moment I stopped being your guide, I\'d stop belonging on this ship.',
        choices: [
          { text: 'You\'re not a map, Neelix. You\'re family. You stay.', effect: { morale: 10, flagNeelixFamily: 1 }, next: 1 },
          { text: 'Then learn something new. You\'re our ambassador now.', effect: { morale: 5, flagNeelixAmbassador: 1 }, next: 1 },
        ],
      },
      {
        speaker: 'Kes',
        portrait: '👱‍♀️',
        text: 'Something is out there, Captain. I can feel it when I meditate — like a thousand voices speaking at once, very far away. They\'re not angry. They\'re... waiting.',
        choices: [
          { text: 'Borg. Tuvok, begin tactical drills immediately.', effect: { torpedoes: 4, flagBorgPrepared: 1 }, next: 2 },
          { text: 'Help Kes focus her ability. Telepathy may be our best sensor.', effect: { flagKesAwakened: 1, morale: 3 }, next: 2 },
        ],
      },
      {
        speaker: 'Tom Paris',
        portrait: '🧑‍✈️',
        text: 'Plasma storm activity ahead is off the scale. I can fly us through it — saves three weeks — or we go around nice and slow like sensible people. For the record: I vote not sensible.',
        choices: [
          { text: 'Through the storm, Mr. Paris. Show me why I sprung you from prison.', effect: { hull: -8, energy: 60, flagParisAce: 1 }, next: -1 },
          { text: 'Around it. I won\'t spend hull plating to save time.', effect: { deuterium: -6, morale: 2 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch3-explore', text: 'Chart 4 systems in the Nekrit Expanse', check: (s) => {
        const nekrit = [10, 11, 12, 13, 14, 15, 16, 17];
        return nekrit.filter(id => s.visitedSystems.has(id)).length >= 4;
      }},
      { id: 'ch3-resources', text: 'Accumulate 50 dilithium', check: (s) => s.dilithium >= 50 },
    ],
  },

  // ── Chapter 5 ──────────────────────────────────────────────────────────────
  {
    id: 4,
    title: 'Scorpion',
    subtitle: 'The enemy of my enemy',
    triggerSystem: 18,
    intro: [
      'Borg space. Sensor logs show cube wreckage scattered across fifteen systems — something is killing the Borg.',
      'Species 8472, from a dimension of living space the Borg call fluidic space. Their bioships shear cubes apart like paper. Their cry echoes on every telepathic frequency: "The weak will perish."',
      'Janeway\'s plan is audacious to the point of madness: offer the Borg a weapon against 8472 in exchange for safe passage. A deal with the devil — and the devil is listening.',
    ],
    dialogSequence: (s) => [
      {
        speaker: 'Captain Janeway',
        portrait: '👩‍✈️',
        text: flag(s, 'flagBorgPrepared')
          ? 'Tuvok\'s drills are about to pay off. We\'ve modified nanoprobes into a weapon that can destroy 8472 at the cellular level. I intend to trade it to the Borg for passage. Thoughts, Commander?'
          : 'The Doctor has modified Borg nanoprobes into a weapon that can kill Species 8472. I intend to trade it to the Collective for safe passage. Thoughts, Commander?',
        choices: [
          { text: 'Propose the alliance. We negotiate from strength.', effect: { flagBorgAlliance: 1, bioNeural: 10 }, next: 1 },
          { text: 'No alliance. We run the gauntlet alone and quiet.', effect: { flagBorgDefiant: 1, energy: -40 }, next: 2 },
        ],
      },
      {
        speaker: 'Borg Collective',
        portrait: '🟩',
        text: 'WE ARE THE BORG. YOUR PROPOSAL IS... ACCEPTABLE. A DRONE WILL BE ASSIGNED TO COORDINATE. DESIGNATION: SEVEN OF NINE, TERTIARY ADJUNCT OF UNIMATRIX ZERO ONE.',
        choices: [
          { text: 'Agreed. But she works on MY bridge, under MY rules.', effect: { morale: 5, flagSevenAboard: 1 }, next: 3 },
        ],
      },
      {
        speaker: 'Commander Chakotay',
        portrait: '👨‍✈️',
        text: 'Then we\'re ghosts. I\'ve pulled every power signature we can spare — we run dark, cold, and fast. But Captain, if a cube so much as glances at us, we will not outfight it. ...And sensors show one drone adrift in our path. Female. Disconnected. Alive.',
        choices: [
          { text: 'Beam her to sickbay. Nobody dies alone out here.', effect: { energy: -30, flagSevenAboard: 1, morale: 3 }, next: 3 },
        ],
      },
      {
        speaker: 'Seven of Nine',
        portrait: '🤖',
        text: 'I am Seven of Nine. Your vessel is inefficient. Your crew is undisciplined. Your mission is improbable. ...The Collective\'s assessment. My own analysis will require further observation.',
        choices: [
          { text: 'Welcome to Voyager, Seven. You\'re an individual now.', effect: { morale: 5, flagSevenMentored: 1 }, next: -1 },
          { text: 'Observe all you like — but sabotage and you go out an airlock.', effect: { torpedoes: 2 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch4-borg', text: 'Survive 2 encounters in Borg space', check: (s) => s.enemiesDefeated >= 9 },
      { id: 'ch4-through', text: 'Navigate through to Krenim space', check: (s) => s.visitedSystems.has(22) },
    ],
  },

  // ── Chapter 6 ──────────────────────────────────────────────────────────────
  {
    id: 5,
    title: 'Year of Hell',
    subtitle: 'The ship that erases history',
    triggerSystem: 22,
    intro: [
      'The Krenim Imperium does not fight wars. It edits them.',
      'Annorax, a scientist who lost his family to his own temporal weapon, commands a ship that exists outside of time itself. With a single incursion he can erase a species from history — every colony, every child, every memory, gone as if it never was.',
      'Voyager has entered his equation. Decks are sealing off one by one. The hull groans like a wounded animal. This is the year everything breaks.',
    ],
    dialogSequence: (s) => [
      {
        speaker: 'Captain Janeway',
        portrait: '👩‍✈️',
        text: 'Deck five is open to space. Sickbay is running on holo-emitters and stubbornness. I\'ve been offered a choice by Annorax himself: surrender our astrometric data and be spared. Help him perfect his calculations.',
        choices: [
          { text: 'Never. We rally the Zahl and Nihydron against him.', effect: { morale: 5, flagKrenimCoalition: 1 }, next: 1 },
          { text: 'Stall him. Feed him data while we plan the killing blow.', effect: { flagKrenimDeception: 1, energy: 40 }, next: 1 },
        ],
      },
      {
        speaker: 'Annorax (temporal transmission)',
        portrait: '⏳',
        text: 'Captain. I have erased ten thousand civilisations and restored nine thousand of them in better configurations. Time is not a river — it is an ocean, and I am its cartographer. One day you will understand: I am the most moral man who has ever existed.',
        choices: [
          { text: '"You\'re a grieving man with a god\'s weapon. It won\'t bring them back."', effect: { morale: 5, flagAnnoraxPitied: 1 }, next: 2 },
          { text: 'Trace the transmission. Find that ship.', effect: { flagAnnoraxHunted: 1, bioNeural: 5 }, next: 2 },
        ],
      },
      {
        speaker: 'Tom Paris',
        portrait: '🧑‍✈️',
        text: flag(s, 'flagParisAce')
          ? 'Captain, remember the storm? This is the same play, bigger table. We ram the temporal core with Voyager herself — the incursion collapses and the timeline snaps back. Everything resets. Even us.'
          : 'Captain, I\'ve studied the weapon ship\'s field mechanics. If a vessel collides with the temporal core during an incursion, the whole timeline resets. It\'s a one-way trip — that we won\'t remember.',
        choices: [
          { text: 'Set collision course. Time\'s up, Annorax.', effect: { morale: 8, hull: 25, flagTimelineRestored: 1 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch5-krenim', text: 'Defeat the Krenim temporal ship', check: (s) => s.enemiesDefeated >= 12 },
      { id: 'ch5-survive', text: 'Maintain hull above 30%', check: (s) => s.hull > 30 },
    ],
  },

  // ── Chapter 7 ──────────────────────────────────────────────────────────────
  {
    id: 6,
    title: 'The Hunt',
    subtitle: 'Prey worthy of the kill',
    triggerSystem: 26,
    intro: [
      'They are nine feet tall. They wear the bones of what they kill. They have no homeworld, no fleet, no empire — only the hunt, and a relay network older than the Federation itself.',
      'The Hirogen have studied Voyager\'s battle logs the way a hunter studies a stag\'s tracks. To them, the ship that defied the Borg and erased Annorax is the finest trophy in the quadrant.',
      'But their relay network reaches all the way to the Alpha Quadrant. Inside the hunters\' own web lies a thread that leads home.',
    ],
    dialogSequence: (s) => [
      {
        speaker: 'Tuvok',
        portrait: '🧝',
        text: 'The Hirogen relay network — if we can hold a node for 47 seconds, we can transmit a databurst to Starfleet Command. Logs, crew letters, our position. The Hirogen will detect the intrusion immediately.',
        choices: [
          { text: 'Forty-seven seconds. We\'ll buy them with photon torpedoes.', effect: { morale: 10, flagMessageHome: 1 }, next: 1 },
          { text: 'Too risky. We slip past and keep our silence.', effect: { shields: 15, flagSilentRunning: 1 }, next: 2 },
        ],
      },
      {
        speaker: 'Harry Kim',
        portrait: '👨',
        text: 'Transmission away! And Captain — we\'re receiving! It\'s Starfleet! Letters from home, mission updates... they never stopped looking for us. They know we\'re alive!',
        choices: [
          { text: 'Read every letter to the crew. They\'ve earned this.', effect: { morale: 15 }, next: 3 },
        ],
      },
      {
        speaker: 'Seven of Nine',
        portrait: '🤖',
        text: 'A logical decision. Sentiment transmitted at the cost of tactical exposure would have been... inefficient. Although I note the crew\'s morale continues to decline without word from home.',
        choices: [
          { text: 'We\'ll find another way to reach Starfleet. I promise.', effect: { morale: 3 }, next: 3 },
        ],
      },
      {
        speaker: 'Alpha Hirogen (viewscreen)',
        portrait: '🦖',
        text: 'Little ship. You have made our relays bleed and our pack-brothers cautious. Good. Easy prey shames the hunter. When we take your bridge, your captain\'s spine will hang in my trophy hall with honour.',
        choices: [
          { text: '"Come try. This stag has antlers." End transmission.', effect: { morale: 5, flagHirogenRespect: 1 }, next: -1 },
          { text: 'Offer them holodeck technology — let them hunt without killing.', effect: { flagHirogenPeace: 1, energy: -30 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch6-hirogen', text: 'Defeat 3 Hirogen hunters', check: (s) => s.enemiesDefeated >= 15 },
      { id: 'ch6-escape', text: 'Reach the Malon sector', check: (s) => s.visitedSystems.has(28) },
    ],
  },

  // ── Chapter 8 ──────────────────────────────────────────────────────────────
  {
    id: 7,
    title: 'The Void',
    subtitle: 'Two thousand light years of nothing',
    triggerSystem: 29,
    intro: [
      'No stars. No systems. No light but Voyager\'s own running lights, swallowed by perfect black.',
      'The crew calls it the Void — a starless expanse that will take two years to cross. Inside it, ships that ran out of hope long ago drift like sharks, stripping every vessel that enters.',
      'The darkness outside is easy. The darkness inside the crew — the silence at meals, the empty holodeck, the way people stop looking out the windows — that is the real enemy here.',
    ],
    dialogSequence: (s) => [
      {
        speaker: 'Commander Chakotay',
        portrait: '👨‍✈️',
        text: 'Three fights in the mess hall this week. Crewman Telfer hasn\'t left his quarters in nine days. Captain — with respect — you can\'t fix this from your ready room. They need their captain visible.',
        choices: [
          { text: 'You\'re right. Dinner with a different crew section every night.', effect: { morale: 12, flagCrewBond: 1 }, next: 1 },
          { text: 'What they need is purpose. Double science sweeps — find something in this nothing.', effect: { bioNeural: 8, flagVoidScience: 1 }, next: 1 },
        ],
      },
      {
        speaker: 'The Doctor',
        portrait: '💉',
        text: 'Medical log: crew morale is the worst I\'ve recorded. I\'m prescribing the unconventional — Mr. Paris has built something in holodeck two he calls "Fair Haven," and I have prepared a full opera season. Attendance will be mandatory. Doctor\'s orders.',
        choices: [
          { text: 'Approved. All of it. Even the opera.', effect: { morale: 10, energy: -20 }, next: 2 },
          { text: 'Holodeck rations stay capped. We need the power.', effect: { energy: 30, morale: -5 }, next: 2 },
        ],
      },
      {
        speaker: 'Night Alien Emissary',
        portrait: '👤',
        text: 'We are of the dark. The ones you call raiders poison our space with their dumping — the Malon ship you saw releases theta radiation that burns us. Close the Void\'s entrance vortex behind you, and we will show you a passage that cuts your crossing in half.',
        choices: [
          { text: 'Deal. We collapse the vortex — and the Malon answer to us.', effect: { flagVoidGuardian: 1, morale: 8 }, next: -1 },
          { text: 'We can\'t close another species\' trade route. We\'ll cross the long way.', effect: { deuterium: 15, flagLongWay: 1 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch7-survive', text: 'Keep crew morale above 40', check: (s) => s.morale > 40 },
      { id: 'ch7-cross', text: 'Cross the Void to Baxial Colony', check: (s) => s.visitedSystems.has(32) },
    ],
  },

  // ── Chapter 9 ──────────────────────────────────────────────────────────────
  {
    id: 8,
    title: 'Unimatrix Zero',
    subtitle: 'The queen takes notice',
    triggerSystem: 33,
    intro: [
      'The transwarp hub hangs in space like a wound in the dark — six conduits converging on a structure the size of a moon. One of those conduits opens three light years from Earth.',
      'It is the most heavily defended Borg installation in the galaxy. And the Borg Queen herself has taken a personal interest in the little ship that keeps slipping through her fingers.',
      'She speaks now through every assimilated mouth in the quadrant: "Voyager. You have something that belongs to me."',
    ],
    dialogSequence: (s) => [
      {
        speaker: 'Borg Queen (transmission)',
        portrait: '👑',
        text: flag(s, 'flagSevenAboard')
          ? 'Seven of Nine. My drone. My favourite. Return her and I will open a conduit to your Sector 001 myself. Keep her, and I will add your biological distinctiveness to my own — one deck at a time.'
          : 'Captain Janeway. You crossed my space, burned my cubes, and refused my embrace. I offer one final bargain: your ship\'s future technology for passage. Refuse, and become an exhibit in my collection.',
        choices: [
          { text: '"Seven is family. Nobody on this ship is for trade."', effect: { morale: 10, flagQueenDefied: 1 }, next: 1, when: (st) => flag(st, 'flagSevenAboard') },
          { text: '"I\'ve beaten you with one ship and a stubborn crew. Watch me do it again."', effect: { morale: 8, flagQueenDefied: 1 }, next: 1 },
        ],
      },
      {
        speaker: 'Admiral Janeway (temporal rift)',
        portrait: '🎖️',
        text: 'Hello, Captain. I\'m you — twenty-six years from now, from a future where this shortcut cost us Seven, Chakotay, and twenty-two more. I broke every temporal law to bring you these: transphasic torpedoes and ablative hull armour. Use them. Get them home sooner.',
        choices: [
          { text: 'Install the armour. Load the torpedoes. We end this.', effect: { torpedoes: 10, hull: 30, shields: 30, flagFutureTech: 1 }, next: 2 },
        ],
      },
      {
        speaker: 'Seven of Nine',
        portrait: '🤖',
        text: flag(s, 'flagSevenMentored')
          ? 'Captain. When you brought me aboard, I calculated a 93 percent probability I would be a liability. I have... never been so satisfied to be wrong. Whatever happens in that hub — thank you for insisting I was an individual.'
          : 'Captain. The hub\'s interior shielding has a 3.2-second regeneration gap. I am transmitting firing solutions now. It has been... an honour to serve on this vessel.',
        choices: [
          { text: '"You showed us what it means to fight for who you are. Stations."', effect: { morale: 15 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch8-cube', text: 'Destroy the Borg guardian of the hub', check: (s) => s.enemiesDefeated >= 20 },
      { id: 'ch8-hold', text: 'Keep hull above 25% for the final run', check: (s) => s.hull > 25 },
    ],
  },

  // ── Chapter 10 ─────────────────────────────────────────────────────────────
  {
    id: 9,
    title: 'Endgame',
    subtitle: 'Set a course for home',
    triggerSystem: 34,
    intro: [
      'The conduit collapses behind Voyager in a bloom of green fire — and through the forward viewport, for the first time in seven years, the stars are the right stars.',
      'Sol. Sector 001. A fleet of Federation starships breaking formation not to intercept, but to escort.',
      '"Voyager, this is Starfleet Command. Welcome home."',
    ],
    dialogSequence: (s) => [
      {
        speaker: 'Captain Janeway',
        portrait: '👩‍✈️',
        text: 'All stop. ...Just for a moment, everyone — look. That\'s Earth. Seventy thousand light years, decades ahead of every projection, and we did it together. Starfleet and Maquis. Human and hologram. Drone and Talaxian. One crew.',
        choices: [
          { text: '"Set a course... for home." Take her in, Tom.', effect: { morale: 25 }, next: 1 },
        ],
      },
      {
        speaker: 'Tom Paris',
        portrait: '🧑‍✈️',
        text: 'Aye, Captain. One quarter impulse... you know, I spent this whole trip planning what I\'d say right now. Something clever. Something for the history books. All I\'ve got is — it was a privilege flying her.',
        choices: [
          { text: 'It was a privilege commanding her. Engage.', effect: { morale: 10 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch9-home', text: 'Welcome home, Voyager.', check: () => true },
    ],
  },
];

export class StoryEngine {
  constructor(gameState, onEvent) {
    this.gameState = gameState;
    this.onEvent = onEvent;
    this.currentChapter = 0;
    this.chapterTriggered = new Set();
    this.dialogCallback = null;
  }

  checkChapterTrigger(systemId) {
    for (const chapter of CHAPTERS) {
      if (chapter.triggerSystem === systemId && !this.chapterTriggered.has(chapter.id)) {
        this.chapterTriggered.add(chapter.id);
        return chapter;
      }
    }
    return null;
  }

  // Resolve a chapter's dialog sequence against current game state.
  // Sequences may be plain arrays or functions of state (branching on story flags).
  resolveDialog(chapter) {
    if (!chapter || !chapter.dialogSequence) return null;
    const state = this.gameState.getState();
    return typeof chapter.dialogSequence === 'function'
      ? chapter.dialogSequence(state)
      : chapter.dialogSequence;
  }

  getCurrentChapter() {
    return CHAPTERS[this.currentChapter] || null;
  }

  checkObjectives() {
    const chapter = this.getCurrentChapter();
    if (!chapter) return { allComplete: false, objectives: [] };

    const state = this.gameState.getState();
    const results = chapter.objectives.map(obj => ({
      ...obj,
      complete: obj.check(state),
    }));

    const allComplete = results.every(r => r.complete);
    if (allComplete && this.currentChapter < CHAPTERS.length - 1) {
      this.currentChapter++;
      this.onEvent(`📖 Chapter complete! New chapter: ${CHAPTERS[this.currentChapter].title}`, 'story');
    }

    return { allComplete, objectives: results };
  }

  onDialogChoice(callback) {
    this.dialogCallback = callback;
  }
}
