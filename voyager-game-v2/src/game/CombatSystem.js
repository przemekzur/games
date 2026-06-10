// Combat system v2 — enemy AI with per-faction movement patterns, dynamic
// evasion (your speed matters), critical hits, Borg adaptation, escort drones,
// and animated model parts.
import * as THREE from 'three';
import { createEnemyModel, createSwarmShip } from './EnemyShipModels.js';

// ─── Behaviour per enemy key prefix ─────────────────────────────────────────
// pattern: 'orbit'   — circle the player (default)
//          'run'     — attack runs: dive in, fire, peel away
//          'advance' — slow relentless head-on approach (Borg)
//          'weave'   — fast sinusoidal strafing passes
const BEHAVIOR = {
  'kazon':    { pattern: 'run',     orbitSpeed: 0.8,  erratic: true  },
  'vidiian':  { pattern: 'orbit',   orbitSpeed: 0.55, erratic: false },
  'hirogen':  { pattern: 'run',     orbitSpeed: 0.6,  erratic: false, swooping: true },
  'borg':     { pattern: 'advance', orbitSpeed: 0.25, erratic: false },
  'species':  { pattern: 'weave',   orbitSpeed: 0.9,  erratic: true  },
  'devore':   { pattern: 'orbit',   orbitSpeed: 0.65, erratic: false },
  'krenim':   { pattern: 'orbit',   orbitSpeed: 0.5,  erratic: false },
  'swarm':    { pattern: 'weave',   orbitSpeed: 1.1,  erratic: true  },
  'malon':    { pattern: 'orbit',   orbitSpeed: 0.35, erratic: false },
};

function getBehavior(key) {
  for (const prefix of Object.keys(BEHAVIOR)) {
    if (key.startsWith(prefix)) return BEHAVIOR[prefix];
  }
  return { pattern: 'orbit', orbitSpeed: 0.5, erratic: false };
}

// Weapon beam colors per enemy type prefix
const WEAPON_COLORS = {
  'kazon':   0xff6600,
  'vidiian': 0x44ff88,
  'hirogen': 0x8888ff,
  'borg':    0x00ff00,
  'species': 0xaaff00,
  'devore':  0xff4444,
  'krenim':  0xff8800,
  'swarm':   0xffaa00,
  'malon':   0x88ff44,
};

function getWeaponColor(key) {
  for (const prefix of Object.keys(WEAPON_COLORS)) {
    if (key.startsWith(prefix)) return WEAPON_COLORS[prefix];
  }
  return 0xff4400;
}

export class CombatSystem {
  constructor(gameState, particles, ship, scene, camera, onEvent) {
    this.gameState = gameState;
    this.particles = particles;
    this.ship = ship;
    this.scene = scene;
    this.camera = camera;
    this.onEvent = onEvent;
    this.combatTimer = 0;
    this.enemyAttackInterval = 3;
    this.lastEnemyAttack = 0;
    this.soundManager = null;

    // 3D spatial state
    this.enemyModel = null;
    this.orbitAngle = 0;
    this.orbitRadius = 50;
    this.orbitRadiusTarget = 50;
    this.orbitHeight = 5;
    this.orbitHeightTarget = 5;
    this.rushTimer = 0;
    this.behavior = null;
    this.enemyKey = null;
    this.healthBarEl = null;
    this.fleeing = false;
    this.fleeSpeed = 0;
    this.destroyCleanupTimer = -1;

    // v2 dynamics
    this.escorts = [];           // wingman drones (visual)
    this.runPhase = 'circle';    // attack-run state machine: circle → dive → peel
    this.runTimer = 0;
    this.borgAdaptHits = 0;      // phaser hits absorbed; Borg adapt after enough
    this.borgAdapted = false;
    this.hitFlashTimer = 0;
  }

