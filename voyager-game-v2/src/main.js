import './ui/styles.css';
import { Engine } from './engine/Engine.js';
import { Starfield } from './engine/Starfield.js';
import { ParticleSystem } from './engine/ParticleSystem.js';
import { WarpTunnel } from './engine/WarpTunnel.js';
import { CollisionSystem } from './engine/CollisionSystem.js';
import { SoundManager } from './engine/SoundManager.js';
import { Ship } from './game/Ship.js';
import { AutoPilot } from './game/AutoPilot.js';
import { Environment } from './game/Environment.js';
import { GameState } from './game/GameState.js';
import { SectorMap } from './game/SectorMap.js';
import { CombatSystem } from './game/CombatSystem.js';
import { EventSystem } from './game/EventSystem.js';
import { InteractionSystem } from './game/InteractionSystem.js';
import { StoryEngine, CHAPTERS } from './story/StoryEngine.js';
import { UIManager } from './ui/UIManager.js';
import * as THREE from 'three';

class VoyagerGame {
  constructor() {
    this.showTitleScreen();
  }

  showTitleScreen() {
    const screen = document.createElement('div');
    screen.className = 'title-screen';
    screen.id = 'title-screen';
    screen.innerHTML = `
      <h1>STAR TREK VOYAGER</h1>
      <div class="subtitle">Journey Home — Definitive Edition</div>
      <button class="start-btn" id="start-btn">⟐ ENGAGE ⟐</button>
      <button class="start-btn" id="continue-btn" style="margin-top:10px;font-size:0.8rem;padding:10px 40px;opacity:0.6;display:none">CONTINUE JOURNEY</button>
      <div class="title-version">Delta Quadrant Edition v3.0 • 10-Chapter Story • Branching Choices</div>
    `;
    document.body.appendChild(screen);

    // Check for save
    const hasSave = localStorage.getItem('voyager-v2-save');
    if (hasSave) {
      const contBtn = document.getElementById('continue-btn');
      contBtn.style.display = '';
      contBtn.onclick = () => {
        screen.remove();
        this.startGame(true);
      };
    }

    document.getElementById('start-btn').onclick = () => {
      screen.remove();
      this.startGame(false);
    };
  }

