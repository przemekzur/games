// Sector map with 35 systems across Delta Quadrant regions
export const REGIONS = {
  OCAMPA: { name: 'Ocampa Sector', color: '#66aacc' },
  KAZON: { name: 'Kazon Territory', color: '#cc8844' },
  VIDIIAN: { name: 'Vidiian Sodality', color: '#aa4466' },
  BOTHAN: { name: 'Bothans Space', color: '#88aa66' },
  NEKRIT: { name: 'Nekrit Expanse', color: '#8866aa' },
  BORG: { name: 'Borg Space', color: '#44cc44' },
  KRENIM: { name: 'Krenim Imperium', color: '#ccaa44' },
  HIROGEN: { name: 'Hirogen Hunting Grounds', color: '#cc6644' },
  DEVORE: { name: 'Devore Imperium', color: '#aa66aa' },
  MALON: { name: 'Malon Cooperative', color: '#66aa88' },
  VOID: { name: 'The Void', color: '#445566' },
  ALPHA: { name: 'Alpha Quadrant Border', color: '#aaccff' },
};

export const SYSTEMS = [
  // Starting area — Ocampa Sector
  { id: 0, name: 'Ocampa', region: 'OCAMPA', x: 10, y: 50, connections: [1, 2],
    desc: 'Homeworld of the Ocampa. The Caretaker\'s array brought Voyager here.',
    hasStation: false, threat: 0.1, resources: { dilithium: 10 } },
  { id: 1, name: 'Talax Prime', region: 'OCAMPA', x: 15, y: 38, connections: [0, 3, 4],
    desc: 'Neelix\'s homeworld. A trade hub with diverse species.',
    hasStation: true, threat: 0.1, resources: { replicatorRations: 30 } },
  { id: 2, name: 'Banea', region: 'OCAMPA', x: 18, y: 62, connections: [0, 5],
    desc: 'An advanced world with memory-based justice.',
    hasStation: false, threat: 0.2, resources: { bioNeural: 5 } },

  // Kazon Territory
  { id: 3, name: 'Kazon-Ogla', region: 'KAZON', x: 22, y: 30, connections: [1, 6, 7],
    desc: 'Kazon-Ogla controlled space. Hostile patrols frequent.',
    hasStation: false, threat: 0.6, resources: { dilithium: 15 } },
  { id: 4, name: 'Kazon-Nistrim', region: 'KAZON', x: 25, y: 45, connections: [1, 5, 8],
    desc: 'Territory of the Kazon-Nistrim sect. Seska was last seen here.',
    hasStation: false, threat: 0.7, resources: { deuterium: 20 } },
  { id: 5, name: 'Sobras', region: 'KAZON', x: 28, y: 58, connections: [2, 4, 9],
    desc: 'A contested world between multiple Kazon sects.',
    hasStation: false, threat: 0.5, resources: { dilithium: 10 } },

  // Vidiian Space
  { id: 6, name: 'Vidiia', region: 'VIDIIAN', x: 30, y: 22, connections: [3, 10],
    desc: 'Heart of the Vidiian Sodality. The Phage is everywhere.',
    hasStation: true, threat: 0.6, resources: { bioNeural: 10 } },
  { id: 7, name: 'Avery System', region: 'VIDIIAN', x: 32, y: 35, connections: [3, 8, 11],
    desc: 'A system ravaged by the Vidiian Phage. Proceed with caution.',
    hasStation: false, threat: 0.5, resources: { deuterium: 15 } },

  // Transition to mid-journey
  { id: 8, name: 'Sikaris', region: 'BOTHAN', x: 35, y: 48, connections: [4, 7, 12, 13],
    desc: 'Home of the Sikarians and their spatial trajector technology.',
    hasStation: true, threat: 0.1, resources: { dilithium: 20, replicatorRations: 20 } },
  { id: 9, name: 'Drayan', region: 'BOTHAN', x: 36, y: 65, connections: [5, 13],
    desc: 'Homeworld of the Drayans. They reverse-age as they mature.',
    hasStation: false, threat: 0.2, resources: { bioNeural: 8 } },

  // Nekrit Expanse
  { id: 10, name: 'Nekrit Supply Depot', region: 'NEKRIT', x: 40, y: 20, connections: [6, 14, 15],
    desc: 'A remote supply station at the edge of the Nekrit Expanse.',
    hasStation: true, threat: 0.3, resources: { dilithium: 15, deuterium: 25 } },
  { id: 11, name: 'Nasari', region: 'NEKRIT', x: 42, y: 33, connections: [7, 14, 16],
    desc: 'Nasari homeworld. Territorial but open to negotiation.',
    hasStation: false, threat: 0.4, resources: { dilithium: 10 } },
  { id: 12, name: 'Swarm Territory', region: 'NEKRIT', x: 44, y: 47, connections: [8, 16, 17],
    desc: 'Vast region controlled by an unnamed swarm species.',
    hasStation: false, threat: 0.8, resources: { deuterium: 30 } },
  { id: 13, name: 'Nechani', region: 'NEKRIT', x: 43, y: 60, connections: [8, 9, 17],
    desc: 'Home of the Nechani. Sacred rituals protect powerful energy.',
    hasStation: false, threat: 0.2, resources: { bioNeural: 12 } },

  // Mid-journey — approaching Borg space
  { id: 14, name: 'Sakari', region: 'NEKRIT', x: 50, y: 25, connections: [10, 11, 18],
    desc: 'A hidden colony that survived by going underground.',
    hasStation: false, threat: 0.2, resources: { dilithium: 25 } },
  { id: 15, name: 'Nyria', region: 'NEKRIT', x: 48, y: 15, connections: [10, 18],
    desc: 'The Nyrians relocate species to habitats. Not always willingly.',
    hasStation: false, threat: 0.5, resources: { replicatorRations: 40 } },
  { id: 16, name: 'Voth Outpost', region: 'NEKRIT', x: 52, y: 40, connections: [11, 12, 19],
    desc: 'An outpost of the ancient Voth civilization.',
    hasStation: true, threat: 0.3, resources: { bioNeural: 15 } },
  { id: 17, name: 'Taresia', region: 'NEKRIT', x: 53, y: 55, connections: [12, 13, 20],
    desc: 'Sirens of the Delta Quadrant. Their hospitality hides danger.',
    hasStation: false, threat: 0.5, resources: { replicatorRations: 25 } },

  // Borg Space
  { id: 18, name: 'Borg Perimeter', region: 'BORG', x: 58, y: 20, connections: [14, 15, 21, 22],
    desc: 'The outer boundary of Borg-controlled space. Cube patrols detected.',
    hasStation: false, threat: 0.9, resources: { bioNeural: 20 } },
  { id: 19, name: 'Species 8472 Nexus', region: 'BORG', x: 60, y: 38, connections: [16, 22, 23],
    desc: 'A rift to fluidic space. Species 8472 bioships emerge here.',
    hasStation: false, threat: 1.0, hasAnomaly: true, anomalyType: 'spatial-rift',
    resources: { dilithium: 30 } },
  { id: 20, name: 'Brunali', region: 'BORG', x: 58, y: 52, connections: [17, 23, 24],
    desc: 'Homeworld of the Brunali. Constantly threatened by the Borg.',
    hasStation: false, threat: 0.7, resources: { deuterium: 20 } },

  // Krenim Imperium
  { id: 21, name: 'Zahl', region: 'KRENIM', x: 65, y: 15, connections: [18, 25],
    desc: 'The Zahl homeworld. Allied with Voyager against the Krenim.',
    hasStation: true, threat: 0.4, resources: { dilithium: 15, deuterium: 15 } },
  { id: 22, name: 'Krenim Prime', region: 'KRENIM', x: 67, y: 30, connections: [18, 19, 25, 26],
    desc: 'Center of the Krenim Imperium. Temporal weapons abound.',
    hasStation: false, threat: 0.8, hasAnomaly: true, anomalyType: 'quantum-flux',
    resources: { bioNeural: 18 } },
  { id: 23, name: 'Nihydron', region: 'KRENIM', x: 66, y: 45, connections: [19, 20, 26, 27],
    desc: 'The Nihydron Confederacy. Pragmatic traders and warriors.',
    hasStation: true, threat: 0.4, resources: { dilithium: 20, replicatorRations: 30 } },
  { id: 24, name: 'Vaadwaur', region: 'KRENIM', x: 64, y: 60, connections: [20, 27],
    desc: 'Ruins of the Vaadwaur civilization. Subspace corridors exist.',
    hasStation: false, threat: 0.6, hasAnomaly: true, anomalyType: 'subspace-tear',
    resources: { deuterium: 30 } },

  // Hirogen Hunting Grounds
  { id: 25, name: 'Hirogen Relay', region: 'HIROGEN', x: 73, y: 22, connections: [21, 22, 28],
    desc: 'Part of the Hirogen communications relay network.',
    hasStation: false, threat: 0.7, resources: { dilithium: 15 } },
  { id: 26, name: 'Hirogen Arena', region: 'HIROGEN', x: 75, y: 38, connections: [22, 23, 28, 29],
    desc: 'The Hirogen hunt their prey in these killing grounds.',
    hasStation: false, threat: 0.8, resources: { deuterium: 25 } },
  { id: 27, name: 'Devore Checkpoint', region: 'DEVORE', x: 74, y: 52, connections: [23, 24, 29, 30],
    desc: 'Devore border inspection point. Telepaths are persecuted here.',
    hasStation: false, threat: 0.6, resources: { replicatorRations: 20 } },

  // Malon / Void
  { id: 28, name: 'Malon Prime', region: 'MALON', x: 80, y: 28, connections: [25, 26, 31],
    desc: 'The Malon dump antimatter waste throughout the region.',
    hasStation: true, threat: 0.3, hasAnomaly: true, anomalyType: 'graviton-surge',
    resources: { deuterium: 40 } },
  { id: 29, name: 'The Void', region: 'VOID', x: 82, y: 43, connections: [26, 27, 31, 32],
    desc: 'A starless expanse. Ships that enter rarely leave.',
    hasStation: false, threat: 0.5, resources: {} },
  { id: 30, name: 'Qomar', region: 'DEVORE', x: 80, y: 60, connections: [27, 32],
    desc: 'The Qomar worship mathematical harmonics as art.',
    hasStation: true, threat: 0.1, resources: { replicatorRations: 35, bioNeural: 10 } },

  // Final stretch toward Alpha Quadrant
  { id: 31, name: 'Turei Gateway', region: 'MALON', x: 87, y: 35, connections: [28, 29, 33],
    desc: 'The Turei guard access to subspace corridors.',
    hasStation: false, threat: 0.5, hasAnomaly: true, anomalyType: 'subspace-tear',
    resources: { dilithium: 20 } },
  { id: 32, name: 'Baxial Colony', region: 'VOID', x: 88, y: 52, connections: [29, 30, 33, 34],
    desc: 'A small independent colony. Safe harbor for weary travelers.',
    hasStation: true, threat: 0.1, resources: { replicatorRations: 40, deuterium: 20 } },
  { id: 33, name: 'Borg Transwarp Hub', region: 'BORG', x: 92, y: 40, connections: [31, 32, 34],
    desc: 'A Borg transwarp hub. The key to getting home — if you can survive.',
    hasStation: false, threat: 1.0, resources: { bioNeural: 25 } },
  { id: 34, name: 'Alpha Quadrant', region: 'ALPHA', x: 96, y: 48, connections: [32, 33],
    desc: 'Earth. Home. The Federation. The end of the journey.',
    hasStation: true, threat: 0.0, resources: {} },
];