  // ─── Enemy templates ──────────────────────────────────────────────────────
  static ENEMIES = {
    'kazon-raider': {
      name: 'Kazon Raider', hull: 60, maxHull: 60, shields: 20, maxShields: 20,
      damage: 8, accuracy: 0.6, reward: { dilithium: 10 },
      description: 'A Kazon-Ogla attack vessel',
    },
    'kazon-predator': {
      name: 'Kazon Predator-Class', hull: 100, maxHull: 100, shields: 40, maxShields: 40,
      damage: 12, accuracy: 0.65, reward: { dilithium: 20, deuterium: 10 },
      description: 'Heavy Kazon warship',
    },
    'vidiian-cruiser': {
      name: 'Vidiian Cruiser', hull: 80, maxHull: 80, shields: 30, maxShields: 30,
      damage: 10, accuracy: 0.7, reward: { bioNeural: 8 },
      description: 'Vidiian organ harvesting vessel',
    },
    'hirogen-hunter': {
      name: 'Hirogen Hunter', hull: 90, maxHull: 90, shields: 50, maxShields: 50,
      damage: 15, accuracy: 0.75, reward: { dilithium: 15, deuterium: 15 },
      description: 'Hirogen hunting vessel — they seek worthy prey',
    },
    'borg-probe': {
      name: 'Borg Sphere', hull: 120, maxHull: 120, shields: 80, maxShields: 80,
      damage: 20, accuracy: 0.85, reward: { bioNeural: 15 },
      description: 'Borg sphere. Resistance is futile.',
    },
    'borg-cube': {
      name: 'Borg Cube', hull: 300, maxHull: 300, shields: 200, maxShields: 200,
      damage: 35, accuracy: 0.9, reward: { bioNeural: 30, dilithium: 40 },
      description: 'BORG CUBE DETECTED. All hands to battle stations!',
    },
    'species-8472': {
      name: 'Species 8472 Bioship', hull: 200, maxHull: 200, shields: 0, maxShields: 0,
      damage: 40, accuracy: 0.8, reward: { bioNeural: 25 },
      description: 'Bioship from fluidic space. Extremely dangerous.',
    },
    'devore-warship': {
      name: 'Devore Warship', hull: 90, maxHull: 90, shields: 40, maxShields: 40,
      damage: 12, accuracy: 0.7, reward: { deuterium: 15 },
      description: 'Devore Imperium vessel. They hunt telepaths.',
    },
    'krenim-timeship': {
      name: 'Krenim Temporal Ship', hull: 150, maxHull: 150, shields: 60, maxShields: 60,
      damage: 25, accuracy: 0.8, reward: { dilithium: 25, bioNeural: 10 },
      description: 'Krenim vessel with temporal weaponry.',
    },
    'swarm-ship': {
      name: 'Swarm Vessel', hull: 30, maxHull: 30, shields: 10, maxShields: 10,
      damage: 5, accuracy: 0.5, reward: { deuterium: 5 },
      description: 'Small but they attack in numbers.',
    },
    'malon-freighter': {
      name: 'Malon Export Vessel', hull: 70, maxHull: 70, shields: 20, maxShields: 20,
      damage: 8, accuracy: 0.5, reward: { deuterium: 20 },
      description: 'Armed Malon waste freighter.',
    },
  };

  // ─── Region → enemy selection ─────────────────────────────────────────────
  getEnemyForRegion(region, threat) {
    const regionEnemies = {
      OCAMPA: ['kazon-raider'],
      KAZON: ['kazon-raider', 'kazon-predator'],
      VIDIIAN: ['vidiian-cruiser'],
      BOTHAN: ['kazon-raider', 'swarm-ship'],
      NEKRIT: ['swarm-ship', 'hirogen-hunter'],
      BORG: ['borg-probe', 'borg-cube', 'species-8472'],
      KRENIM: ['krenim-timeship', 'devore-warship'],
      HIROGEN: ['hirogen-hunter'],
      DEVORE: ['devore-warship'],
      MALON: ['malon-freighter'],
      VOID: ['swarm-ship', 'hirogen-hunter'],
      ALPHA: [],
    };

    const pool = regionEnemies[region] || ['kazon-raider'];
    if (pool.length === 0) return null;

    const idx = Math.min(pool.length - 1, Math.floor(threat * pool.length));
    const key = pool[idx];
    return { ...CombatSystem.ENEMIES[key], key };
  }

  // ─── Get 3D enemy position ────────────────────────────────────────────────
  getEnemyWorldPos() {
    if (this.enemyModel) {
      const v = new THREE.Vector3();
      this.enemyModel.getWorldPosition(v);
      return v;
    }
    return this.ship.getWorldPosition().add(new THREE.Vector3(0, 0, -40));
  }

