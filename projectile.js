export default class Projectile {
  constructor({
    sX = 10,
    eX = app.gameContainer.width,
    sY = app.gameContainer.height - 10,
    eY = 10,
    s = 10,
  }) {
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
  }

  fire() {
    let segments = 500;
    let segmentCounter = 0;
    let xDistance = 0;
    let yDistance = 0;
    let xIncrement =
      (this.endingX - this.startingX) / segments - this.width / segments;
    let yIncrement =
      (this.endingY - this.startingY) / segments - this.height / segments;

    const interval = setInterval(() => {
      this.element.style.transform = `translate(${
        this.startingX + xDistance
      }px, ${this.startingY + yDistance}px)`;
      xDistance += xIncrement;
      yDistance += yIncrement;
      segmentCounter += 1;

      if (segmentCounter >= segments) {
        clearInterval(interval);
      }
    }, this.speed);
    return this;
  }
}
