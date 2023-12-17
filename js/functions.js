import { Day } from "./Day.js";

export function createElement(element, className) {
  const result = document.createElement(`${element}`);
  if (className) {
    result.classList.add(`${className}`)
  }
  return result;
}

export function markElementAmongOthers(element, markClass) {
  for (let i = 0; i < element.parentElement.children.length; i++) {
    element.parentElement.children[i].classList.remove(markClass);
  }
  element.classList.add(markClass);
}

export function createNameCell(place, text) {
  const element = document.createElement("div");
  element.classList.add("name");
  element.textContent = text;
  place.append(element);
}

export function makeIndent(block, amount) {
  for (let i = 0; i < amount; i++) {
    new Day("blank").renderIn(block);
  }
}

export function makeTilt(element, cols) {
  const elements = Array.from(element.children);
  const columns = cols; //getComputedStyle(element).gridTemplateColumns.split(" ").length;


  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder

  let padding = 0;
  const delta = 3;
  for (let i = 0; i < elements.length; i++) {
    if (i % columns === 0) {
      padding = 0;
    }
    elements[i].style.top = `${padding}%`;
    padding += delta;
  }
}