export class SectorMap {
  constructor(gameState, onEvent) {
    this.gameState = gameState;
    this.onEvent = onEvent;
    this.systems = SYSTEMS;
  }

  getCurrentSystem() {
    return this.systems[this.gameState.getState().currentSystemId];
  }

  getConnectedSystems() {
    const current = this.getCurrentSystem();
    return current.connections.map(id => this.systems[id]);
  }

  canWarpTo(targetId) {
    const state = this.gameState.getState();
    const current = this.systems[state.currentSystemId];

    if (!current.connections.includes(targetId)) {
      return { ok: false, reason: 'No warp route to that system.' };
    }

    const warpCost = 20 - state.engineUpgrade * 3;
    if (state.energy < warpCost) {
      return { ok: false, reason: `Insufficient energy for warp. Need ${warpCost}.` };
    }

    if (state.deuterium < 5) {
      return { ok: false, reason: 'Deuterium reserves critically low!' };
    }

    return { ok: true, cost: { energy: warpCost, deuterium: 5 } };
  }

  warpTo(targetId) {
    const check = this.canWarpTo(targetId);
    if (!check.ok) return false;

    const target = this.systems[targetId];
    const state = this.gameState.getState();

    this.gameState.update({
      currentSystemId: targetId,
      energy: state.energy - check.cost.energy,
      deuterium: state.deuterium - check.cost.deuterium,
      systemsVisited: state.systemsVisited + 1,
      visitedSystems: new Set([...state.visitedSystems, targetId]),
    });

    // Calculate distance reduction
    const progress = (target.x / 100) * 70000;
    this.gameState.update({
      distanceFromHome: Math.max(0, 70000 - progress),
    });

    return true;
  }
}
