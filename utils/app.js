// appState.js
import Projectile from "../classes/projectile.js";
import playAudio from "./audio.js";

/**
 * Global application namespace exposed on window as `app`.
 * @namespace App
 * @property {HTMLElement} element - Root game container (#app).
 * @property {number} score - Current score.
 * @property {number} width - Current container width (px).
 * @property {number} height - Current container height (px).
 * @property {(p: import('../classes/projectile.js').default) => void} checkCollision
 * @property {() => void} updateScore
 */

/**
 * App bootstrapper: initializes the global `app` namespace and binds controls.
 * Safe to call more than once; subsequent calls are no-ops.
 * @module app
 */
const app = {
  /** @type {boolean} */
  _initialized: false,

  /**
   * Initialize game state and event listeners.
   * Creates/updates `window.app` (the global App namespace).
   */
  init() {
    if (this._initialized) return;
    this._initialized = true;

    /** @type {App} */
    const app = (window.app = window.app ?? {});
    app.element = document.querySelector("#app");
    app.score = 0;

    const measure = () => {
      app.width = app.element?.clientWidth ?? 0;
      app.height = app.element?.clientHeight ?? 0;
    };
    measure();
    window.addEventListener("resize", measure);

    // Space Bar: fire
    document.addEventListener("keyup", (e) => {
      console.log("keyop");
      if (e.code !== "Space") return;
      e.preventDefault();

      // Read live values from inputs
      const salvo = Number(document.querySelector("#salvo")?.value || 1);
      const angle = Number(document.querySelector("#angle")?.value ?? 0);
      const deflection = Number(
        document.querySelector("#deflection")?.value ?? 0
      );

      // Slight randomization
      const modX = 0.9;
      const modY = 0.9;
      for (let i = 0; i < salvo; i++) {
        const randomX = Math.random() * (1 - modX) + modX;
        const randomY = Math.random() * (1 - modY) + modY;
        setTimeout(() => {
          new Projectile({
            eX: angle * randomX * randomX,
            eY: deflection * randomY * randomY,
            s: 1,
          });
        }, i * 100); // number, not string
      }
    });

    // Arrow keys: tune inputs
    document.addEventListener("keydown", (e) => {
      const tuneValue = 25;

      const angleEl = /** @type {HTMLInputElement|null} */ (
        document.querySelector("#angle")
      );
      const deflectionEl = /** @type {HTMLInputElement|null} */ (
        document.querySelector("#deflection")
      );
      if (!angleEl || !deflectionEl) return;

      const angleValue = Number(angleEl.value || 0);
      const deflectionValue = Number(deflectionEl.value || 0);

      switch (e.code) {
        case "ArrowUp":
          angleEl.value = String(angleValue + tuneValue);
          break;
        case "ArrowDown":
          angleEl.value = String(angleValue - tuneValue);
          break;
        case "ArrowRight":
          deflectionEl.value = String(deflectionValue + tuneValue);
          break;
        case "ArrowLeft":
          deflectionEl.value = String(deflectionValue - tuneValue);
          break;
      }
    });

    document.addEventListener(
      "keydown",
      () => {
        playAudio("/assets/theme.m4a", { loop: false });
      },
      { once: true }
    );

    /**
     * Axis-aligned bounding-box (AABB) collision test between target and projectile.
     * @param {import('../classes/projectile.js').default} projectile
     */
    app.checkCollision = (projectile) => {
      const target = /** @type {HTMLElement|null} */ (
        document.querySelector(".target")
      );
      if (!target) return;

      const targetRect = target.getBoundingClientRect();
      const projRect = projectile.element.getBoundingClientRect();

      const intersects = !(
        targetRect.right < projRect.left ||
        targetRect.left > projRect.right ||
        targetRect.bottom < projRect.top ||
        targetRect.top > projRect.bottom
      );

      if (intersects) {
        // Consider a HUD indicator instead of alert()
        alert(`HIT! - Score: ${app.score}`);
      }
    };

    /** Increment score and update UI. */
    app.updateScore = () => {
      app.score += 1;
      const scoreEl = document.querySelector(".score");
      if (scoreEl) scoreEl.textContent = String(app.score);
    };
  },
};

export default app;