  async startGame(loadSave) {
    // Initialize engine
    this.engine = new Engine('game-container');

    // Starfield
    this.starfield = new Starfield(this.engine.scene);
    this.engine.addUpdatable(this.starfield);

    // Particles
    this.particles = new ParticleSystem(this.engine.scene);
    this.engine.addUpdatable(this.particles);

    // Ship (now with WASD flight controls)
    this.ship = new Ship(this.engine.scene);
    this.engine.addUpdatable(this.ship);

    // Warp tunnel effect
    this.warpTunnel = new WarpTunnel(this.engine.scene);

    // Collision system
    this.collisionSystem = new CollisionSystem();

    // Auto-pilot
    this.autoPilot = new AutoPilot(this.ship);

    // Environment
    this.environment = new Environment(this.engine.scene, this.collisionSystem);
    this.engine.addUpdatable(this.environment);

    // Game state
    this.gameState = new GameState();

    // Event logger function
    const onEvent = (msg, type) => {
      this.ui?.logEvent(msg, type);
    };

    // Sector map
    this.sectorMap = new SectorMap(this.gameState, onEvent);

    // Story engine
    this.storyEngine = new StoryEngine(this.gameState, onEvent);

    // Sound manager
    this.sound = new SoundManager();

    // Combat system
    this.combat = new CombatSystem(this.gameState, this.particles, this.ship, this.engine.scene, this.engine.camera, onEvent);
    this.combat.soundManager = this.sound;

    // Event system
    this.events = new EventSystem(this.gameState, this.sectorMap, this.combat, onEvent);

    // UI
    this.ui = new UIManager(this.gameState, this.sectorMap, this.storyEngine);
    this.ui.soundManager = this.sound;

    // v2: let random events open choice dialogs through the UI
    this.events.showDialog = (sequence) => this.ui.showDialog(sequence);

    // Resume AudioContext on first user interaction
    const resumeAudio = () => {
      this.sound.ensureResumed();
      window.removeEventListener('click', resumeAudio);
      window.removeEventListener('keydown', resumeAudio);
    };
    window.addEventListener('click', resumeAudio);
    window.addEventListener('keydown', resumeAudio);

    // ESC key for pause, T key for waypoint
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.ui.togglePause();
      }
      if (e.key === 't' || e.key === 'T') {
        const closest = this.collisionSystem.getClosestInteractable(this.ship.mesh.position, 200);
        if (closest) {
          const name = closest.data.name || closest.type;
          this.autoPilot.setWaypoint(closest.worldPosition, name);
          this.ui.showWaypointSet(name);
        }
      }
    });

    // Pause toggle callback
    this.ui.onPauseToggle = (paused) => {
      if (paused) {
        this.engine.pause();
        this.sound.stopAll();
      } else {
        this.engine.resume();
      }
    };

    // Interaction system
    this.interaction = new InteractionSystem(
      this.collisionSystem, this.gameState, this.ui, this.events,
      this.particles, this.ship, onEvent
    );

    // Wire up UI callbacks
    this.ui.onWarpRequest = (targetId) => this.warpToSystem(targetId);
    this.ui.onFirePhasers = () => { this.sound.play('phaserFire'); this.combat.firePhasers(); };
    this.ui.onFireTorpedoes = () => { this.sound.play('torpedoLaunch'); this.combat.fireTorpedoes(); };
    this.ui.onEvasive = () => { this.sound.play('uiClick'); this.combat.evasiveManeuvers(); };
    this.ui.onRedistributeShields = () => { this.sound.play('shieldHit'); this.combat.redistributeShields(); };
    this.ui.onFlee = () => { this.sound.play('uiClick'); this.combat.flee(); };

    // Interact on click for proximity labels
    this.ui.onWaypointClick = (obj) => {
      this.interaction.interactWithTarget(obj);
    };

    // Camera shake state
    const cameraShake = new THREE.Vector3();
    const normalFOV = 60;
    const warpFOV = 120;

    // Controls hint
    const hint = document.createElement('div');
    hint.className = 'controls-hint';
    hint.innerHTML = 'W/S — Thrust &nbsp;|&nbsp; A/D — Yaw &nbsp;|&nbsp; ↑/↓ — Pitch &nbsp;|&nbsp; SHIFT — Warp &nbsp;|&nbsp; CTRL — Flyby Cam &nbsp;|&nbsp; F — Interact &nbsp;|&nbsp; T — Waypoint &nbsp;|&nbsp; M — Map &nbsp;|&nbsp; I — Shipyard &nbsp;|&nbsp; ESC — Pause';
    document.getElementById('ui-layer').appendChild(hint);

    // Sound state tracking
    this._engineLoopStop = null;
    this._warpLoopStop = null;
    this._klaxonLoopStop = null;
    this._warpAmbientStop = null;
    this._lastAlertStatus = 'none';
    this._lastWarpState = false;
    this._lastJumpPhaseSound = 'idle';

    // Main game loop updatable — camera follow, combat tick, warp tunnel, shake
    this.engine.addUpdatable({
      update: (elapsed, delta) => {
        if (!delta) return;

        // Combat tick
        this.combat.update(delta);

        // Interaction system tick
        this.interaction.update(delta);

        // Collision detection
        const shipSpeed = Math.abs(this.ship.currentSpeed);
        const collisionResults = this.collisionSystem.update(this.ship.mesh.position, 8, delta, shipSpeed);
        for (const result of collisionResults) {
          if (result.damage > 0) {
            const s = this.gameState.getState();
            this.gameState.update({ hull: s.hull - result.damage });
          }
          if (result.bounce) {
            this.ship.mesh.position.add(result.bounce);
          }
          if (result.pushBack) {
            this.ship.mesh.position.add(result.pushBack);
          }
          if (result.energyDrain) {
            const s = this.gameState.getState();
            this.gameState.update({ energy: s.energy - result.energyDrain });
          }
          if (result.energyBoost) {
            const s = this.gameState.getState();
            this.gameState.update({ energy: Math.min(s.maxEnergy, s.energy + result.energyBoost) });
          }
          if (result.shieldDrain) {
            const s = this.gameState.getState();
            if (s.shields > 0) {
              this.gameState.update({ shields: Math.max(0, s.shields - result.shieldDrain) });
            } else if (result.hullDrainIfNoShields) {
              this.gameState.update({ hull: s.hull - result.hullDrainIfNoShields });
            }
          }
          if (result.gravityPull) {
            const pull = result.gravityPull.clone().multiplyScalar(delta);
            this.ship.mesh.position.add(pull);
          }
          if (result.torque) {
            this.ship.mesh.rotation.x += result.torque.x * delta;
            this.ship.mesh.rotation.y += result.torque.y * delta;
          }
          if (result.sparks && result.sparkPosition) {
            this.particles.emit({
              position: result.sparkPosition,
              count: 20,
              color: 0xff8833,
              speed: 8,
              spread: 2,
              life: 0.5,
              size: 1.2,
            });
          }
        }

        // Hull status — critical/emergency/game over
        const hullState = this.gameState.getState();
        this.ui.updateHullStatus(hullState.hull, hullState.maxHull);
        if (hullState.hull <= 0) {
          // Game over — stop processing
          return;
        }
        if (hullState.hull / hullState.maxHull < 0.10) {
          this.ship.speedMultiplier = 0.6;
        } else {
          this.ship.speedMultiplier = 1.0;
        }

        // Auto-pilot: cancel on WASD, update, and refresh indicator
        const keys = this.ship.keys;
        if (this.autoPilot.active && (keys.w || keys.a || keys.s || keys.d)) {
          this.autoPilot.cancel();
        }
        this.autoPilot.update(delta);
        if (this.autoPilot.active && this.autoPilot.target) {
          const dist = this.ship.mesh.position.distanceTo(this.autoPilot.target);
          this.ui.updateWaypointIndicator(true, this.autoPilot.targetName, dist);
        } else {
          this.ui.updateWaypointIndicator(false, '', 0);
        }

        // Proximity labels
        const nearby = this.collisionSystem.getNearbyObjects(this.ship.mesh.position, 150);
        this.ui.updateProximityLabels(nearby, this.ship.mesh.position, this.engine.camera);

        // ── Sound management ──
        const currentState = this.gameState.getState();

        // Engine idle / warp sound removed per user request
        this._lastWarpState = this.ship.isWarping;

        // Alert klaxon
        const alertStatus = currentState.alertStatus;
        if (alertStatus === 'red' && this._lastAlertStatus !== 'red') {
          this._klaxonLoopStop = this.sound.loop('alertKlaxon');
        } else if (alertStatus !== 'red' && this._lastAlertStatus === 'red') {
          if (this._klaxonLoopStop) { this._klaxonLoopStop(); this._klaxonLoopStop = null; }
        }
        this._lastAlertStatus = alertStatus;

        // Get jump phase from UI
        const jumpPhase = this.ui.getJumpPhase();

        // ── Warp tunnel ──
        this.warpTunnel.update(
          elapsed, delta,
          this.ship.mesh.position,
          this.ship.mesh.quaternion,
          jumpPhase,
          this.ship.isWarping
        );

        // ── Starfield warp mode ──
        this.starfield.setWarpMode(this.ship.isWarping || jumpPhase !== 'idle');

        // ── Dynamic FOV ──
        const jumpFovBoost = jumpPhase === 'spore' ? 8 : jumpPhase === 'displace' ? 20 : 0;
        const targetFOV = (this.ship.isWarping ? warpFOV : normalFOV) + jumpFovBoost;
        this.engine.camera.fov = THREE.MathUtils.lerp(this.engine.camera.fov, targetFOV, delta * 5);
        this.engine.camera.updateProjectionMatrix();

        // ── Camera shake ──
        let shakeIntensity = 0;
        if (jumpPhase === 'black-alert') shakeIntensity = 0.12;
        if (jumpPhase === 'spore') shakeIntensity = 0.22;
        if (jumpPhase === 'displace') shakeIntensity = 0.52;

        // Remove previous shake offset
        this.engine.camera.position.sub(cameraShake);

        if (shakeIntensity > 0) {
          cameraShake.set(
            (Math.random() - 0.5) * shakeIntensity,
            (Math.random() - 0.5) * shakeIntensity,
            (Math.random() - 0.5) * shakeIntensity * 0.7
          );
        } else {
          cameraShake.set(0, 0, 0);
        }

        // ── Camera mode ──
        // Ctrl during warp = cinematic flyby
        // During jump sequence = locked follow
        // Otherwise = free mouse orbit/zoom (OrbitControls)
        const flyby = this.ship.keys.Control && this.ship.isWarping;
        const jumping = jumpPhase !== 'idle';

        if (flyby) {
          this._wasLocked = true;
          this.engine.flybyCamera(this.ship.mesh.position, this.ship.mesh.quaternion, elapsed, delta);
        } else if (jumping) {
          this._wasLocked = true;
          const camLerp = 2;
          this.engine.followTarget(this.ship.mesh.position, this.ship.mesh.quaternion, delta, camLerp);
        } else {
          // Free mouse camera — OrbitControls orbits around the ship
          if (this._wasLocked) {
            this.engine.resyncControls(this.ship.mesh.position);
            this._wasLocked = false;
          }
          this.engine.updateFreeCamera(this.ship.mesh.position);

          // Warp mode: WASD orbits the camera for flyby feel
          if (this.ship.isWarping) {
            const orbitSpeed = 1.5;
            if (this.ship.keys.a) this.engine.controls.rotateLeft(orbitSpeed * delta);
            if (this.ship.keys.d) this.engine.controls.rotateLeft(-orbitSpeed * delta);
            if (this.ship.keys.w) this.engine.controls.rotateUp(orbitSpeed * delta);
            if (this.ship.keys.s) this.engine.controls.rotateUp(-orbitSpeed * delta);
          }
        }

        // Apply shake on top
        this.engine.camera.position.add(cameraShake);

        // ── Displacement pulse trigger ──
        if (jumpPhase === 'displace' && this._lastJumpPhase !== 'displace') {
          this.ship.triggerDisplacementPulse(0.95);
        }
        this._lastJumpPhase = jumpPhase;

        // ── Bloom during warp ──
        const bloomTarget = this.ship.isWarping ? 1.0 : (jumpPhase !== 'idle' ? 1.2 : 0.6);
        this.engine.bloomPass.strength = THREE.MathUtils.lerp(this.engine.bloomPass.strength, bloomTarget, delta * 3);

        // ── Jump phase sounds ──
        if (jumpPhase === 'black-alert' && this._lastJumpPhaseSound !== 'black-alert') {
          this._warpAmbientStop = this.sound.loop('warpTunnelAmbient');
        } else if (jumpPhase === 'idle' && this._lastJumpPhaseSound !== 'idle') {
          if (this._warpAmbientStop) { this._warpAmbientStop(); this._warpAmbientStop = null; }
        }
        this._lastJumpPhaseSound = jumpPhase;

        // ── Radar update ──
        const radarObjects = nearby.map(obj => ({
          position: obj.position || obj.mesh?.position || { x: 0, z: 0 },
          type: obj.type || 'asteroid',
        }));
        const enemyPos = currentState.inCombat
          ? this.ship.mesh.position.clone().add(new THREE.Vector3(0, 0, -40))
          : null;
        this.ui.updateRadar(
          this.ship.mesh.position,
          this.ship.mesh.quaternion,
          radarObjects,
          enemyPos
        );

        // ── Auto-save periodically ──
        this.saveTimer = (this.saveTimer || 0) + delta;
        if (this.saveTimer > 30) {
          this.saveTimer = 0;
          this.gameState.save();
        }
      },
    });

    // Load or new game
    if (loadSave) {
      this.gameState.load();
      const state = this.gameState.getState();
      const system = this.sectorMap.systems[state.currentSystemId];
      this.environment.generateSystem(system);
      this.ui.logEvent(`Captain's Log, Stardate ${this.gameState.getStardate()}: Resuming our journey.`, 'story');
    } else {
      // New game — show first chapter cinematic
      const chapter = CHAPTERS[0];
      await this.ui.showCinematic(chapter);
      const dialog = this.storyEngine.resolveDialog(chapter);
      if (dialog) {
        await this.ui.showDialog(dialog);
      }

      // Generate starting system
      const startSystem = this.sectorMap.systems[0];
      this.environment.generateSystem(startSystem);
      this.ui.logEvent(`Captain's Log, Stardate 48315.6: Journey begins in the Delta Quadrant.`, 'story');
      this.ui.logEvent(`📍 Current system: ${startSystem.name}. ${startSystem.desc}`, 'story');
      this.ui.logEvent('WASD to fly · SHIFT for warp · M for sector map · I for shipyard', 'story');
    }

    // Position camera behind the ship
    this.engine.camera.position.set(0, 12, 40);

    // Engine idle sound disabled
  }

  async warpToSystem(targetId) {
    const check = this.sectorMap.canWarpTo(targetId);
    if (!check.ok) {
      this.ui.logEvent(check.reason, 'combat');
      return;
    }

    const target = this.sectorMap.systems[targetId];
    this.ui.logEvent(`🚀 Engaging spore drive to ${target.name}...`, 'story');
    this.sound.play('uiClick');
    this.autoPilot.cancel();

    // Force warp visuals on ship
    this.ship.setForcedWarpMode(true);
    this.ship.pulseShield();

    // Run the full Black Alert → Spore → Displacement sequence
    await this.ui.showWarpEffect(target.name);

    // Actually warp
    this.sectorMap.warpTo(targetId);

    // Generate new system environment
    this.environment.generateSystem(target);

    // Reset ship position for new system
    this.ship.mesh.position.set(0, 0, 0);
    this.ship.mesh.rotation.set(0, 0, 0);
    this.ship.currentSpeed = 0;

    // End warp
    this.ship.setForcedWarpMode(false);

    // Check for chapter trigger
    const chapter = this.storyEngine.checkChapterTrigger(targetId);
    if (chapter) {
      await this.ui.showCinematic(chapter);
      const dialog = this.storyEngine.resolveDialog(chapter);
      if (dialog) {
        await this.ui.showDialog(dialog);
      }
    }

    // Trigger arrival events
    this.events.triggerArrivalEvents(target);

    // Check for victory
    if (targetId === 34) {
      setTimeout(() => this.ui.showVictory(), 2000);
    }

    // Shield regen on warp
    const state = this.gameState.getState();
    const shieldRegen = 5 + state.shieldUpgrade * 2;
    this.gameState.update({
      shields: Math.min(state.maxShields, state.shields + shieldRegen),
      energy: Math.min(state.maxEnergy, state.energy + 8),
    });

    this.ui.showNotification(`Arrived: ${target.name}`);
    this.sound.play('dockingSound');
  }
}

// Start the game
new VoyagerGame();
