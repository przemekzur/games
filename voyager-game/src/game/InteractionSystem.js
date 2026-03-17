export class InteractionSystem {
  constructor(collisionSystem, gameState, ui, events, particles, ship, onEvent) {
    this.collisionSystem = collisionSystem;
    this.gameState = gameState;
    this.ui = ui;
    this.events = events;
    this.particles = particles;
    this.ship = ship;
    this.onEvent = onEvent;
    this.interactionCooldown = 0;

    window.addEventListener('keydown', (e) => {
      if (e.key === 'f' || e.key === 'F') {
        this.tryInteract();
      }
    });
  }

  tryInteract() {
    if (this.interactionCooldown > 0) return;

    const state = this.gameState.getState();
    if (state.inCombat) {
      this.onEvent?.('Cannot interact during combat!', 'combat');
      return;
    }

    const shipPos = this.ship.mesh.position;
    const target = this.collisionSystem.getClosestInteractable(shipPos, 30);

    if (!target) {
      this.onEvent?.('Nothing in interaction range.', '');
      return;
    }

    this.interactionCooldown = 1.0; // 1-second cooldown

    switch (target.type) {
      case 'station':
        this.interactStation(target);
        break;
      case 'planet':
        this.interactPlanet(target);
        break;
      case 'anomaly':
        this.interactAnomaly(target);
        break;
      case 'asteroid':
        this.interactAsteroid(target);
        break;
    }
  }

  interactStation(target) {
    const stationData = {
      name: target.data.name || 'Space Station',
      stationType: target.data.stationType || 'trading-post',
      distance: target.distance,
    };
    this.ui.showDockMenu(stationData);
    this.onEvent?.(`📡 Hailing ${stationData.name}...`, 'discovery');
  }

  interactPlanet(target) {
    const planetData = {
      name: target.data.name || 'Unknown Planet',
      planetType: target.data.planetType || 'Class M',
      radius: target.radius,
      distance: target.distance,
    };
    this.ui.showScanResult(planetData);
    this.onEvent?.(`🔭 Scanning ${planetData.name}...`, 'discovery');
  }

  interactAnomaly(target) {
    const anomalyData = {
      name: target.data.name || 'Spatial Anomaly',
      anomalyType: target.data.anomalyType || 'spatial-rift',
      distance: target.distance,
    };
    this.events.triggerAnomalyEvent(anomalyData);
    this.onEvent?.(`🌀 Investigating ${anomalyData.anomalyType}...`, 'discovery');
  }

  interactAsteroid(target) {
    const amount = 2 + Math.floor(Math.random() * 7);
    const resource = Math.random() < 0.5 ? 'dilithium' : 'deuterium';
    const state = this.gameState.getState();
    this.gameState.update({ [resource]: (state[resource] || 0) + amount });
    this.onEvent?.(`⛏️ Mined ${amount} ${resource} from asteroid.`, 'success');

    // Spark particles at the asteroid
    if (this.particles && target.worldPosition) {
      this.particles.emit({
        position: target.worldPosition,
        count: 15,
        color: resource === 'dilithium' ? 0x8866ff : 0xff8833,
        speed: 3,
        spread: 1.5,
        life: 0.8,
        size: 1.0,
      });
    }
  }

  update(delta) {
    if (this.interactionCooldown > 0) {
      this.interactionCooldown -= delta;
    }
  }
}
