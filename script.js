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
  const slide = createElement("section", "slide");
  const hr = createElement("section", "hr");
  head.renderIn(hr, 31, 3);
  const calendar = createElement("section", "grid");
  year.createDefault();
  year.switchTo(country);
  year.renderIn(calendar, 31, 3, language);
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
/*const left = document.querySelector('.left');
const right = document.querySelector('.right');

left.addEventListener('click', goLeft)
right.addEventListener('click', goRight);*/

document.addEventListener("animationend", () => {
  slides.classList.remove("toLeft");
  slides.classList.remove("toRight");
  addListeners();
});

document.addEventListener('animationstart', () => {
  removeListeners();
})
//Swipe
/*
let x1 = null;

addSliderListeners();

function goRight() {
  slides.classList.add("toRight");
  removeSliderListeners();
}

function goLeft() {
  slides.classList.add("toLeft");
  removeSliderListeners();
}

function addSliderListeners() {
  //document.addEventListener("mouseout", handleMouseOut);
  document.addEventListener("touchstart", handleTouchStart);
  document.addEventListener("mousedown", handleTouchStart);
  document.addEventListener("touchmove", handleTouchMove);
  document.addEventListener("mousemove", handleTouchMove);
}

function removeSliderListeners() {
  //document.removeEventListener("mouseout", handleMouseOut);
  document.removeEventListener("touchstart", handleTouchStart);
  document.removeEventListener("mousedown", handleTouchStart);
  document.removeEventListener("touchmove", handleTouchMove);
  document.removeEventListener("mousemove", handleTouchMove);
}

function handleTouchStart(event) {
  x1 = event.clientX;
}

function handleTouchMove(event) {
  if (!x1) {
    return false;
  }

  let x2 = event.clientX;
  console.log(x2);
  let xDiff = x2 - x1;

  if (xDiff < 0) {
    console.log("left");
    goLeft();
  } else {
    goRight();
    console.log("right");
  }
  x1 = null;
}

function handleMouseOut() {
  removeSliderListeners();
}
*/

// ChatGPT Slider
let startX;

addListeners();
function addListeners() {
  document.addEventListener('mousedown', handleTouchStart);
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('mouseup', handleTouchEnd);
  document.addEventListener('touchend', handleTouchEnd);
}

function removeListeners() {
  document.removeEventListener('mousedown', handleTouchStart);
  document.removeEventListener('touchstart', handleTouchStart);
  document.removeEventListener('mousemove', handleTouchMove);
  document.removeEventListener('touchmove', handleTouchMove);
}

function handleTouchStart(event) {
  if (event.touches) {
    startX = event.touches[0].clientX;
  } else {
    startX = event.clientX;
  }

  document.addEventListener('mousemove', handleTouchMove);
  document.addEventListener('touchmove', handleTouchMove);
}

function handleTouchMove(event) {
  let currentX;

  if (event.touches) {
    currentX = event.touches[0].clientX;
  } else {
    currentX = event.clientX;
  }

  let deltaX = currentX - startX;

  if(deltaX > 0) {
    slides.classList.add("toLeft");
  } else {
    slides.classList.add("toRight");
  }
  startX = currentX;
}

function handleTouchEnd() {
  document.removeEventListener('mousemove', handleTouchMove);
  document.removeEventListener('touchmove', handleTouchMove);
}
