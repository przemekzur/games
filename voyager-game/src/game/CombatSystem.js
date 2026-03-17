// Combat system with enemy AI, weapons, and tactical choices
export class CombatSystem {
  constructor(gameState, particles, ship, onEvent) {
    this.gameState = gameState;
    this.particles = particles;
    this.ship = ship;
    this.onEvent = onEvent;
    this.combatTimer = 0;
    this.enemyAttackInterval = 3;
    this.lastEnemyAttack = 0;
  }

  // Enemy templates
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

    // Higher threat = pick stronger enemies
    const idx = Math.min(pool.length - 1, Math.floor(threat * pool.length));
    const key = pool[idx];
    return { ...CombatSystem.ENEMIES[key] };
  }

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
    this.onEvent(`🔴 RED ALERT! ${enemy.name} detected! ${enemy.description}`, 'combat');
  }

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

      // Visual
      const from = this.ship.getWorldPosition();
      const to = from.clone().add(new THREE.Vector3(0, 0, -40));
      this.particles.createPhaserBeam(from, to, 0xff6600);
    } else {
      this.onEvent('⚡ Phasers missed the target!', 'combat');
    }
  }

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
      const to = from.clone().add(new THREE.Vector3(0, 0, -45));
      this.particles.createTorpedo(from, to, 0xff4400);
    } else {
      this.onEvent('💥 Torpedo missed!', 'combat');
    }
  }

  evasiveManeuvers() {
    const state = this.gameState.getState();
    const cost = 25;
    if (state.energy < cost) {
      this.onEvent('⚡ Not enough energy for evasive maneuvers!', 'combat');
      return;
    }

    this.gameState.update({ energy: state.energy - cost });
    this.lastEnemyAttack = this.combatTimer; // Reset enemy attack timer
    this.onEvent('🔄 Evasive maneuvers! Enemy attack window reset.', 'combat');
  }

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

  dealDamageToEnemy(dmg) {
    const state = this.gameState.getState();
    let remaining = dmg;

    // Shields absorb first
    if (state.enemyShields > 0) {
      const absorbed = Math.min(state.enemyShields, remaining);
      remaining -= absorbed;
      this.gameState.update({ enemyShields: state.enemyShields - absorbed });
    }

    // Hull damage
    if (remaining > 0) {
      const newHull = Math.max(0, state.enemyHull - remaining);
      this.gameState.update({ enemyHull: newHull });
      if (newHull <= 0) this.enemyDestroyed();
    }
  }

  enemyAttack() {
    if (!this.currentEnemy) return;
    const state = this.gameState.getState();
    const enemy = this.currentEnemy;

    const hit = Math.random() < enemy.accuracy;
    if (!hit) {
      this.onEvent(`${enemy.name} fires — missed!`, 'combat');
      return;
    }

    let dmg = enemy.damage + Math.floor(Math.random() * (enemy.damage * 0.3));

    // Shields absorb
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

      // Screen shake
      document.getElementById('game-container')?.classList.add('screen-shake');
      setTimeout(() => document.getElementById('game-container')?.classList.remove('screen-shake'), 300);

      // Impact particles
      const pos = this.ship.getWorldPosition();
      this.particles.createShieldImpact(
        pos.clone().add(new THREE.Vector3(0, 0, -15)),
        pos,
        state.shieldsActive ? 0x3399ff : 0xff4400
      );
    }

    // Check for destruction
    if (this.gameState.getState().hull <= 0) {
      this.playerDestroyed();
    }
  }

  enemyDestroyed() {
    if (!this.currentEnemy) return;
    const enemy = this.currentEnemy;
    const state = this.gameState.getState();

    this.onEvent(`🎯 ${enemy.name} destroyed!`, 'success');

    // Award resources
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

    // Victory explosion
    const pos = this.ship.getWorldPosition().add(new THREE.Vector3(0, 0, -40));
    this.particles.createExplosion(pos, 0xff6600, 2);

    this.endCombat(changes);
  }

  playerDestroyed() {
    this.onEvent('💀 Voyager has been destroyed. The journey ends here.', 'combat');
    this.endCombat({});
    // Could trigger game over screen
  }

  flee() {
    const state = this.gameState.getState();
    const fleeChance = 0.5 + state.engineUpgrade * 0.1;
    if (Math.random() < fleeChance) {
      this.onEvent('🚀 Warp engines engaged! Escaped from combat.', 'success');
      this.endCombat({});
      return true;
    } else {
      this.onEvent('🚫 Unable to escape! Enemy is pursuing.', 'combat');
      this.enemyAttack(); // Punishment for failed flee
      return false;
    }
  }

  endCombat(extraChanges = {}) {
    this.gameState.update({
      ...extraChanges,
      inCombat: false,
      alertStatus: 'none',
      enemyName: '',
      enemyHull: 0, enemyShields: 0,
    });
    this.currentEnemy = null;
  }

  update(delta) {
    if (!this.gameState.getState().inCombat || !this.currentEnemy) return;
    this.combatTimer += delta;

    // Enemy attacks on interval
    const interval = this.enemyAttackInterval - (this.currentEnemy.damage > 20 ? 0.5 : 0);
    if (this.combatTimer - this.lastEnemyAttack >= interval) {
      this.lastEnemyAttack = this.combatTimer;
      this.enemyAttack();
    }
  }
}

// Need THREE for particle positions
import * as THREE from 'three';
