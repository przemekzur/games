import * as THREE from 'three';

export class CollisionSystem {
  constructor() {
    this.objects = [];
    this._tempVec = new THREE.Vector3();
    this._quantumFluxTimers = new Map();
  }

  /**
   * Register a collidable object with bounding sphere.
   * @param {THREE.Object3D} mesh - The mesh or group
   * @param {number} radius - Bounding sphere radius
   * @param {string} type - 'planet' | 'asteroid' | 'station' | 'anomaly'
   * @param {boolean} interactable - Whether F-key interaction is possible
   * @param {object} data - Extra data (name, planetType, stationType, etc.)
   */
  register(mesh, radius, type, interactable, data = {}) {
    this.objects.push({ mesh, radius, type, interactable, data });
  }

  clear() {
    this.objects.length = 0;
  }

  /**
   * Check collisions between ship and all registered objects.
   * Returns an array of collision result objects.
   * @param {THREE.Vector3} shipPosition
   * @param {number} shipRadius
   * @param {number} delta - frame delta in seconds
   * @param {number} [shipSpeed=0] - current ship speed for warp damage scaling
   */
  update(shipPosition, shipRadius, delta, shipSpeed = 0) {
    const results = [];

    for (const obj of this.objects) {
      // Get world position of the object's mesh/group
      const objPos = this._tempVec;
      obj.mesh.getWorldPosition(objPos);

      const dist = shipPosition.distanceTo(objPos);
      const combinedRadius = shipRadius + obj.radius;

      // Anomaly proximity effects (within 2x radius but not necessarily colliding)
      if (obj.type === 'anomaly' && dist < obj.radius * 2 && dist >= combinedRadius) {
        const proximityResult = this._getAnomalyProximityEffect(obj, dist, delta, shipPosition, objPos);
        if (proximityResult) results.push(proximityResult);
        continue;
      }

      if (dist < combinedRadius) {
        const overlap = combinedRadius - dist;
        const direction = new THREE.Vector3().subVectors(shipPosition, objPos);
        if (direction.lengthSq() < 0.001) direction.set(0, 1, 0);
        direction.normalize();

        const result = {
          object: obj,
          distance: dist,
          overlap,
          direction, // points from object toward ship
          type: obj.type,
        };

        switch (obj.type) {
          case 'asteroid': {
            // Base damage 2-5, scaled by speed when warping
            const baseDamage = 2 + Math.random() * 3;
            result.damage = baseDamage * (1 + shipSpeed / 100);
            result.bounce = direction.clone().multiplyScalar(overlap * 2);
            result.sparks = true;
            result.sparkPosition = new THREE.Vector3().lerpVectors(shipPosition, objPos, 0.5);
            break;
          }
          case 'planet':
          case 'station': {
            // Push ship out, no damage
            result.pushBack = direction.clone().multiplyScalar(overlap + 0.5);
            result.damage = 0;
            break;
          }
          case 'anomaly': {
            // Allow partial overlap but apply effects
            result.damage = 0;
            result.insideAnomaly = true;
            this._applyAnomalyEffect(obj, result, dist, delta, shipPosition, objPos);
            break;
          }
        }

        results.push(result);
      }
    }

    return results;
  }

  _applyAnomalyEffect(obj, result, dist, delta, shipPosition, objPos) {
    const aType = obj.data.anomalyType;

    switch (aType) {
      case 'spatial-rift': {
        // Gravity pull — inverse square, capped
        const pullDir = new THREE.Vector3().subVectors(objPos, shipPosition);
        const pullDist = Math.max(pullDir.length(), 1);
        pullDir.normalize();
        const pullStrength = Math.min(20, 200 / (pullDist * pullDist));
        result.gravityPull = pullDir.multiplyScalar(pullStrength);
        result.energyDrain = 1 * delta;
        break;
      }
      case 'subspace-tear': {
        // Shield drain 3/s when nearby; if shields 0, hull drain 1/s
        result.shieldDrain = 3 * delta;
        result.hullDrainIfNoShields = 1 * delta;
        break;
      }
      case 'graviton-surge': {
        // Random angular torque
        result.torque = new THREE.Euler(
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
          0
        );
        break;
      }
      case 'quantum-flux': {
        // Random effect every 3s
        const key = obj.mesh.uuid;
        const last = this._quantumFluxTimers.get(key) || 0;
        const now = performance.now() / 1000;
        if (now - last >= 3) {
          this._quantumFluxTimers.set(key, now);
          if (Math.random() < 0.5) {
            result.energyBoost = 10;
          } else {
            result.damage = 5;
          }
        }
        break;
      }
      default:
        result.energyDrain = 1 * delta;
        break;
    }
  }

  _getAnomalyProximityEffect(obj, dist, delta, shipPosition, objPos) {
    const aType = obj.data.anomalyType;
    const result = {
      object: obj,
      distance: dist,
      overlap: 0,
      direction: new THREE.Vector3().subVectors(shipPosition, objPos).normalize(),
      type: 'anomaly',
      damage: 0,
      insideAnomaly: false,
      nearAnomaly: true,
    };

    switch (aType) {
      case 'spatial-rift': {
        const pullDir = new THREE.Vector3().subVectors(objPos, shipPosition);
        const pullDist = Math.max(pullDir.length(), 1);
        pullDir.normalize();
        const pullStrength = Math.min(15, 150 / (pullDist * pullDist));
        result.gravityPull = pullDir.multiplyScalar(pullStrength);
        return result;
      }
      case 'subspace-tear': {
        result.shieldDrain = 3 * delta;
        result.hullDrainIfNoShields = 1 * delta;
        return result;
      }
      case 'graviton-surge': {
        if (dist < obj.radius * 1.5) {
          result.torque = new THREE.Euler(
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5,
            0
          );
          return result;
        }
        return null;
      }
      case 'quantum-flux': {
        const key = obj.mesh.uuid;
        const last = this._quantumFluxTimers.get(key) || 0;
        const now = performance.now() / 1000;
        if (now - last >= 3) {
          this._quantumFluxTimers.set(key, now);
          if (Math.random() < 0.5) {
            result.energyBoost = 10;
          } else {
            result.damage = 5;
          }
          return result;
        }
        return null;
      }
      default:
        return null;
    }
  }

  /**
   * Get all objects within range of shipPosition.
   */
  getNearbyObjects(shipPosition, range) {
    const nearby = [];
    const pos = this._tempVec;

    for (const obj of this.objects) {
      obj.mesh.getWorldPosition(pos);
      const dist = shipPosition.distanceTo(pos);
      if (dist < range) {
        nearby.push({
          ...obj,
          distance: dist,
          worldPosition: pos.clone(),
        });
      }
    }

    // Sort by distance
    nearby.sort((a, b) => a.distance - b.distance);
    return nearby;
  }

  /**
   * Get the closest interactable object within maxRange.
   */
  getClosestInteractable(shipPosition, maxRange) {
    let closest = null;
    let closestDist = Infinity;
    const pos = this._tempVec;

    for (const obj of this.objects) {
      if (!obj.interactable) continue;
      obj.mesh.getWorldPosition(pos);
      const dist = shipPosition.distanceTo(pos);
      if (dist < maxRange && dist < closestDist) {
        closestDist = dist;
        closest = { ...obj, distance: dist, worldPosition: pos.clone() };
      }
    }

    return closest;
  }
}
