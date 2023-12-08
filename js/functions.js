import {Day} from "./Day.js";

export function createElement(element, className) {
  const result = document.createElement(`${element}`);
  className ? result.classList.add(`${className}`) : null;
  return result;
}

export function makeTilt(element) {
  const elements = Array.from(element.children).filter(item => item.nodeType === 1);
  const columns = getComputedStyle(element).gridTemplateColumns.split(' ').length;
  const rows = getComputedStyle(element).gridTemplateRows.split(' ').length;

  let index = 0;
  const delta = 3;
  for (let row = 0; row < rows; row++) {
    let padding = 0;
    for (let col = 0; col < columns; col++) {
      elements[index] ? elements[index].style.top = `${padding}%` : null;
      padding += delta;
      index++;
    }
  }
}

export function createNameCell(place, text) {
  const element = document.createElement('div');
  element.classList.add('name');
  element.textContent = text;
  place.append(element);
}

export function markElementAmongOthers(element, markClass) {
  for(let i=0; i<element.parentElement.children.length; i++) {
    element.parentElement.children[i].classList.remove(markClass);
  }
  element.classList.add(markClass);
}

export function makeIndent(block, amount) {
  for (let i=0; i < amount; i++) {
    new Day('blank').renderIn(block);
  }
}


