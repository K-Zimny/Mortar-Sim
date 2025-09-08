/**
 * Creates and render a DOM element
 */
function addElement({ sX = 0, sY = 0, className = "element" } = {}) {
  const element = document.createElement("div");

  element.classList.add(className);

  app.element.appendChild(element);

  element.style.transform = `translate(${sX}px,${sY}px)`;

  return element;
}

export default addElement;
