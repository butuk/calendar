import {Day} from "./js/Day.js";
import {months} from "../data/data.js";
import {weekDays} from "../data/data.js";

// HR
const hr = document.querySelector('.hr')
makeIndent(hr);
for (let name = 0; name <= 31; name++) {
  name > 0 ? createNameCell(hr, `${name}`) : new Day('blank').renderIn(hr);
}

// Calendar
const calendar = document.querySelector('.calendar');
makeIndent(calendar);
let weekDayCount = 0;
for (let month = 0; month <= 11; month++) {
  let mnth = Object.values(months)[`${month}`];
  let monthName = mnth.eng.charAt(0).toUpperCase();
  for (let cell = 0; cell <= 31; cell++) {
    if (cell === 0) {
      createNameCell(calendar, monthName);
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

document.addEventListener('DOMContentLoaded', function() {
  makeTilt(calendar);
  makeTilt(hr);
})

function makeTilt(element) {
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

function makeIndent (block) {
  for (let i=0; i < 3; i++) {
    new Day('blank').renderIn(block);
  }
}

function createNameCell(place, text) {
  const element = document.createElement('div');
  element.classList.add('name');
  element.textContent = text;
  place.append(element);
}