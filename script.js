import { markElementAmongOthers, createElement } from "./js/functions.js";
import { CalendarHead } from "./js/CalendarHead.js";
import { Year } from "./js/Year.js";
import { holidays } from "./data/holidays.js";
import { interfaceTexts } from "./data/interfaceTexts.js";

let language = "eng";
let country = holidays["poland"];

// Credits
function makeCredits(language) {
  const about = document.querySelector(".about");
  about.textContent = interfaceTexts.credits[`${language}`];
  const author = document.querySelector(".author");
  const myName = interfaceTexts.author[`${language}`];
  author.textContent = `©${myName}`;
}
makeCredits(language);

// Calendar
const head = new CalendarHead();
const year = new Year();

// Layout creation
const slides = document.querySelector(".slides");
for (let i = 0; i < 3; i++) {
  const header = createElement("section", "header");
  const logo = createElement("div", "logo");
  logo.classList.add("day");
  logo.textContent = "2024";
  const slide = createElement("section", "slide");
  const hr = createElement("section", "hr");
  const calendar = createElement("section", "grid");

  head.renderIn(hr, 31, 3);

  year.createDefault();
  year.switchTo(country);
  year.renderIn(calendar, 31, 3, language);

  header.append(logo);
  slide.append(header);
  slide.append(hr);
  slide.append(calendar);
  slides.append(slide);

  // Days on hover
  calendar.addEventListener("mouseover", (e) => {
    const target = e.target.closest(".date");
    const firstChild = target ? target.children[0] : null;

    if (firstChild && !firstChild.classList.contains("blank")) {
      firstChild.classList.add("day_hover");

      const date = firstChild.parentElement.dataset.date;
      const month = firstChild.parentElement.dataset.monthNumber;
      const weekday = firstChild.parentElement.dataset.shortWeekday;
      const message = `${weekday}<br>${date}.${month}`;
      const text = document.createElement("div");
      text.classList.add("cell-text");
      text.innerHTML = message;
      firstChild.append(text);
    }
  });

  calendar.addEventListener("mouseout", (e) => {
    const text = document.querySelector(".cell-text");
    const parent = text && text.parentElement ? text.parentElement : null;
    if (parent) {
      parent.removeChild(text);
    }
    const target = e.target.closest(".date");
    const firstChild = target ? target.children[0] : null;
    if (firstChild) firstChild.classList.remove("day_hover");
  });
}

const calendars = document.querySelectorAll(".grid");

// Switching countries
const countries = document.querySelector(".countries");
countries.addEventListener("click", (e) => {
  const target = e.target.closest(".country");
  markElementAmongOthers(target, "country_active");
  year.createDefault();
  country = holidays[`${target.dataset.country}`];
  year.switchTo(country);
  for (let calendar of calendars) {
    calendar.innerHTML = "";
    year.renderIn(calendar, 31, 3, language);
  }
});

// Switching languages
const languages = document.querySelector(".languages");
languages.addEventListener("click", (e) => {
  const target = e.target.closest(".language");
  markElementAmongOthers(target, "language_active");

  language = target.dataset.language;
  for (let calendar of calendars) {
    calendar.innerHTML = "";
    year.renderIn(calendar, 31, 3, language);
  }
  makeCredits(language);
});

// Slider
let isDragging = false;
let offsetX;


document.addEventListener("mousedown", handleTouchStart);
document.addEventListener("touchstart", handleTouchStart);

document.addEventListener("mouseup", handleTouchEnd);
document.addEventListener("touchend", handleTouchEnd);

function handleTouchStart(event) {
  isDragging = true;
  offsetX = event.clientX + Math.abs(slides.getBoundingClientRect().left);

  document.addEventListener("mousemove", handleTouchMove);
  document.addEventListener("touchmove", handleTouchMove);
  document.body.style.cursor = 'grabbing';
}

function handleTouchMove(event) {

  const window = document.documentElement.clientWidth;

  if (isDragging) {
    let left = event.clientX - offsetX;
      if(slides.getBoundingClientRect().left < (-2 * window) || slides.getBoundingClientRect().left > 0) {
        // Make slides rearrange
      }
    slides.style.left = left + "px";
  }
}

function handleTouchEnd() {
  isDragging = false;
  document.body.style.cursor = 'grab';
}
