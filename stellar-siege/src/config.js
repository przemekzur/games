// ============================================================================
//  STELLAR SIEGE — shared configuration & data schema
//  Single source of truth for balance, sizes, colors. Imported by every module.
//  All sizes are in WORLD units. Map grid tile = TILE world units.
// ============================================================================

export const TILE = 2;            // world units per grid cell
export const MAP_W = 64;          // grid cells
export const MAP_H = 64;
export const WORLD_W = MAP_W * TILE;
export const WORLD_H = MAP_H * TILE;

export const SIM_HZ = 20;         // simulation ticks per second (lockstep)
export const SIM_DT = 1 / SIM_HZ; // seconds per tick

// Faction visual identities (player 0 = blue Vanguard, player 1 = red Crimson).
export const FACTIONS = [
  { id: 0, name: 'Vanguard', primary: 0x2e6cff, accent: 0x6fd0ff, emissive: 0x1a4fff },
  { id: 1, name: 'Crimson',  primary: 0xff3b3b, accent: 0xff9a5a, emissive: 0xff2a1a },
];

export const NEUTRAL_COLOR = 0x8fa3b0;

// ---------------------------------------------------------------------------
//  UNITS  (radius = collision/footprint radius in world units)
// ---------------------------------------------------------------------------
export const UNITS = {
  worker: {
    name: 'Drone', kind: 'worker', role: 'worker',
    cost: { minerals: 50, gas: 0 }, supply: 1, buildTime: 5,
    hp: 60, armor: 0, radius: 0.7, speed: 7.5, sight: 16,
    dmg: 4, range: 1.2, attackSpeed: 1.0, projectile: null,
    canGather: true, carry: 8,
  },
  trooper: {
    name: 'Trooper', kind: 'trooper', role: 'combat',
    cost: { minerals: 50, gas: 0 }, supply: 1, buildTime: 7,
    hp: 50, armor: 0, radius: 0.7, speed: 8.5, sight: 18,
    dmg: 7, range: 9, attackSpeed: 0.9, projectile: 'bullet',
  },
  striker: {
    name: 'Striker', kind: 'striker', role: 'combat',
    cost: { minerals: 75, gas: 0 }, supply: 1, buildTime: 9,
    hp: 95, armor: 1, radius: 0.8, speed: 12, sight: 16,
    dmg: 13, range: 2.2, attackSpeed: 0.8, projectile: null, // fast melee/raider
  },
  tank: {
    name: 'Siege Tank', kind: 'tank', role: 'combat',
    cost: { minerals: 150, gas: 100 }, supply: 3, buildTime: 16,
    hp: 180, armor: 2, radius: 1.4, speed: 5.5, sight: 20,
    dmg: 34, range: 13, attackSpeed: 2.0, projectile: 'shell', splash: 2.2,
    requires: 'factory',
  },
};

// ---------------------------------------------------------------------------
//  BUILDINGS  (footprint in grid cells, square)
// ---------------------------------------------------------------------------
export const BUILDINGS = {
  hq: {
    name: 'Command Nexus', kind: 'hq',
    cost: { minerals: 400, gas: 0 }, buildTime: 40,
    hp: 1500, armor: 3, footprint: 4, sight: 22,
    supplyAdd: 11, dropoff: true, produces: ['worker'],
  },
  depot: {
    name: 'Supply Pylon', kind: 'depot',
    cost: { minerals: 100, gas: 0 }, buildTime: 14,
    hp: 500, armor: 2, footprint: 2, sight: 12, supplyAdd: 8,
  },
  barracks: {
    name: 'Barracks', kind: 'barracks',
    cost: { minerals: 150, gas: 0 }, buildTime: 22,
    hp: 900, armor: 2, footprint: 3, sight: 14, produces: ['trooper', 'striker'],
  },
  factory: {
    name: 'War Factory', kind: 'factory',
    cost: { minerals: 200, gas: 100 }, buildTime: 30,
    hp: 1100, armor: 3, footprint: 3, sight: 14, produces: ['tank'],
    requires: 'barracks',
  },
  refinery: {
    name: 'Refinery', kind: 'refinery',
    cost: { minerals: 75, gas: 0 }, buildTime: 12,
    hp: 700, armor: 2, footprint: 2, sight: 10, dropoff: true, onGeyser: true,
  },
  turret: {
    name: 'Sentry Turret', kind: 'turret',
    cost: { minerals: 125, gas: 0 }, buildTime: 16,
    hp: 450, armor: 2, footprint: 1, sight: 18,
    dmg: 11, range: 12, attackSpeed: 0.7, projectile: 'bullet',
  },
};

// Build menus shown on the command card for a selected worker / structure.
export const WORKER_BUILD_MENU = ['hq', 'depot', 'barracks', 'factory', 'refinery', 'turret'];

// ---------------------------------------------------------------------------
//  RESOURCES
// ---------------------------------------------------------------------------
export const RESOURCES = {
  minerals: { name: 'Mineral Field', kind: 'minerals', amount: 1500, radius: 1.4 },
  gas:      { name: 'Vespene Geyser', kind: 'gas', amount: 5000, radius: 1.6 },
};

export const START_MINERALS = 50;
export const START_GAS = 0;
export const BASE_SUPPLY = 0;        // supply comes entirely from HQ + depots
export const MAX_SUPPLY = 200;
export const GATHER_TIME = 1.4;      // seconds to mine one trip
export const GATHER_AMOUNT = 8;

// Convenience lookups
export const ALL_DEFS = { ...UNITS, ...BUILDINGS };
export function defOf(kind) { return ALL_DEFS[kind]; }
export function isBuilding(kind) { return kind in BUILDINGS; }
export function isUnit(kind) { return kind in UNITS; }
