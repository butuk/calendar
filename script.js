import {year} from "./data/year.js";
import {Day} from "./js/Day.js";

const delta = 3;

const calendar = document.querySelector('.calendar');

let k = 0;
for (let j = 0; j < 13; j++) {
  let padding = 0;
  for (let i = 0; i < 32; i++) {
    //console.log(year[k].kind);

    new Day(`${year[k].kind}`).render(calendar, padding)
    padding += delta;
    k++;
  }
}

calendar.addEventListener('mouseover', (e) => {
  console.log('hi');
  let cell = e.target.closest('.cell');

  let day = cell ? cell.querySelector('.day') : null;

  if (day !== null && cell.contains(day)) {
    day.classList.add('day_hover');
  }
})

calendar.addEventListener('mouseout', (e) => {
  let cell = e.target.closest('.cell');

  let day = cell ? cell.querySelector('.day') : null;
  if (day !== null && cell.contains(day)) {
    day.classList.remove('day_hover');
  }

})

calendar.addEventListener('click', (e) => {
  console.log(e.target);
})

