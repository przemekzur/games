// Story chapters following Voyager's journey home
export const CHAPTERS = [
  {
    id: 0,
    title: 'The Caretaker',
    subtitle: 'Stranded 70,000 light years from home',
    triggerSystem: 0,
    intro: [
      'Stardate 48315.6',
      'The USS Voyager, an Intrepid-class starship, has been pulled across the galaxy by a being known as the Caretaker.',
      'Now stranded in the Delta Quadrant, 70,000 light years from Federation space, Captain Kathryn Janeway faces an impossible journey.',
      '"We\'re alone, in an uncharted part of the galaxy. We\'ve already made some friends here, and some enemies. We have no idea of the dangers we\'re going to face. But one thing is clear — both crews are going to have to work together if we\'re to survive. That\'s an order."',
    ],
    dialogSequence: [
      {
        speaker: 'Captain Janeway',
        portrait: '👩‍✈️',
        text: 'We have a long journey ahead. I need options, people.',
        choices: [
          { text: 'Set course for the Alpha Quadrant. Maximum warp.', effect: { morale: 5 }, next: 1 },
          { text: 'We should gather resources before we move on.', effect: { dilithium: 10 }, next: 1 },
        ],
      },
      {
        speaker: 'Commander Chakotay',
        portrait: '👨‍✈️',
        text: 'Captain, our Maquis crew and Starfleet officers will need time to work together. But I believe we can make this work.',
        choices: [
          { text: 'Agreed. We\'re one crew now.', effect: { morale: 10 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch0-explore', text: 'Explore 3 systems in the Ocampa Sector', check: (s) => s.systemsVisited >= 3 },
      { id: 'ch0-survive', text: 'Survive your first combat encounter', check: (s) => s.enemiesDefeated >= 1 },
    ],
  },
  {
    id: 1,
    title: 'Kazon Gauntlet',
    subtitle: 'Running the blockade',
    triggerSystem: 4,
    intro: [
      'The Kazon control vast territories ahead. Multiple sects vie for power, and Voyager represents a prize they all want.',
      'Seska, a Cardassian spy among the former Maquis, has defected to the Kazon-Nistrim. She knows Voyager\'s weaknesses.',
    ],
    dialogSequence: [
      {
        speaker: 'Tuvok',
        portrait: '🧝',
        text: 'Captain, long-range sensors detect multiple Kazon patrols ahead. I recommend we proceed with caution.',
        choices: [
          { text: 'Go through them. We\'re Starfleet.', effect: { morale: 5 }, next: 1 },
          { text: 'Find a way around. Stealth is wise.', effect: { energy: 50 }, next: 1 },
        ],
      },
      {
        speaker: 'B\'Elanna Torres',
        portrait: '👩‍🔧',
        text: 'I can boost our shield harmonics, but it\'ll cost deuterium. Your call, Captain.',
        choices: [
          { text: 'Do it. Shields are priority.', effect: { shields: 20, deuterium: -10 }, next: -1 },
          { text: 'Save the deuterium. We\'ll manage.', effect: { deuterium: 10 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch1-kazon', text: 'Defeat 3 Kazon vessels', check: (s) => s.enemiesDefeated >= 4 },
      { id: 'ch1-reach', text: 'Reach the Sikaris system', check: (s) => s.visitedSystems.has(8) },
    ],
  },
  {
    id: 2,
    title: 'The Nekrit Expanse',
    subtitle: 'Into unknown space',
    triggerSystem: 10,
    intro: [
      'Beyond known space lies the Nekrit Expanse — a vast, uncharted region. Not even Neelix knows what lies beyond.',
      'Strange signals emanate from deep within. The crew must rely on each other more than ever.',
    ],
    dialogSequence: [
      {
        speaker: 'Neelix',
        portrait: '👨‍🍳',
        text: 'I must confess, Captain... my knowledge of this region is... limited. But I\'ll do my best as your guide!',
        choices: [
          { text: 'We appreciate your honesty, Neelix.', effect: { morale: 5 }, next: 1 },
          { text: 'Then we rely on sensors. Seven, take over.', effect: { bioNeural: 3 }, next: 1 },
        ],
      },
      {
        speaker: 'Seven of Nine',
        portrait: '🤖',
        text: 'I have assimilated knowledge of species in this region. The Borg have catalogued 312 species here. Many are hostile.',
        choices: [
          { text: 'Your knowledge gives us an edge. Thank you.', effect: { morale: 3 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch2-explore', text: 'Chart 5 systems in the Nekrit Expanse', check: (s) => {
        const nekritSystems = [10, 11, 12, 13, 14, 15, 16, 17];
        return nekritSystems.filter(id => s.visitedSystems.has(id)).length >= 5;
      }},
      { id: 'ch2-resources', text: 'Accumulate 50 dilithium', check: (s) => s.dilithium >= 50 },
    ],
  },
  {
    id: 3,
    title: 'Scorpion',
    subtitle: 'The Borg and Species 8472',
    triggerSystem: 18,
    intro: [
      'Borg space. The most dangerous region Voyager has faced. Cubes patrol every system.',
      'But something is destroying the Borg — Species 8472 from fluidic space. Even the Collective fears them.',
      'Captain Janeway proposes an alliance with the Borg. It\'s a devil\'s bargain.',
    ],
    dialogSequence: [
      {
        speaker: 'Captain Janeway',
        portrait: '👩‍✈️',
        text: '"In the words of Jean-Luc Picard: \'In their collective state, the Borg are utterly without mercy.\' But I believe we can negotiate safe passage.',
        choices: [
          { text: 'Propose an alliance against Species 8472.', effect: { bioNeural: 10 }, next: 1 },
          { text: 'Try to slip through undetected.', effect: { energy: -50 }, next: 1 },
        ],
      },
      {
        speaker: 'Commander Chakotay',
        portrait: '👨‍✈️',
        text: 'Captain, I understand your logic, but an alliance with the Borg? There must be another way.',
        choices: [
          { text: 'Sometimes there are no good options, Chakotay.', effect: { morale: -5 }, next: -1 },
          { text: 'You\'re right to question it. But we proceed.', effect: { morale: 3 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch3-borg', text: 'Survive 2 Borg encounters', check: (s) => s.enemiesDefeated >= 8 },
      { id: 'ch3-through', text: 'Navigate through Borg space', check: (s) => s.visitedSystems.has(22) },
    ],
  },
  {
    id: 4,
    title: 'Year of Hell',
    subtitle: 'Temporal warfare',
    triggerSystem: 22,
    intro: [
      'The Krenim Imperium possesses temporal weapons that can erase entire civilisations from history.',
      'Annorax, a Krenim scientist, commands a weapon ship that exists outside of time. Voyager is caught in his war.',
      'The ship is battered. Systems are failing. But the crew will not give up.',
    ],
    dialogSequence: [
      {
        speaker: 'Captain Janeway',
        portrait: '👩‍✈️',
        text: 'Voyager has taken heavy damage. We need to find allies and a way to stop the Krenim weapon ship.',
        choices: [
          { text: 'Rally the affected species against Annorax.', effect: { morale: 5, energy: 50 }, next: 1 },
          { text: 'Focus on survival. Repair what we can.', effect: { hull: 15 }, next: 1 },
        ],
      },
      {
        speaker: 'Tom Paris',
        portrait: '👨‍✈️',
        text: 'Captain, I have a theory. If we can cause a temporal incursion within Annorax\'s ship, the timeline will reset.',
        choices: [
          { text: 'It\'s risky, but it might be our only shot.', effect: { morale: 3 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch4-krenim', text: 'Defeat the Krenim temporal ship', check: (s) => s.enemiesDefeated >= 12 },
      { id: 'ch4-survive', text: 'Maintain hull above 30%', check: (s) => s.hull > 30 },
    ],
  },
  {
    id: 5,
    title: 'The Hunters',
    subtitle: 'Hirogen pursuit',
    triggerSystem: 26,
    intro: [
      'The Hirogen are relentless hunters who view other species as prey. They have captured Voyager\'s crew before.',
      'Their communication relay network spans thousands of light years. It could carry a message to the Alpha Quadrant.',
    ],
    dialogSequence: [
      {
        speaker: 'Tuvok',
        portrait: '🧝',
        text: 'The Hirogen relay network — if we can access it, we could transmit a data burst to Starfleet Command.',
        choices: [
          { text: 'Worth the risk. Let\'s try it.', effect: { morale: 10 }, next: 1 },
          { text: 'The Hirogen will detect us.', effect: { shields: 15 }, next: 1 },
        ],
      },
      {
        speaker: 'Harry Kim',
        portrait: '👨',
        text: 'I\'ve got a lock on the relay frequency! Transmitting... Captain, we\'re getting letters from home!',
        choices: [
          { text: 'Read them to the crew. They need this.', effect: { morale: 15 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch5-hirogen', text: 'Defeat 3 Hirogen hunters', check: (s) => s.enemiesDefeated >= 15 },
      { id: 'ch5-escape', text: 'Reach the Malon sector', check: (s) => s.visitedSystems.has(28) },
    ],
  },
  {
    id: 6,
    title: 'Endgame',
    subtitle: 'The final push home',
    triggerSystem: 33,
    intro: [
      'After years of travel, Voyager has found it — a Borg transwarp hub that connects to the Alpha Quadrant.',
      'Admiral Janeway from the future has given Voyager advanced technology. Transphasic torpedoes. Ablative armour.',
      'One final battle against the Borg Collective stands between Voyager and home.',
    ],
    dialogSequence: [
      {
        speaker: 'Captain Janeway',
        portrait: '👩‍✈️',
        text: '"Set a course... for home." This is it, people. Everything we\'ve been through has led to this moment.',
        choices: [
          { text: 'Engage the Borg. Full power to weapons!', effect: { energy: 100, torpedoes: 10 }, next: 1 },
        ],
      },
      {
        speaker: 'Seven of Nine',
        portrait: '🤖',
        text: 'Captain... thank you. For showing me what it means to be human.',
        choices: [
          { text: 'You showed us what it means to have hope. Let\'s go home.', effect: { morale: 20 }, next: -1 },
        ],
      },
    ],
    objectives: [
      { id: 'ch6-borg', text: 'Destroy the Borg Cube guarding the hub', check: (s) => s.enemiesDefeated >= 20 },
      { id: 'ch6-home', text: 'Reach the Alpha Quadrant', check: (s) => s.visitedSystems.has(34) },
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
