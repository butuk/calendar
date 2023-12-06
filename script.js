import {Day} from "./js/Day.js";
import {months} from "../data/data.js";
import {weekDays} from "../data/data.js";

let language = 'eng';
const languages = document.querySelector('.languages');
const calendar = document.querySelector('.calendar');

document.addEventListener('DOMContentLoaded', function() {
  buildCalenar();
  buildHr();
});

function buildHr() {
  const hr = document.querySelector('.hr')
  makeIndent(hr);
  for (let name = 0; name <= 31; name++) {
    name > 0 ? createNameCell(hr, `${name}`) : new Day('blank').renderIn(hr);
  }
  makeTilt(hr);
}

function buildCalenar(){
  makeIndent(calendar);
  let weekDayCount = 0;

  for (let month = 0; month <= 11; month++) {
    let mnth = Object.values(months)[`${month}`];
    let monthName = mnth[`${language}`].charAt(0).toUpperCase();
    for (let cell = 0; cell <= 31; cell++) {
      if (cell === 0) {
        createNameCell(calendar, monthName);
      } else {
        if (cell <= mnth.daysAmount) {
          const day = new Day(weekDays[weekDayCount], mnth[`${language}`], cell);
          day.kind = weekDays[weekDayCount];
          weekDayCount >= weekDays.length - 1 ? weekDayCount = 0 : weekDayCount++;
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
  makeTilt(calendar);
}

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

languages.addEventListener('click', (e) => {
  language = e.target.dataset.language;
  e.target.classList.add = 'language_active';
  calendar.innerHTML = '';
  buildCalenar();
})