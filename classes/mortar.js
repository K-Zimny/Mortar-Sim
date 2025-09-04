/**
 * A Mortar represents the player-controlled cannon that launches projectiles.
 * It creates an HTML element in the game container and is positioned at a starting X/Y coordinate.
 *
 * @property {HTMLDivElement} element - The DOM element representing the mortar.
 * @property {number} startingX - The starting X coordinate of the mortar.
 * @property {number} startingY - The starting Y coordinate of the mortar.
 */
class Mortar {
  /**
   * Create a new Mortar.
   *
   * @param {Object} options - Configuration options for the Mortar.
   * @param {number} [options.sX - Starting X position.
   * @param {number} [options.sY] - Starting Y position.
   */
  constructor({ sX = 100, sY = app.height - 100 } = {}) {
    /** @type {HTMLDivElement} */
    this.element = document.createElement("div");
    this.element.classList.add("mortar");
    app.element.appendChild(this.element);

    /** @type {number} */
    this.startingX = sX;

    /** @type {number} */
    this.startingY = sY;

    this.element.style.transform = `translate(${this.startingX}px,${this.startingY}px)`;
  }
}

export default Mortar;
