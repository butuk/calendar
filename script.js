import {year} from "./data/year.js";
console.log(year);

const calendar = document.querySelector('.calendar');

for (let j = 0; j < 13; j++) {
  const delta = 0.14;
  let padding = 0;
  for (let i = 0; i < 32; i++) {
    createCell(padding);
    padding += delta;
  }
}

function createCell(padding) {
    const element = document.createElement('div');
    element.classList.add('cell');
    element.style.paddingTop = `${padding}vh`;
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('imgContainer');
    const image = document.createElement('img');
    image.src = '/img/circle.svg';
    imgContainer.append(image);
    element.append(imgContainer);
    calendar.append(element);
}