import addElement from "../utils/element.js";

/**
 * A Target is something to be shot at by a mortar.
 *
 */
class Target {
  constructor({ sX = app.width / 2, sY = app.height / 2 } = {}) {
    this.element = addElement({
      sX: sX,
      sY: sY,
      className: "target",
    });
  }
}

export default Target;
