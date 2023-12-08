import {Day} from "./js/Day.js";
import {months} from "./data/data.js";
import {weekDays} from "./data/data.js";

import {makeTilt} from "./js/functions.js";
import {createNameCell} from "./js/functions.js";
import {markElementAmongOthers} from "./js/functions.js";
import {makeIndent} from "./js/functions.js";
import {Year} from "./js/Year.js";


let language = 'eng';
const languages = document.querySelector('.languages');
const calendar = document.querySelector('.calendar');

document.addEventListener('DOMContentLoaded', function() {
  buildHr();
  //buildCalenar();
});

languages.addEventListener('click', (e) => {
  let element = e.target.closest('.language')
  language = element.dataset.language;
  markElementAmongOthers(element, 'language_active');
  calendar.innerHTML = '';
  buildCalenar();
})

function buildHr() {
  const hr = document.querySelector('.hr')
  makeIndent(hr, 3);
  for (let name = 0; name <= 31; name++) {
    name > 0 ? createNameCell(hr, `${name}`) : new Day('blank').renderIn(hr);
  }
  makeTilt(hr);
}

new Year();

/*

function buildCalenar(){
  makeIndent(calendar, 3);
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
*/

//-------
/*

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

function createNameCell(place, text) {
  const element = document.createElement('div');
  element.classList.add('name');
  element.textContent = text;
  place.append(element);
}

function markElementAmongOthers(element, markClass) {
  for(let i=0; i<element.parentElement.children.length; i++) {
    element.parentElement.children[i].classList.remove(markClass);
  }
  element.classList.add(markClass);
}

function makeIndent(block, amount) {
  for (let i=0; i < amount; i++) {
    new Day('blank').renderIn(block);
  }
}
*/
