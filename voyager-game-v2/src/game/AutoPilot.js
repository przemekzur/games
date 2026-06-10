import * as THREE from 'three';

export class AutoPilot {
  constructor(ship) {
    this.ship = ship;
    this.target = null;       // THREE.Vector3
    this.targetName = '';
    this.active = false;
    this.arrivalDistance = 25;
  }

  setWaypoint(position, name) {
    this.target = position.clone();
    this.targetName = name;
    this.active = true;
  }

  cancel() {
    this.target = null;
    this.targetName = '';
    this.active = false;
  }

  update(delta) {
    if (!this.active || !this.target) return;

    const shipPos = this.ship.mesh.position;
    const distance = shipPos.distanceTo(this.target);

    // Arrived?
    if (distance < this.arrivalDistance) {
      this.active = false;
      return;
    }

    // Calculate direction to target
    const direction = this.target.clone().sub(shipPos).normalize();

    // Smoothly rotate ship to face target
    const targetAngle = Math.atan2(direction.x, -direction.z);
    let currentAngle = this.ship.mesh.rotation.y;

    // Shortest angle difference
    let angleDiff = targetAngle - currentAngle;
    while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

    // Smooth rotation (1.0 rad/s)
    const rotSpeed = 1.0;
    if (Math.abs(angleDiff) > 0.02) {
      this.ship.mesh.rotation.y += Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), rotSpeed * delta);
    }

    // Set speed: faster when far, slow down near target
    const desiredSpeed = Math.min(40, distance * 0.5);
    this.ship.currentSpeed = THREE.MathUtils.lerp(this.ship.currentSpeed, desiredSpeed, delta * 2);

    // Move ship forward
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.ship.mesh.quaternion);
    this.ship.mesh.position.addScaledVector(forward, this.ship.currentSpeed * delta);
  }
}
