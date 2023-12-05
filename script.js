import {Day} from "./js/Day.js";
import {months} from "../data/data.js";
import {weekDays} from "../data/data.js";

// HR
const hr = document.querySelector('.hr')
makeIndent(hr);
for (let name = 0; name <= 31; name++) {
  name > 0 ? createName(hr, `${name}`) : new Day('blank').renderIn(hr);
}
//makeTilt(hr);

// Calendar
const calendar = document.querySelector('.calendar');
makeIndent(calendar);

let weekDayCount = 0;
for (let month = 0; month <= 11; month++) {
  let mnth = Object.values(months)[`${month}`];
  let monthName = mnth.eng.charAt(0).toUpperCase();

  for (let cell = 0; cell <= 31; cell++) {
    if (cell === 0) {
      createName(calendar, monthName);
    } else {
      if (cell <= mnth.daysAmount) {
        const day = new Day(weekDays[weekDayCount], mnth.eng, cell);
        day.kind = weekDays[weekDayCount];
        weekDayCount >= weekDays.length-1 ? weekDayCount = 0 : weekDayCount++;
        day.renderIn(calendar);

        day.html.dataset.month = day.month;
        day.html.dataset.date = day.date;
        day.html.dataset.kind = day.kind;
      } else {
        new Day('blank').renderIn(calendar);
      }
    }
  }
}
makeTilt(calendar, '.day');

// Functions
// Months lines tilt
function makeTilt(element, children) {
  const elements = element.querySelector(children);
  const delta = 3;
  let index = 0;

  for (let row = 0; row < 13; row++) {
    let padding = 0;
    for (let col = 0; col < 31; col++) {
      elements[index].style.top = `${padding}%`;
      padding += delta;
      index++;
    }
  };
}

function makeIndent (block) {
  for (let i=0; i < 5; i++) {
    new Day('blank').renderIn(block);
  }
}

function createName(place, text) {
  const element = document.createElement('div');
  element.classList.add('name');
  element.textContent = text;
  place.append(element);
}