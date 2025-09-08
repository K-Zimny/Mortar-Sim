import playAudio from "../utils/audio.js";
import addElement from "../utils/element.js";

/**
 * A Projectile represents a fired object in the game.
 * It is created, animated along a path, and detonates upon reaching its target.
 *
 * @property {HTMLDivElement} element - The DOM element representing the projectile.
 * @property {number} width - The projectile's width in pixels.
 * @property {number} height - The projectile's height in pixels.
 * @property {number} startingX - The starting X coordinate.
 * @property {number} startingY - The starting Y coordinate.
 * @property {number} endingX - The ending X coordinate (target).
 * @property {number} endingY - The ending Y coordinate (target).
 * @property {number} speed - Speed of the projectile animation (ms per frame).
 */
class Projectile {
  /**
   * Create a new Projectile.
   *
   * @param {Object} [options={}] - Configuration options for the projectile.
   * @param {number} [options.sX] - Starting X position.
   * @param {number} [options.eX] - Ending X position.
   * @param {number} [options.sY] - Starting Y position.
   * @param {number} [options.eY] - Ending Y position.
   * @param {number} [options.s] - Speed of movement (interval delay in ms).
   */
  constructor({
    sX = 110,
    eX = app.width,
    sY = app.height - 25,
    eY = 10,
    s = 10,
  } = {}) {
    this.element = addElement({
      sX: sX,
      sY: sY,
      className: "projectile",
    });

    // Measure Projectile
    const rect = this.element.getBoundingClientRect();
    /** @type {number} */
    this.width = rect.width;
    /** @type {number} */
    this.height = rect.height;

    // Set starting position
    /** @type {number} */
    this.startingX = sX;
    /** @type {number} */
    this.startingY = sY;
    // this.element.style.transform = `translate(${this.startingX}px,${this.startingY}px)`;

    // Set ending position
    /** @type {number} */
    this.endingX = eX;
    /** @type {number} */
    this.endingY = eY;

    // Set speed
    /** @type {number} */
    this.speed = s;

    // Launch immediately
    this.fire();
  }

  /**
   * Fire the projectile.
   * Handles launch sound, movement increments, and collision checks.
   */
  fire() {
    // Play launch sound
    playAudio("public/fire.m4a");

    // Track traveled distance
    let xDistanceTraveled = 0;
    let yDistanceTraveled = 0;

    // Segments break the movement into increments
    let segments = 600;
    let segmentCounter = 0;
    let xIncrement =
      (this.endingX - this.startingX) / segments - this.width / segments;
    let yIncrement =
      (this.endingY - this.startingY) / segments - this.height / segments;

    setTimeout(() => {
      const interval = setInterval(() => {
        // Update position
        // prettier-ignore
        this.element.style.transform = `translate(${this.startingX + xDistanceTraveled}px, ${this.startingY + yDistanceTraveled}px)`;

        // Increment traveled distance
        xDistanceTraveled += xIncrement;
        yDistanceTraveled += yIncrement;
        segmentCounter += 1;

        // Stop once target is reached
        if (segmentCounter >= segments) {
          clearInterval(interval);
          this.detonate();
          app.checkCollision(this);
          app.updateScore();
        }
      }, this.speed);
    }, 150);
  }

  /**
   * Detonate the projectile on impact.
   * Plays explosion sound, applies CSS animation, and removes element after cleanup delay.
   */
  detonate() {
    this.element.classList.add("detonate");
    playAudio("public/explosion.m4a");
    setTimeout(() => {
      // Remove projectile for performance
      this.element.remove();
    }, 120000);
  }
}

export default Projectile;
