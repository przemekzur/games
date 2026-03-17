import * as THREE from 'three';

export class CollisionSystem {
  constructor() {
    this.objects = [];
    this._tempVec = new THREE.Vector3();
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
   */
  update(shipPosition, shipRadius, delta) {
    const results = [];

    for (const obj of this.objects) {
      // Get world position of the object's mesh/group
      const objPos = this._tempVec;
      obj.mesh.getWorldPosition(objPos);

      const dist = shipPosition.distanceTo(objPos);
      const combinedRadius = shipRadius + obj.radius;

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
            // Deal 2-5 hull damage
            result.damage = 2 + Math.random() * 3;
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
            if (obj.data.anomalyType === 'spatial-rift') {
              result.energyDrain = 1 * delta; // 1 energy per second
            }
            result.insideAnomaly = true;
            break;
          }
        }

        results.push(result);
      }
    }

    return results;
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
