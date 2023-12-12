import {markElementAmongOthers} from "./js/functions.js";
import {CalendarHead} from "./js/CalendarHead.js";
import {Year} from "./js/Year.js";

const cellAmount = 31;
const indent = 3;
const languages = document.querySelector('.languages');
const calendar = document.querySelector('.calendar');
const hr = document.querySelector('.hr')
const head = new CalendarHead();
const year = new Year();
let language = 'eng';

document.addEventListener('DOMContentLoaded', function() {
  year.renderIn(calendar, cellAmount, indent, language);
  head.renderIn(hr, cellAmount, indent);
});

languages.addEventListener('click', (e) => {
  let target = e.target.closest('.language')
  language = target.dataset.language;
  markElementAmongOthers(target, 'language_active');
  year.clearRender();
  year.renderIn(calendar, cellAmount, indent, language);
})