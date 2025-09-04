import app from "./utils/app.js";
import Target from "./classes/target.js";
import Mortar from "./classes/mortar.js";

window.addEventListener("DOMContentLoaded", () => {
  app.init();

  new Mortar();
  new Target();
});
