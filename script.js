import { markElementAmongOthers } from "./js/functions.js";
import { CalendarHead } from "./js/CalendarHead.js";
import { Year } from "./js/Year.js";
import {holidays} from "./data/holidays.js";

// Calendar head
const head = new CalendarHead();
const hr = document.querySelector('.hr');
head.renderIn(hr, 31, 3);
let language = 'eng';
let country = holidays['poland'];

const year = new Year();

// Calendar
const calendar = document.querySelector('.grid');
year.createDefault();
year.switchTo(country);
year.renderIn(calendar, 31, 3, language);

// Switching countries
const countries = document.querySelector('.countries');
countries.addEventListener('click', (e) => {
  const target = e.target.closest('.country');
  markElementAmongOthers(target, 'country_active');
  year.clearRender();
  country = holidays[`${target.dataset.country}`];
  year.createDefault();
  year.switchTo(country);
  year.renderIn(calendar, 31, 3, language);
})

// Switching languages
const languages = document.querySelector('.languages');
languages.addEventListener('click', (e) => {
  const target = e.target.closest('.language');
  markElementAmongOthers(target, 'language_active');
  year.clearRender();
  language = target.dataset.language;
  year.renderIn(calendar, 31, 3, language);
});

// Days on hover

calendar.addEventListener('mouseover', (e) => {
  const target = e.target.closest('.date');
  const firstChild = target ? target.children[0] : null;
  if (firstChild) {
    firstChild.classList.add('day_hover');

    const date = firstChild.parentElement.dataset.date;
    const month = firstChild.parentElement.dataset.monthNumber;
    const weekday = firstChild.parentElement.dataset.weekday.slice(0, 3);
    const message = `${date}.${month}<br>${weekday}`;
    const text = document.createElement('div');
    text.classList.add('cell-text');
    text.innerHTML = message;
    firstChild.append(text);
  }
});

calendar.addEventListener('mouseout', (e) => {
  const text = document.querySelector('.cell-text');
  const parent = text.parentElement;
  parent.removeChild(text);
  const target = e.target.closest('.date');
  const firstChild = target ? target.children[0] : null;
  if(firstChild) firstChild.classList.remove('day_hover');
});

