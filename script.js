import {Day} from "./js/Day.js";
import {months} from "../data/data.js";
import {weekDays} from "../data/data.js";

const calendar = document.querySelector('.calendar');

let dayCount = 0;
for (let month of Object.values(months)) {
  for (let i = 0; i < month.daysAmount; i++) {
    const day = new Day();
    
    day.kind = weekDays[dayCount];
    dayCount >= weekDays.length-1 ? dayCount = 0 : dayCount++;

    day.render(calendar);
    day.html.dataset.month = month.eng;
    day.html.dataset.date = i+1;
    day.html.dataset.kind = weekDays[dayCount];
  }
}

/*const delta = 3;

let k = 0;
for (let j = 0; j < 13; j++) {
  let padding = 0;
  for (let i = 0; i < 32; i++) {
    new Day(`${year[k].kind}`).render(calendar, padding)
    padding += delta;
    k++;
  }
}*/
