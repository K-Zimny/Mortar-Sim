import addElement from "../utils/element.js";

/**
 * Player controlled weapon firing projectiles.
 *
 */
class Mortar {
  constructor({ sX = 100, sY = app.height - 100 } = {}) {
    this.element = addElement({
      sX: sX,
      sY: sY,
      className: "mortar",
    });
  }
}

export default Mortar;
