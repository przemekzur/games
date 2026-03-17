// Combat system with enemy AI, weapons, tactical choices, and 3D spatial combat
import * as THREE from 'three';
import { createEnemyModel } from './EnemyShipModels.js';

// ─── Orbit behaviour per enemy key prefix ───────────────────────────────────
const BEHAVIOR = {
  'kazon':    { orbitSpeed: 0.8,  erratic: true,  swooping: false },
  'vidiian':  { orbitSpeed: 0.55, erratic: false,  swooping: false },
  'hirogen':  { orbitSpeed: 0.6,  erratic: false,  swooping: true  },
  'borg':     { orbitSpeed: 0.3,  erratic: false,  swooping: false },
  'species':  { orbitSpeed: 0.7,  erratic: true,   swooping: false },
  'devore':   { orbitSpeed: 0.5,  erratic: false,  swooping: false },
  'krenim':   { orbitSpeed: 0.5,  erratic: false,  swooping: false },
  'swarm':    { orbitSpeed: 0.9,  erratic: true,   swooping: false },
  'malon':    { orbitSpeed: 0.4,  erratic: false,  swooping: false },
};

function getBehavior(key) {
  for (const prefix of Object.keys(BEHAVIOR)) {
    if (key.startsWith(prefix)) return BEHAVIOR[prefix];
  }
  return { orbitSpeed: 0.5, erratic: false, swooping: false };
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
  }

  // ─── Enemy templates (UNCHANGED) ──────────────────────────────────────────
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
      name: 'Borg Probe', hull: 120, maxHull: 120, shields: 80, maxShields: 80,
      damage: 20, accuracy: 0.85, reward: { bioNeural: 15 },
      description: 'Borg probe vessel. Resistance is futile.',
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

  // ─── Region → enemy selection (now returns key for model lookup) ──────────
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

  // ─── Get 3D enemy position (returns world pos or fallback) ────────────────
  getEnemyWorldPos() {
    if (this.enemyModel) {
      const v = new THREE.Vector3();
      this.enemyModel.getWorldPosition(v);
      return v;
    }
    // Fallback: offset from ship
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

    // ── Create floating health bar ──
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

    // Project enemy position to screen
    const pos = this.getEnemyWorldPos();
    pos.y += (this.enemyModel.userData.boundingRadius || 8) + 4;
    const projected = pos.project(this.camera);
    const hw = window.innerWidth / 2;
    const hh = window.innerHeight / 2;
    const sx = projected.x * hw + hw;
    const sy = -(projected.y * hh) + hh;

    // Hide if behind camera
    if (projected.z > 1) {
      this.healthBarEl.style.display = 'none';
      return;
    }
    this.healthBarEl.style.display = '';
    this.healthBarEl.style.left = sx + 'px';
    this.healthBarEl.style.top = (sy - 10) + 'px';

    // Update bars
    const shieldPct = state.enemyMaxShields > 0
      ? (state.enemyShields / state.enemyMaxShields) * 100 : 0;
    const hullPct = state.enemyMaxHull > 0
      ? (state.enemyHull / state.enemyMaxHull) * 100 : 0;

    const shieldBar = this.healthBarEl.querySelector('.ehb-shield');
    const hullBar = this.healthBarEl.querySelector('.ehb-hull');
    if (shieldBar) shieldBar.style.width = shieldPct + '%';
    if (hullBar) hullBar.style.width = hullPct + '%';
  }

  // ─── Remove enemy 3D model ────────────────────────────────────────────────
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
  }

  // ─── Fire phasers ─────────────────────────────────────────────────────────
  firePhasers() {
    const state = this.gameState.getState();
    const cost = 15;
    if (state.energy < cost) {
      this.onEvent('⚡ Insufficient energy for phasers!', 'combat');
      return;
    }

    const baseDmg = 12 + state.weaponUpgrade * 3;
    const accuracy = 0.7 + state.sensorUpgrade * 0.05;
    const hit = Math.random() < accuracy;

    this.gameState.update({ energy: state.energy - cost });

    if (hit) {
      const dmg = baseDmg + Math.floor(Math.random() * 6);
      this.dealDamageToEnemy(dmg);
      this.onEvent(`⚡ Phaser strike! ${dmg} damage dealt.`, 'combat');

      const from = this.ship.getWorldPosition();
      const to = this.getEnemyWorldPos();
      this.particles.createPhaserBeam(from, to, 0xff6600);
    } else {
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

    const baseDmg = 25 + state.weaponUpgrade * 5;
    const accuracy = 0.6 + state.sensorUpgrade * 0.05;
    const hit = Math.random() < accuracy;

    if (hit) {
      const dmg = baseDmg + Math.floor(Math.random() * 10);
      this.dealDamageToEnemy(dmg);
      this.onEvent(`💥 Torpedo impact! ${dmg} damage dealt!`, 'combat');

      const from = this.ship.getWorldPosition();
      const to = this.getEnemyWorldPos();
      this.particles.createTorpedo(from, to, 0xff4400);
    } else {
      this.onEvent('💥 Torpedo missed!', 'combat');
    }
  }

  // ─── Evasive maneuvers (UNCHANGED) ────────────────────────────────────────
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

  // ─── Redistribute shields (UNCHANGED) ─────────────────────────────────────
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

  // ─── Deal damage to enemy (UNCHANGED) ─────────────────────────────────────
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
      if (newHull <= 0) this.enemyDestroyed();
    }
  }

  // ─── Enemy attack — fires FROM enemy position ────────────────────────────
  enemyAttack() {
    if (!this.currentEnemy) return;
    const state = this.gameState.getState();
    const enemy = this.currentEnemy;

    // Trigger attack rush toward player
    this.rushTimer = 0.6;

    const hit = Math.random() < enemy.accuracy;

    // Visual: enemy fires weapon toward player
    const enemyPos = this.getEnemyWorldPos();
    const playerPos = this.ship.getWorldPosition();
    const weaponColor = getWeaponColor(this.enemyKey || 'kazon');

    if (enemy.damage >= 20) {
      // Heavy enemies fire torpedo-like projectiles
      this.particles.createTorpedo(enemyPos, playerPos, weaponColor, 60);
    } else {
      this.particles.createPhaserBeam(enemyPos, playerPos, weaponColor, 0.4);
    }

    if (!hit) {
      this.onEvent(`${enemy.name} fires — missed!`, 'combat');
      return;
    }

    let dmg = enemy.damage + Math.floor(Math.random() * (enemy.damage * 0.3));

    if (state.shieldsActive && state.shields > 0) {
      const absorbed = Math.min(state.shields, Math.floor(dmg * 0.7));
      dmg -= absorbed;
      this.gameState.update({ shields: state.shields - absorbed });
      this.ship.flashShield(0.4);
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

  // ─── Enemy destroyed — explosion at 3D position, delayed cleanup ─────────
  enemyDestroyed() {
    if (!this.currentEnemy) return;
    const enemy = this.currentEnemy;
    const state = this.gameState.getState();

    this.onEvent(`🎯 ${enemy.name} destroyed!`, 'success');

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

    // Big explosion at enemy 3D position
    const pos = this.getEnemyWorldPos();
    this.particles.createExplosion(pos, 0xff6600, 2.5);
    this.particles.createExplosion(pos.clone().add(new THREE.Vector3(3, 2, -2)), 0xffaa00, 1.5);

    // Hide model immediately
    if (this.enemyModel) this.enemyModel.visible = false;

    // Delayed end-combat so player sees the explosion
    this.destroyCleanupTimer = 2.0;
    this._destroyChanges = changes;
  }

  // ─── Player destroyed (UNCHANGED) ────────────────────────────────────────
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
      // Delayed cleanup — let player see the flee animation
      this.destroyCleanupTimer = 2.0;
      this._destroyChanges = {};
      return true;
    } else {
      this.onEvent('🚫 Unable to escape! Enemy is pursuing.', 'combat');
      this.enemyAttack();
      return false;
    }
  }

  // ─── End combat — cleanup model + health bar ─────────────────────────────
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

  // ─── Per-frame update — enemy AI movement, health bar, animations ────────
  update(delta) {
    if (!this.gameState.getState().inCombat || !this.currentEnemy) return;
    this.combatTimer += delta;

    // Delayed cleanup after enemy destroyed or flee
    if (this.destroyCleanupTimer >= 0) {
      this.destroyCleanupTimer -= delta;
      // While fleeing, accelerate enemy away
      if (this.fleeing && this.enemyModel) {
        this.fleeSpeed += delta * 120;
        const away = new THREE.Vector3()
          .subVectors(this.enemyModel.position, this.ship.getWorldPosition())
          .normalize();
        this.enemyModel.position.addScaledVector(away, this.fleeSpeed * delta);
        // Fade model
        this.enemyModel.traverse((c) => {
          if (c.isMesh && c.material && c.material.transparent !== undefined) {
            c.material.opacity = Math.max(0, (c.material.opacity || 1) - delta * 0.8);
          }
        });
      }
      // Update health bar even during cleanup
      this.updateHealthBar();

      if (this.destroyCleanupTimer < 0) {
        this.endCombat(this._destroyChanges || {});
      }
      return;
    }

    // ── Enemy AI orbit movement ──
    if (this.enemyModel && this.behavior) {
      const shipPos = this.ship.getWorldPosition();
      const b = this.behavior;

      // Advance orbit angle
      let speed = b.orbitSpeed;
      if (b.erratic) speed += Math.sin(this.combatTimer * 2.5) * 0.3;
      this.orbitAngle += delta * speed;

      // Periodically change orbit radius and height
      if (Math.random() < delta * 0.3) {
        this.orbitRadiusTarget = 40 + Math.random() * 20;
        this.orbitHeightTarget = (Math.random() - 0.5) * 25;
      }

      // Attack rush: briefly close distance
      if (this.rushTimer > 0) {
        this.rushTimer -= delta;
        this.orbitRadiusTarget = 25;
      }

      // Smooth lerp radius/height
      this.orbitRadius = THREE.MathUtils.lerp(this.orbitRadius, this.orbitRadiusTarget, delta * 2);
      this.orbitHeight = THREE.MathUtils.lerp(this.orbitHeight, this.orbitHeightTarget, delta * 1.5);

      // Swooping: hirogen-style vertical oscillation
      let heightOffset = 0;
      if (b.swooping) {
        heightOffset = Math.sin(this.combatTimer * 1.2) * 15;
      }

      // Compute target position
      const tx = shipPos.x + Math.sin(this.orbitAngle) * this.orbitRadius;
      const ty = shipPos.y + this.orbitHeight + heightOffset;
      const tz = shipPos.z + Math.cos(this.orbitAngle) * this.orbitRadius;

      // Smooth position
      this.enemyModel.position.x = THREE.MathUtils.lerp(this.enemyModel.position.x, tx, delta * 3);
      this.enemyModel.position.y = THREE.MathUtils.lerp(this.enemyModel.position.y, ty, delta * 3);
      this.enemyModel.position.z = THREE.MathUtils.lerp(this.enemyModel.position.z, tz, delta * 3);

      // Face the player
      this.enemyModel.lookAt(shipPos);

      // Animate model-specific effects
      this.animateEnemyModel(delta);
    }

    // ── Health bar projection ──
    this.updateHealthBar();

    // ── Enemy attacks on interval ──
    const interval = this.enemyAttackInterval - (this.currentEnemy.damage > 20 ? 0.5 : 0);
    if (this.combatTimer - this.lastEnemyAttack >= interval) {
      this.lastEnemyAttack = this.combatTimer;
      this.enemyAttack();
    }
  }

  // ─── Animate per-type model effects (ring spin, core pulse, etc.) ────────
  animateEnemyModel(delta) {
    if (!this.enemyModel) return;

    // Krenim temporal ring rotation
    const ring = this.enemyModel.userData.temporalRing;
    if (ring) ring.rotation.z += delta * 2;

    // Krenim energy core pulse
    const core = this.enemyModel.userData.energyCore;
    if (core) {
      const pulse = 0.6 + Math.sin(this.combatTimer * 4) * 0.35;
      core.material.opacity = pulse;
      core.scale.setScalar(0.9 + Math.sin(this.combatTimer * 3) * 0.15);
    }
  }
}
