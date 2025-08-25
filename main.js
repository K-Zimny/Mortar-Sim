window.addEventListener("DOMContentLoaded", () => {
  // Global
  window.app = {};

  // Game container
  const gameContainer = document.querySelector(".game-container");

  app.gameContainer = {
    element: gameContainer,
    projectileCount: 0,
    get width() {
      return gameContainer?.clientWidth ?? 0;
    },
    get height() {
      return gameContainer?.clientHeight ?? 0;
    },
  };

  setTimeout(() => {
    class Mortar {
      constructor({
        player = false,
        sX = app.gameContainer.width - 400,
        sY = app.gameContainer.height - 645,
      }) {
        this.element = document.createElement("div");
        this.player = player;
        this.element.classList.add(this.isPlayer());
        app?.gameContainer?.element.appendChild(this.element);

        this.startingX = sX;
        this.startingY = sY;
        this.element.style.transform = `translate(${this.startingX}px,${this.startingY}px)`;
      }

      isPlayer() {
        if (!this.player) {
          return "mortar-foe";
        } else {
          return "mortar-player";
        }
      }
    }

    class Projectile {
      constructor({
        sX = 110,
        eX = app.gameContainer.width,
        sY = app.gameContainer.height - 25,
        eY = 10,
        s = 10,
      } = {}) {
        // Create and Append Projectile
        this.element = document.createElement("div");
        this.element.classList.add("projectile");
        app?.gameContainer?.element.appendChild(this.element);

        // Measure Projectile
        const rect = this.element.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;

        // Set starting position
        this.startingX = sX;
        this.startingY = sY;
        this.element.style.transform = `translate(${this.startingX}px,${this.startingY}px)`;

        // Set ending position
        this.endingX = eX;
        this.endingY = eY;

        // Set Speed
        this.speed = s;

        // Methods
        this.fire();
      }

      fire() {
        // Increment Projectile Count
        app.gameContainer.projectileCount += 1;

        // Stores projectile movements throughout firing event. Updated by it's increment
        let xDistanceTraveled = 0;
        let yDistanceTraveled = 0;

        // Segments are used to break up distance differences into chucks to be used to increment projectile movement.
        let segments = 600;
        let segmentCounter = 0;
        let xIncrement =
          (this.endingX - this.startingX) / segments - this.width / segments;
        let yIncrement =
          (this.endingY - this.startingY) / segments - this.height / segments;

        const interval = setInterval(() => {
          // Responsible for applying the movement throughout interval sequence.
          // prettier-ignore
          this.element.style.transform = `translate(${this.startingX + xDistanceTraveled}px, ${this.startingY + yDistanceTraveled}px)`;

          // Distance and segment value management over iterations
          xDistanceTraveled += xIncrement;
          yDistanceTraveled += yIncrement;
          segmentCounter += 1;

          // Clear interval when projectile reaches target
          if (segmentCounter >= segments) {
            clearInterval(interval);
            this.detonate();
            checkCollision(document.querySelector(".mortar-foe"), this);
            updateScore();
          }
        }, this.speed);
      }

      detonate() {
        this.element.classList.add("detonate");
        setTimeout(() => {
          // Remove projectile for performance
          this.element.remove();
        }, 120000);
      }
    }

    const updateScore = () => {
      document.querySelector(".score").textContent =
        app.gameContainer.projectileCount;
    };

    const checkCollision = (target, projectile) => {
      const intersects = (target, projectile) => {
        return !(
          target.right < projectile.left ||
          target.left > projectile.right ||
          target.bottom < projectile.top ||
          target.top > projectile.bottom
        );
      };

      let hit = false;
      const targetPosition = target.getBoundingClientRect();
      const projectilePosition = projectile.element.getBoundingClientRect();
      console.log("projectilePosition", projectilePosition);

      if (!hit && intersects(targetPosition, projectilePosition)) {
        hit = true;
        alert(`HIT! - Score: ${app.gameContainer.projectileCount}`);
      } else {
        console.log("miss");
      }
    };

    const random = Math.random() * (1 - 0.9) + 0.9;

    document.addEventListener("keyup", (e) => {
      const salvo = document.querySelector("#salvo")?.value;
      const angle = document.querySelector("#angle")?.value;
      const deflection = document.querySelector("#deflection")?.value;

      if (e.code === "Space") {
        e.preventDefault();
        let modX = 0.85;
        let modY = 0.85;
        for (let i = 0; i < salvo; i++) {
          const randomX = Math.random() * (1 - modX) + modX;
          const randomY = Math.random() * (1 - modY) + modY;
          setTimeout(() => {
            new Projectile({
              eX: angle * randomX * randomX,
              eY: deflection * randomY * randomY,
              s: 1,
            });
          }, `${i}00`);
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      // Sets the fineness of tuning projectile
      const tuneValue = 25;

      // Getters
      const angleEl = document.querySelector("#angle");
      let angleValue = parseInt(angleEl.value);

      const deflectionEl = document.querySelector("#deflection");
      let deflectionValue = parseInt(deflectionEl.value);

      switch (e.code) {
        case "ArrowUp":
          angleEl.setAttribute("value", angleValue + tuneValue);
          break;
        case "ArrowDown":
          angleEl.setAttribute("value", angleValue - tuneValue);
          break;
        case "ArrowRight":
          deflectionEl.setAttribute("value", deflectionValue + tuneValue);
          break;
        case "ArrowLeft":
          deflectionEl.setAttribute("value", deflectionValue - tuneValue);
          break;
        default:
          break;
      }
    });

    // for (let i = 0; i < 100; i++) {
    //   setTimeout(() => {
    //     new Projectile({
    //       eX: Math.random() * 1000,
    //       eY: Math.random() * 800,
    //       s: Math.random() * 5,
    //     });
    //   }, `${i}00`);
    // }

    // TODO Fix fake mortar and projectile alignment
    new Mortar({
      player: true,
      sX: 100,
      sY: app.gameContainer.height + 25,
    });
    new Mortar({
      sX: (app.gameContainer.width - 400) * random,
      sY: (app.gameContainer.height - 645) * random,
    });
  }, 1000); // Delay to not break initial frames on load
});
