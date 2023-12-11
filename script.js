import {makeTilt, createNameCell, markElementAmongOthers, makeIndent} from "./js/functions.js";
import {Day} from "./js/Day.js";
import {Year} from "./js/Year.js";

let language = 'eng';
const languages = document.querySelector('.languages');
const calendar = document.querySelector('.calendar');
const year = new Year();

document.addEventListener('DOMContentLoaded', function() {
  year.renderIn(calendar, language);
  buildHr();
});

languages.addEventListener('click', (e) => {
  let element = e.target.closest('.language')
  language = element.dataset.language;
  markElementAmongOthers(element, 'language_active');
  calendar.innerHTML = '';
  year.renderIn(calendar, language);
})

function buildHr() {
  const hr = document.querySelector('.hr')
  makeIndent(hr, 3);
  for (let name = 0; name <= 31; name++) {
    name > 0 ? createNameCell(hr, `${name}`) : new Day('blank').renderIn(hr);
  }
  makeTilt(hr);
}