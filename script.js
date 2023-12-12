import {markElementAmongOthers} from "./js/functions.js";
import {CalendarHead} from "./js/CalendarHead.js";
import {Year} from "./js/Year.js";

const cellsAmount = 31;
const indent = 3;
const languages = document.querySelector('.languages');
const calendar = document.querySelector('.calendar');
const hr = document.querySelector('.hr')
const head = new CalendarHead();
const year = new Year();
let language = 'eng';


document.addEventListener('DOMContentLoaded', function() {
  head.renderIn(hr, cellsAmount, indent);
  year.renderIn(calendar, cellsAmount, indent, language);
});

languages.addEventListener('click', (e) => {

  const target = e.target.closest('.language')
  language = target.dataset.language;
  markElementAmongOthers(target, 'language_active');

  year.clearRender();
  year.renderIn(calendar, cellAmount, indent, language);
})

calendar.addEventListener('mouseover', (e) => {
  const target = e.target.closest('.day');
  const firstChild = target ? target.children[0] : null;
  firstChild.classList.add('day_hover');
})