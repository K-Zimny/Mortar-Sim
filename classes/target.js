/**
 * A Target is something to be shot at with a projectile.
 * It creates an HTML element in the game container and supports hit detection.
 *
 * @property {HTMLDivElement} element - The DOM element representing the target.
 * @property {number} startingX - The starting X coordinate of the target.
 * @property {number} startingY - The starting Y coordinate of the target.
 */
class Target {
  /**
   * Create a new Target.
   *
   * @param {Object} options - Configuration options for the Target.
   * @param {number} [options.sX] - Starting X position.
   * @param {number} [options.sY] - Starting Y position.
   */
  constructor({ sX = app.width / 2, sY = app.height / 2 } = {}) {
    /** @type {HTMLDivElement} */
    this.element = document.createElement("div");
    this.element.classList.add("target");
    app.element.appendChild(this.element);

    /** @type {number} */
    this.startingX = sX;

    /** @type {number} */
    this.startingY = sY;

    this.element.style.transform = `translate(${this.startingX}px,${this.startingY}px)`;
  }
}

export default Target;
