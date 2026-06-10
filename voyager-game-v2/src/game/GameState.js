// Game state management with observer pattern
export class GameState {
  constructor() {
    this.observers = [];
    this.state = {
      // Ship stats
      hull: 100, maxHull: 100,
      shields: 100, maxShields: 100,
      energy: 500, maxEnergy: 500,
      crew: 152,

      // Resources
      dilithium: 25,
      deuterium: 50,
      torpedoes: 10,
      replicatorRations: 500,
      bioNeural: 20,

      // Ship config
      shipClass: 'Intrepid',
      shieldsActive: true,
      alertStatus: 'none', // none, yellow, red

      // Combat
      inCombat: false,
      enemyName: '',
      enemyHull: 0, enemyMaxHull: 100,
      enemyShields: 0, enemyMaxShields: 0,
      enemyType: '',

      // Upgrades (levels 0-5)
      hullUpgrade: 0,
      shieldUpgrade: 0,
      weaponUpgrade: 0,
      engineUpgrade: 0,
      sensorUpgrade: 0,

      // Progression
      chapter: 0,
      systemsVisited: 0,
      enemiesDefeated: 0,
      distanceFromHome: 70000, // light years
      stardateBase: 48315,
      currentSystemId: 0,
      visitedSystems: new Set([0]),

      // Missions
      activeMissions: [],
      completedMissions: [],

      // Crew morale
      morale: 80,
    };
  }

  getState() { return { ...this.state }; }

  update(changes) {
    this.state = { ...this.state, ...changes };
    // Clamp values
    this.state.hull = Math.max(0, Math.min(this.state.hull, this.state.maxHull));
    this.state.shields = Math.max(0, Math.min(this.state.shields, this.state.maxShields));
    this.state.energy = Math.max(0, Math.min(this.state.energy, this.state.maxEnergy));
    this.state.morale = Math.max(0, Math.min(this.state.morale, 100));
    this.notify();
  }

  subscribe(fn) {
    this.observers.push(fn);
    fn(this.getState());
  }

  notify() {
    const s = this.getState();
    for (const fn of this.observers) fn(s);
  }

  addMission(mission) {
    this.state.activeMissions = [...this.state.activeMissions, mission];
    this.notify();
  }

  completeMission(id) {
    const mission = this.state.activeMissions.find(m => m.id === id);
    if (mission) {
      mission.complete = true;
      this.state.activeMissions = this.state.activeMissions.filter(m => m.id !== id);
      this.state.completedMissions = [...this.state.completedMissions, mission];
      this.notify();
    }
  }

  getStardate() {
    return (this.state.stardateBase + this.state.systemsVisited * 2.3).toFixed(1);
  }

  canAfford(costs) {
    const s = this.state;
    for (const [resource, amount] of Object.entries(costs)) {
      if ((s[resource] || 0) < amount) return false;
    }
    return true;
  }

  spend(costs) {
    const changes = {};
    for (const [resource, amount] of Object.entries(costs)) {
      changes[resource] = this.state[resource] - amount;
    }
    this.update(changes);
  }

  // Save/Load
  save() {
    const s = { ...this.state };
    s.visitedSystems = Array.from(s.visitedSystems);
    localStorage.setItem('voyager-v2-save', JSON.stringify(s));
  }

  load() {
    const data = localStorage.getItem('voyager-v2-save');
    if (!data) return false;
    try {
      const s = JSON.parse(data);
      s.visitedSystems = new Set(s.visitedSystems);
      this.state = s;
      this.notify();
      return true;
    } catch { return false; }
  }
}
