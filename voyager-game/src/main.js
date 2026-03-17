import { Engine } from './engine/Engine.js';
import { Starfield } from './engine/Starfield.js';
import { ParticleSystem } from './engine/ParticleSystem.js';
import { Ship } from './game/Ship.js';
import { Environment } from './game/Environment.js';
import { GameState } from './game/GameState.js';
import { SectorMap } from './game/SectorMap.js';
import { CombatSystem } from './game/CombatSystem.js';
import { EventSystem } from './game/EventSystem.js';
import { StoryEngine, CHAPTERS } from './story/StoryEngine.js';
import { UIManager } from './ui/UIManager.js';

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

    // Ship
    this.ship = new Ship(this.engine.scene);
    this.engine.addUpdatable(this.ship);

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

    // Camera follow
    this.engine.addUpdatable({
      update: (elapsed, delta) => {
        if (!delta) return;
        this.combat.update(delta);

        // Camera follows ship
        const shipPos = this.ship.mesh.position;
        this.engine.controls.target.lerp(shipPos, delta * 3);

        // Auto-save periodically
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
      this.ui.logEvent('Press M to open the sector map. Click a connected system to warp.', 'story');
      this.ui.logEvent('Press I to open the shipyard for upgrades.', 'story');
    }
  }

  async warpToSystem(targetId) {
    const check = this.sectorMap.canWarpTo(targetId);
    if (!check.ok) {
      this.ui.logEvent(check.reason, 'combat');
      return;
    }

    const target = this.sectorMap.systems[targetId];
    this.ui.logEvent(`🚀 Engaging warp drive to ${target.name}...`, 'story');

    // Warp visuals
    this.ship.setWarp(true);
    this.starfield.setWarpMode(true);
    this.engine.bloomPass.strength = 1.2;

    await this.ui.showWarpEffect(target.name);

    // Actually warp
    this.sectorMap.warpTo(targetId);

    // Generate new system
    this.environment.generateSystem(target);

    // Camera reset
    this.engine.camera.position.set(0, 30, 60);

    // End warp
    this.ship.setWarp(false);
    this.starfield.setWarpMode(false);
    this.engine.bloomPass.strength = 0.6;

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