  // ─── Start combat ─────────────────────────────────────────────────────────
  startCombat(enemy) {
    this.gameState.update({
      inCombat: true,
      alertStatus: 'red',
      enemyName: enemy.name,
      enemyHull: enemy.hull,
      enemyMaxHull: enemy.maxHull,
      enemyShields: enemy.shields,
      enemyMaxShields: enemy.maxShields,
      enemyType: enemy.description,
    });
    this.currentEnemy = enemy;
    this.combatTimer = 0;
    this.lastEnemyAttack = 0;
    this.fleeing = false;
    this.fleeSpeed = 0;
    this.destroyCleanupTimer = -1;
    this.borgAdaptHits = 0;
    this.borgAdapted = false;
    this.runPhase = 'circle';
    this.runTimer = 1.5 + Math.random() * 2;

    // ── Spawn 3D model ──
    this.enemyKey = enemy.key || 'kazon-raider';
    this.behavior = getBehavior(this.enemyKey);
    this.removeEnemyModel();

    this.enemyModel = createEnemyModel(this.enemyKey);
    this.scene.add(this.enemyModel);

    // Place enemy 80-120 units ahead of player
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.ship.mesh.quaternion);
    const spawnDist = 80 + Math.random() * 40;
    const shipPos = this.ship.getWorldPosition();
    this.enemyModel.position.copy(shipPos).addScaledVector(forward, spawnDist);
    this.enemyModel.position.y += (Math.random() - 0.5) * 20;

    // Orbit state
    this.orbitAngle = Math.atan2(
      this.enemyModel.position.x - shipPos.x,
      this.enemyModel.position.z - shipPos.z
    );
    this.orbitRadius = 50;
    this.orbitRadiusTarget = 40 + Math.random() * 20;
    this.orbitHeight = this.enemyModel.position.y - shipPos.y;
    this.orbitHeightTarget = (Math.random() - 0.5) * 20;
    this.rushTimer = 0;

    // ── Escort drones: swarm always brings friends; Kazon predator brings raid wings ──
    this.removeEscorts();
    const escortCount = this.enemyKey === 'swarm-ship' ? 3
      : this.enemyKey === 'kazon-predator' ? 2 : 0;
    for (let i = 0; i < escortCount; i++) {
      const drone = createSwarmShip();
      drone.scale.setScalar(this.enemyKey === 'swarm-ship' ? 0.8 : 0.5);
      drone.position.copy(this.enemyModel.position);
      drone.position.x += (Math.random() - 0.5) * 25;
      drone.position.y += (Math.random() - 0.5) * 15;
      this.scene.add(drone);
      this.escorts.push({
        model: drone,
        phase: Math.random() * Math.PI * 2,
        radius: 14 + i * 7,
        speed: 1.2 + Math.random() * 0.8,
      });
    }
    if (escortCount > 0) {
      this.onEvent(`⚠️ ${escortCount} escort vessels detected in attack formation!`, 'combat');
    }

    this.createHealthBar(enemy.name);

