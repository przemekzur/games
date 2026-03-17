import { Engine } from './engine/Engine.js';
import { Starfield } from './engine/Starfield.js';
import { ParticleSystem } from './engine/ParticleSystem.js';
import { WarpTunnel } from './engine/WarpTunnel.js';
import { Ship } from './game/Ship.js';
import { Environment } from './game/Environment.js';
import { GameState } from './game/GameState.js';
import { SectorMap } from './game/SectorMap.js';
import { CombatSystem } from './game/CombatSystem.js';
import { EventSystem } from './game/EventSystem.js';
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
      <div class="subtitle">Journey Home</div>
      <button class="start-btn" id="start-btn">⟐ ENGAGE ⟐</button>
      <button class="start-btn" id="continue-btn" style="margin-top:10px;font-size:0.8rem;padding:10px 40px;opacity:0.6;display:none">CONTINUE JOURNEY</button>
      <div class="title-version">Delta Quadrant Edition v2.0 • Three.js Engine</div>
    `;
    document.body.appendChild(screen);

    // Check for save
    const hasSave = localStorage.getItem('voyager-save');
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

    // Environment
    this.environment = new Environment(this.engine.scene);
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

    // Combat system
    this.combat = new CombatSystem(this.gameState, this.particles, this.ship, onEvent);

    // Event system
    this.events = new EventSystem(this.gameState, this.sectorMap, this.combat, onEvent);

    // UI
    this.ui = new UIManager(this.gameState, this.sectorMap, this.storyEngine);

    // Wire up UI callbacks
    this.ui.onWarpRequest = (targetId) => this.warpToSystem(targetId);
    this.ui.onFirePhasers = () => this.combat.firePhasers();
    this.ui.onFireTorpedoes = () => this.combat.fireTorpedoes();
    this.ui.onEvasive = () => this.combat.evasiveManeuvers();
    this.ui.onRedistributeShields = () => this.combat.redistributeShields();
    this.ui.onFlee = () => this.combat.flee();

    // Camera shake state
    const cameraShake = new THREE.Vector3();
    const normalFOV = 60;
    const warpFOV = 120;

    // Controls hint
    const hint = document.createElement('div');
    hint.className = 'controls-hint';
    hint.innerHTML = 'W/S — Thrust &nbsp;|&nbsp; A/D — Yaw &nbsp;|&nbsp; ↑/↓ — Pitch &nbsp;|&nbsp; SHIFT — Warp &nbsp;|&nbsp; M — Map &nbsp;|&nbsp; I — Shipyard';
    document.getElementById('ui-layer').appendChild(hint);

    // Main game loop updatable — camera follow, combat tick, warp tunnel, shake
    this.engine.addUpdatable({
      update: (elapsed, delta) => {
        if (!delta) return;

        // Combat tick
        this.combat.update(delta);

        // Get jump phase from UI
        const jumpPhase = this.ui.getJumpPhase();

        // ── Warp tunnel ──
        this.warpTunnel.update(
          elapsed, delta,
          this.ship.mesh.position,
          this.ship.mesh.quaternion,
          jumpPhase
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

        // ── Camera follows ship ──
        this.engine.controls.target.copy(this.ship.mesh.position);

        // Apply shake
        this.engine.camera.position.add(cameraShake);

        // ── Displacement pulse trigger ──
        if (jumpPhase === 'displace' && this._lastJumpPhase !== 'displace') {
          this.ship.triggerDisplacementPulse(0.95);
        }
        this._lastJumpPhase = jumpPhase;

        // ── Bloom during warp ──
        const bloomTarget = this.ship.isWarping ? 1.0 : (jumpPhase !== 'idle' ? 1.2 : 0.6);
        this.engine.bloomPass.strength = THREE.MathUtils.lerp(this.engine.bloomPass.strength, bloomTarget, delta * 3);

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
      if (chapter.dialogSequence) {
        await this.ui.showDialog(chapter.dialogSequence);
      }

      // Generate starting system
      const startSystem = this.sectorMap.systems[0];
      this.environment.generateSystem(startSystem);
      this.ui.logEvent(`Captain's Log, Stardate 48315.6: Journey begins in the Delta Quadrant.`, 'story');
      this.ui.logEvent(`📍 Current system: ${startSystem.name}. ${startSystem.desc}`, 'story');
      this.ui.logEvent('WASD to fly · SHIFT for warp · M for sector map · I for shipyard', 'story');
    }

    // Position camera behind the ship
    this.engine.camera.position.set(0, 15, 50);
    this.engine.controls.target.copy(this.ship.mesh.position);
  }

  async warpToSystem(targetId) {
    const check = this.sectorMap.canWarpTo(targetId);
    if (!check.ok) {
      this.ui.logEvent(check.reason, 'combat');
      return;
    }

    const target = this.sectorMap.systems[targetId];
    this.ui.logEvent(`🚀 Engaging spore drive to ${target.name}...`, 'story');

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
    this.engine.camera.position.set(0, 15, 50);

    // End warp
    this.ship.setForcedWarpMode(false);

    // Check for chapter trigger
    const chapter = this.storyEngine.checkChapterTrigger(targetId);
    if (chapter) {
      await this.ui.showCinematic(chapter);
      if (chapter.dialogSequence) {
        await this.ui.showDialog(chapter.dialogSequence);
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
      energy: Math.min(state.maxEnergy, state.energy + 15),
    });

    this.ui.showNotification(`Arrived: ${target.name}`);
  }
}

// Start the game
new VoyagerGame();
