import {year} from "./data/year.js";
//console.log(year);

const calendar = document.querySelector('.calendar');

for (let j = 0; j < 13; j++) {
  const delta = 0.15;
  let padding = 0;
  for (let i = 0; i < 32; i++) {
    createCell(padding);
    padding += delta;
  }
}

function createCell(padding) {
    const element = document.createElement('div');
    element.classList.add('cell');
    element.style.top = `${padding}vh`;
    const day = document.createElement('div');
    day.classList.add('day');
    const image = document.createElement('img');
    image.src = '/img/circle.svg';
    day.append(image);
    element.append(day);
    calendar.append(element);
}

calendar.addEventListener('mouseover', (e) => {
  let cell = e.target.closest('.cell');

  let day = cell ? cell.querySelector('.day') : null;

  if (day !== null && cell.contains(day)) {
    day.classList.add('day__hover');
  }
})

calendar.addEventListener('mouseout', (e) => {
  let cell = e.target.closest('.cell');

  let day = cell ? cell.querySelector('.day') : null;
  if (day !== null && cell.contains(day)) {
    day.classList.remove('day__hover');
  }

})

calendar.addEventListener('click', (e) => {
  console.log(e.target);
})