    this.onEvent(`🔴 RED ALERT! ${enemy.name} detected! ${enemy.description}`, 'combat');
  }

  // ─── Health bar (HTML overlay projected to screen coords) ─────────────────
  createHealthBar(name) {
    this.removeHealthBar();
    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed; pointer-events:none; z-index:100;
      transform:translate(-50%,-100%);
      font-family:'Courier New',monospace; font-size:11px; color:#fff;
      text-shadow:0 0 4px #000; white-space:nowrap;
      background:rgba(0,0,0,0.55); padding:3px 8px; border-radius:4px;
      border:1px solid rgba(255,255,255,0.15);
    `;
    el.innerHTML = `
      <div style="text-align:center;margin-bottom:2px;font-weight:bold;letter-spacing:1px">${name}</div>
      <div style="display:flex;gap:4px;align-items:center">
        <span style="color:#55aaff">SH</span>
        <div style="width:80px;height:6px;background:#222;border-radius:3px;overflow:hidden">
          <div class="ehb-shield" style="width:100%;height:100%;background:#3399ff;transition:width .15s"></div>
        </div>
      </div>
      <div style="display:flex;gap:4px;align-items:center;margin-top:1px">
        <span style="color:#ff6644">HL</span>
        <div style="width:80px;height:6px;background:#222;border-radius:3px;overflow:hidden">
          <div class="ehb-hull" style="width:100%;height:100%;background:#cc3322;transition:width .15s"></div>
        </div>
      </div>
    `;
    document.body.appendChild(el);
    this.healthBarEl = el;
  }

  removeHealthBar() {
    if (this.healthBarEl) {
      this.healthBarEl.remove();
      this.healthBarEl = null;
    }
  }

  updateHealthBar() {
    if (!this.healthBarEl || !this.enemyModel || !this.camera) return;
    const state = this.gameState.getState();

    const pos = this.getEnemyWorldPos();
    pos.y += (this.enemyModel.userData.boundingRadius || 8) + 4;
    const projected = pos.project(this.camera);
    const hw = window.innerWidth / 2;
    const hh = window.innerHeight / 2;
    const sx = projected.x * hw + hw;
    const sy = -(projected.y * hh) + hh;

    if (projected.z > 1) {
      this.healthBarEl.style.display = 'none';
      return;
    }
    this.healthBarEl.style.display = '';
    this.healthBarEl.style.left = sx + 'px';
    this.healthBarEl.style.top = (sy - 10) + 'px';

    const shieldPct = state.enemyMaxShields > 0
      ? (state.enemyShields / state.enemyMaxShields) * 100 : 0;
    const hullPct = state.enemyMaxHull > 0
      ? (state.enemyHull / state.enemyMaxHull) * 100 : 0;

    const shieldBar = this.healthBarEl.querySelector('.ehb-shield');
    const hullBar = this.healthBarEl.querySelector('.ehb-hull');
    if (shieldBar) shieldBar.style.width = shieldPct + '%';
    if (hullBar) hullBar.style.width = hullPct + '%';
  }

  // ─── Remove enemy 3D model + escorts ──────────────────────────────────────
  removeEnemyModel() {
    if (this.enemyModel) {
      this.scene.remove(this.enemyModel);
      this.enemyModel.traverse((child) => {
        if (child.isMesh) {
          child.geometry?.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
            else child.material.dispose();
          }
        }
      });
      this.enemyModel = null;
    }
    this.removeEscorts();
  }

  removeEscorts() {
    for (const escort of this.escorts) {
      this.scene.remove(escort.model);
      escort.model.traverse((child) => {
        if (child.isMesh) {
          child.geometry?.dispose();
          if (child.material) child.material.dispose();
        }
      });
    }
    this.escorts = [];
  }

  // ─── Fire phasers ─────────────────────────────────────────────────────────
  firePhasers() {
    const state = this.gameState.getState();
    const cost = 15;
    if (state.energy < cost) {
      this.onEvent('⚡ Insufficient energy for phasers!', 'combat');
      return;
    }

    let baseDmg = 12 + state.weaponUpgrade * 3;
    const accuracy = 0.7 + state.sensorUpgrade * 0.05;
    const hit = Math.random() < accuracy;

    this.gameState.update({ energy: state.energy - cost });

    if (hit) {
      // Borg adaptation: phasers lose effectiveness after repeated hits
      if (this.enemyKey?.startsWith('borg')) {
        this.borgAdaptHits++;
        if (this.borgAdaptHits >= 4 && !this.borgAdapted) {
          this.borgAdapted = true;
          this.onEvent('🟩 The Borg have ADAPTED to our phaser frequency! Switching to torpedoes advised.', 'combat');
        }
        if (this.borgAdapted) baseDmg = Math.ceil(baseDmg * 0.35);
      }

      // Critical hit chance scales with sensor upgrades
      const critChance = 0.1 + state.sensorUpgrade * 0.04;
      const crit = Math.random() < critChance;
      let dmg = baseDmg + Math.floor(Math.random() * 6);
      if (crit) dmg = Math.floor(dmg * 1.8);

      this.dealDamageToEnemy(dmg);
      this.hitFlashTimer = 0.25;
      if (crit) {
        this.onEvent(`⚡ CRITICAL HIT! Phasers strike a power junction — ${dmg} damage!`, 'success');
        this.particles.createExplosion(this.getEnemyWorldPos(), 0xffcc44, 0.8);
      } else {
        this.onEvent(`⚡ Phaser strike! ${dmg} damage dealt.`, 'combat');
      }

      this.particles.createPhaserBeam(this.ship.mesh, this.enemyModel || this.getEnemyWorldPos(), 0xff6600);
    } else {
      // Show the miss — beam streaks past the enemy
      const missTarget = this.getEnemyWorldPos().add(new THREE.Vector3(
        (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30
      ));
      this.particles.createPhaserBeam(this.ship.mesh, missTarget, 0xff6600, 0.3);
      this.onEvent('⚡ Phasers missed the target!', 'combat');
    }
  }

  // ─── Fire torpedoes ───────────────────────────────────────────────────────
  fireTorpedoes() {
    const state = this.gameState.getState();
    if (state.torpedoes <= 0) {
      this.onEvent('💥 No torpedoes remaining!', 'combat');
      return;
    }
    if (state.energy < 10) {
      this.onEvent('⚡ Insufficient energy to launch torpedo!', 'combat');
      return;
    }

    this.gameState.update({
      torpedoes: state.torpedoes - 1,
      energy: state.energy - 10,
    });

    // Transphasic torpedoes (Endgame future tech) hit much harder
    const transphasic = (state.flagFutureTech || 0) > 0;
    const baseDmg = (25 + state.weaponUpgrade * 5) * (transphasic ? 1.6 : 1);
    const accuracy = 0.6 + state.sensorUpgrade * 0.05;
    const hit = Math.random() < accuracy;

    if (hit) {
      const dmg = Math.floor(baseDmg + Math.random() * 10);
      this.dealDamageToEnemy(dmg);
      this.hitFlashTimer = 0.35;
      this.onEvent(
        transphasic
          ? `💥 Transphasic torpedo impact! ${dmg} damage — their shields can't adapt!`
          : `💥 Torpedo impact! ${dmg} damage dealt!`,
        'combat'
      );

      const from = this.ship.getWorldPosition();
      const to = this.getEnemyWorldPos();
      this.particles.createTorpedo(from, to, transphasic ? 0x66ddff : 0xff4400);
    } else {
      const from = this.ship.getWorldPosition();
      const missTo = this.getEnemyWorldPos().add(new THREE.Vector3(
        (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 40
      ));
      this.particles.createTorpedo(from, missTo, 0xff4400);
      this.onEvent('💥 Torpedo missed!', 'combat');
    }
  }

  // ─── Evasive maneuvers ────────────────────────────────────────────────────
  evasiveManeuvers() {
    const state = this.gameState.getState();
    const cost = 25;
    if (state.energy < cost) {
      this.onEvent('⚡ Not enough energy for evasive maneuvers!', 'combat');
      return;
    }

    this.gameState.update({ energy: state.energy - cost });
    this.lastEnemyAttack = this.combatTimer;
    this.onEvent('🔄 Evasive maneuvers! Enemy attack window reset.', 'combat');
  }

  // ─── Redistribute shields ─────────────────────────────────────────────────
  redistributeShields() {
    const state = this.gameState.getState();
    const cost = 20;
    if (state.energy < cost) {
      this.onEvent('⚡ Insufficient energy for shield redistribution!', 'combat');
      return;
    }

    const shieldRestore = 15 + state.shieldUpgrade * 5;
    this.gameState.update({
      energy: state.energy - cost,
      shields: Math.min(state.maxShields, state.shields + shieldRestore),
    });
    this.onEvent(`🛡️ Shields reinforced! +${shieldRestore} shield strength.`, 'combat');
    this.ship.flashShield(0.8);
  }

  // ─── Deal damage to enemy ─────────────────────────────────────────────────
  dealDamageToEnemy(dmg) {
    const state = this.gameState.getState();
    let remaining = dmg;

    if (state.enemyShields > 0) {
      const absorbed = Math.min(state.enemyShields, remaining);
      remaining -= absorbed;
      this.gameState.update({ enemyShields: state.enemyShields - absorbed });
    }

    if (remaining > 0) {
      const newHull = Math.max(0, state.enemyHull - remaining);
      this.gameState.update({ enemyHull: newHull });

      // Heavy hull damage: enemy starts venting plasma
      if (this.enemyModel && newHull > 0 && newHull / state.enemyMaxHull < 0.35) {
        this.particles.emit({
          position: this.getEnemyWorldPos(),
          count: 12, color: 0xff8833, speed: 4, spread: 1.5, life: 1.0, size: 1.4,
        });
      }

      if (newHull <= 0) this.enemyDestroyed();
    }
  }

  // ─── Enemy attack — accuracy reduced by player speed (fly fast to evade!) ─
  enemyAttack() {
    if (!this.currentEnemy) return;
    const state = this.gameState.getState();
    const enemy = this.currentEnemy;

    this.rushTimer = 0.6;

    // Dynamic evasion: the faster Voyager is moving, the harder she is to hit.
    // At full impulse the enemy loses up to 25% accuracy.
    const speedRatio = Math.min(1, Math.abs(this.ship.currentSpeed) / Math.max(1, this.ship.maxSpeed));
    const evasionPenalty = speedRatio * 0.25;
    const effectiveAccuracy = Math.max(0.1, enemy.accuracy - evasionPenalty);
    const hit = Math.random() < effectiveAccuracy;

    const enemyPos = this.getEnemyWorldPos();
    const playerPos = this.ship.getWorldPosition();
    const weaponColor = getWeaponColor(this.enemyKey || 'kazon');

    if (enemy.damage >= 20) {
      this.particles.createTorpedo(enemyPos, playerPos, weaponColor, 60);
    } else {
      this.particles.createPhaserBeam(this.enemyModel || enemyPos, this.ship.mesh || playerPos, weaponColor, 0.4);
    }

    // Escorts fire too (visual flair, no extra damage)
    for (const escort of this.escorts) {
      if (Math.random() < 0.5) {
        this.particles.createPhaserBeam(escort.model, this.ship.mesh, weaponColor, 0.25);
      }
    }

    if (!hit) {
      this.onEvent(
        speedRatio > 0.5
          ? `${enemy.name} fires — our speed threw off their targeting!`
          : `${enemy.name} fires — missed!`,
        'combat'
      );
      return;
    }

    let dmg = enemy.damage + Math.floor(Math.random() * (enemy.damage * 0.3));

    if (state.shieldsActive && state.shields > 0) {
      const absorbed = Math.min(state.shields, Math.floor(dmg * 0.7));
      dmg -= absorbed;
      this.gameState.update({ shields: state.shields - absorbed });
      this.ship.flashShield(0.4);
      this.soundManager?.play('shieldHit');
      this.onEvent(`🛡️ Shields absorb ${absorbed} damage. ${dmg} bleeds through!`, 'combat');
    }

    if (dmg > 0) {
      this.gameState.update({ hull: state.hull - dmg });
      this.onEvent(`💢 Hull breach! ${dmg} damage taken. Hull at ${Math.max(0, state.hull - dmg)}%.`, 'combat');

      document.getElementById('game-container')?.classList.add('screen-shake');
      setTimeout(() => document.getElementById('game-container')?.classList.remove('screen-shake'), 300);

      const pos = this.ship.getWorldPosition();
      const dir = new THREE.Vector3().subVectors(enemyPos, pos).normalize();
      this.particles.createShieldImpact(
        pos.clone().add(dir.multiplyScalar(15)),
        pos,
        state.shieldsActive ? 0x3399ff : 0xff4400
      );
    }

    if (this.gameState.getState().hull <= 0) {
      this.playerDestroyed();
    }
  }

  // ─── Enemy destroyed — staged explosion with debris ───────────────────────
  enemyDestroyed() {
    if (!this.currentEnemy) return;
    const enemy = this.currentEnemy;
    const state = this.gameState.getState();

    this.onEvent(`🎯 ${enemy.name} destroyed!`, 'success');
    this.soundManager?.play('explosion');

    const rewards = enemy.reward || {};
    const changes = { enemiesDefeated: state.enemiesDefeated + 1 };
    const rewardTexts = [];
    for (const [key, val] of Object.entries(rewards)) {
      changes[key] = (state[key] || 0) + val;
      rewardTexts.push(`+${val} ${key}`);
    }
    if (rewardTexts.length) {
      this.onEvent(`📦 Salvage: ${rewardTexts.join(', ')}`, 'success');
    }

    // Staged multi-explosion at enemy 3D position
    const pos = this.getEnemyWorldPos();
    this.particles.createExplosion(pos, 0xff6600, 2.5);
    this.particles.createExplosion(pos.clone().add(new THREE.Vector3(3, 2, -2)), 0xffaa00, 1.5);
    setTimeout(() => {
      this.particles.createExplosion(pos.clone().add(new THREE.Vector3(-4, -1, 3)), 0xffffff, 1.8);
    }, 250);
    setTimeout(() => {
      this.particles.createExplosion(pos.clone().add(new THREE.Vector3(1, 3, 1)), 0xff8844, 2.2);
      // Debris field
      this.particles.emit({
        position: pos, count: 60, color: 0x886644, speed: 12, spread: 1.5, life: 2.5, size: 1.2,
      });
    }, 500);

    if (this.enemyModel) this.enemyModel.visible = false;
    // Escorts scatter and explode
    for (const escort of this.escorts) {
      const ePos = escort.model.position.clone();
      this.particles.createExplosion(ePos, 0xffaa00, 0.8);
      escort.model.visible = false;
    }

    this.destroyCleanupTimer = 2.0;
    this._destroyChanges = changes;
  }

  // ─── Player destroyed ─────────────────────────────────────────────────────
  playerDestroyed() {
    this.onEvent('💀 Voyager has been destroyed. The journey ends here.', 'combat');
    this.endCombat({});
  }

  // ─── Flee — enemy flies away ──────────────────────────────────────────────
  flee() {
    const state = this.gameState.getState();
    const fleeChance = 0.5 + state.engineUpgrade * 0.1;
    if (Math.random() < fleeChance) {
      this.onEvent('🚀 Warp engines engaged! Escaped from combat.', 'success');
      this.fleeing = true;
      this.fleeSpeed = 0;
      this.destroyCleanupTimer = 2.0;
      this._destroyChanges = {};
      return true;
    } else {
      this.onEvent('🚫 Unable to escape! Enemy is pursuing.', 'combat');
      this.enemyAttack();
      return false;
    }
  }

  // ─── End combat ───────────────────────────────────────────────────────────
  endCombat(extraChanges = {}) {
    this.removeEnemyModel();
    this.removeHealthBar();

    this.gameState.update({
      ...extraChanges,
      inCombat: false,
      alertStatus: 'none',
      enemyName: '',
      enemyHull: 0, enemyShields: 0,
    });
    this.currentEnemy = null;
    this.behavior = null;
    this.enemyKey = null;
    this.fleeing = false;
    this.destroyCleanupTimer = -1;
  }

  // ─── Per-frame update ─────────────────────────────────────────────────────
  update(delta) {
    if (!this.gameState.getState().inCombat || !this.currentEnemy) return;
    this.combatTimer += delta;

    // Delayed cleanup after enemy destroyed or flee
    if (this.destroyCleanupTimer >= 0) {
      this.destroyCleanupTimer -= delta;
      if (this.fleeing && this.enemyModel) {
        this.fleeSpeed += delta * 120;
        const away = new THREE.Vector3()
          .subVectors(this.enemyModel.position, this.ship.getWorldPosition())
          .normalize();
        this.enemyModel.position.addScaledVector(away, this.fleeSpeed * delta);
        this.enemyModel.traverse((c) => {
          if (c.isMesh && c.material && c.material.transparent !== undefined) {
            c.material.opacity = Math.max(0, (c.material.opacity || 1) - delta * 0.8);
          }
        });
      }
      this.updateHealthBar();

      if (this.destroyCleanupTimer < 0) {
        this.endCombat(this._destroyChanges || {});
      }
      return;
    }

    // ── Enemy AI movement: per-faction patterns ──
    if (this.enemyModel && this.behavior) {
      const shipPos = this.ship.getWorldPosition();
      const b = this.behavior;
      const prevPos = this.enemyModel.position.clone();

      let speed = b.orbitSpeed;
      if (b.erratic) speed += Math.sin(this.combatTimer * 2.5) * 0.3;

      switch (b.pattern) {
        case 'advance': {
          // Borg: slow, relentless, head-on. Holds a tight stand-off distance.
          this.orbitAngle += delta * speed * 0.4;
          this.orbitRadiusTarget = THREE.MathUtils.lerp(this.orbitRadiusTarget, 28, delta * 0.3);
          this.orbitHeightTarget = 0;
          break;
        }
        case 'run': {
          // Attack runs: circle wide → dive in fast → peel away
          this.runTimer -= delta;
          if (this.runTimer <= 0) {
            if (this.runPhase === 'circle') {
              this.runPhase = 'dive';
              this.runTimer = 1.4;
              this.orbitRadiusTarget = 18;
            } else if (this.runPhase === 'dive') {
              this.runPhase = 'peel';
              this.runTimer = 2.0;
              this.orbitRadiusTarget = 65 + Math.random() * 15;
              this.orbitHeightTarget = (Math.random() - 0.5) * 30;
            } else {
              this.runPhase = 'circle';
              this.runTimer = 2 + Math.random() * 2.5;
              this.orbitRadiusTarget = 45 + Math.random() * 15;
            }
          }
          this.orbitAngle += delta * speed * (this.runPhase === 'dive' ? 2.2 : 1);
          if (b.swooping) {
            this.orbitHeightTarget += Math.sin(this.combatTimer * 1.2) * delta * 12;
          }
          break;
        }
        case 'weave': {
          // Fast strafing weave — rapid orbit with sharp height oscillation
          this.orbitAngle += delta * speed * 1.4;
          this.orbitHeightTarget = Math.sin(this.combatTimer * 2.2) * 22;
          if (Math.random() < delta * 0.6) {
            this.orbitRadiusTarget = 30 + Math.random() * 30;
          }
          break;
        }
        default: {
          // Classic orbit with drifting radius/height
          this.orbitAngle += delta * speed;
          if (Math.random() < delta * 0.3) {
            this.orbitRadiusTarget = 40 + Math.random() * 20;
            this.orbitHeightTarget = (Math.random() - 0.5) * 25;
          }
        }
      }

      // Attack rush: briefly close distance
      if (this.rushTimer > 0) {
        this.rushTimer -= delta;
        if (b.pattern !== 'advance') this.orbitRadiusTarget = Math.min(this.orbitRadiusTarget, 25);
      }

      this.orbitRadius = THREE.MathUtils.lerp(this.orbitRadius, this.orbitRadiusTarget, delta * 2);
      this.orbitHeight = THREE.MathUtils.lerp(this.orbitHeight, this.orbitHeightTarget, delta * 1.5);

      const tx = shipPos.x + Math.sin(this.orbitAngle) * this.orbitRadius;
      const ty = shipPos.y + this.orbitHeight;
      const tz = shipPos.z + Math.cos(this.orbitAngle) * this.orbitRadius;

      const posLerp = b.pattern === 'weave' ? 4.5 : b.pattern === 'advance' ? 1.5 : 3;
      this.enemyModel.position.x = THREE.MathUtils.lerp(this.enemyModel.position.x, tx, delta * posLerp);
      this.enemyModel.position.y = THREE.MathUtils.lerp(this.enemyModel.position.y, ty, delta * posLerp);
      this.enemyModel.position.z = THREE.MathUtils.lerp(this.enemyModel.position.z, tz, delta * posLerp);

      // Face the player — except cubes, which rotate slowly and ominously
      if (this.enemyKey === 'borg-cube') {
        this.enemyModel.rotation.y += delta * 0.15;
        this.enemyModel.rotation.x += delta * 0.07;
      } else {
        this.enemyModel.lookAt(shipPos);
      }

      // Thruster flames stretch with actual movement speed
      const moveSpeed = prevPos.distanceTo(this.enemyModel.position) / Math.max(delta, 0.0001);
      const thrusters = this.enemyModel.userData.thrusters || [];
      const stretch = 1 + Math.min(2.5, moveSpeed * 0.06);
      for (const flame of thrusters) {
        flame.scale.set(1, stretch, 1);
        flame.material.opacity = 0.5 + Math.min(0.5, moveSpeed * 0.015);
      }

      this.animateEnemyModel(delta);

      // ── Escort drone movement: orbit the mothership ──
      for (const escort of this.escorts) {
        escort.phase += delta * escort.speed;
        const ex = this.enemyModel.position.x + Math.cos(escort.phase) * escort.radius;
        const ey = this.enemyModel.position.y + Math.sin(escort.phase * 1.7) * 6;
        const ez = this.enemyModel.position.z + Math.sin(escort.phase) * escort.radius;
        escort.model.position.set(ex, ey, ez);
        escort.model.lookAt(shipPos);
        // Animate escort pulsers
        this.animateParts(escort.model, delta);
      }
    }

    this.updateHealthBar();

    // ── Enemy attacks on interval ──
    const interval = this.enemyAttackInterval - (this.currentEnemy.damage > 20 ? 0.5 : 0);
    if (this.combatTimer - this.lastEnemyAttack >= interval) {
      this.lastEnemyAttack = this.combatTimer;
      this.enemyAttack();
    }
  }

  // ─── Animate registered model parts (pulsers, spinners) ──────────────────
  animateParts(model, delta) {
    const t = this.combatTimer;
    for (const p of model.userData.pulsers || []) {
      const v = (Math.sin(t * p.rate + p.phase) * 0.5 + 0.5);
      p.mesh.material.opacity = p.min + v * (p.max - p.min);
    }
    for (const s of model.userData.spinners || []) {
      s.obj.rotation[s.axis] += delta * s.speed;
    }
  }

  // ─── Animate per-type model effects ───────────────────────────────────────
  animateEnemyModel(delta) {
    if (!this.enemyModel) return;

    this.animateParts(this.enemyModel, delta);

    // Hit flash: briefly blow out all glow parts after taking a hit
    if (this.hitFlashTimer > 0) {
      this.hitFlashTimer -= delta;
      const boost = this.hitFlashTimer * 4;
      for (const p of this.enemyModel.userData.pulsers || []) {
        p.mesh.material.opacity = Math.min(1, p.mesh.material.opacity + boost);
      }
    }

    // Energy core pulse (krenim, 8472, swarm)
    const core = this.enemyModel.userData.energyCore;
    if (core) {
      core.scale.setScalar(0.9 + Math.sin(this.combatTimer * 3) * 0.15);
    }
  }
}
