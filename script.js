import { markElementAmongOthers } from "./js/functions.js";
import { Year } from "./js/Year.js";
import { YearVisualization } from "./js/YearVisualization.js";

// Browser tab title
const currentDate = new Date();
document.title = `${currentDate.getDate()}.${
  currentDate.getMonth() + 1
}.${currentDate.getFullYear()}`;

// Language and country
let language;
let country;
let savedLanguage = localStorage.getItem("language");
let savedCountry = localStorage.getItem("country");

if (savedLanguage) {
  language = savedLanguage;
  const languages = document.querySelectorAll(".language");
  for (let item of languages) {
    if (item.dataset.language === savedLanguage) {
      item.classList.add("language_active");
    } else {
      item.classList.remove("language_active");
    }
  }
} else {
  language = "eng"; //by default
}

if (savedCountry) {
  country = savedCountry;
  //country = _holidays[savedCountry];
  const countries = document.querySelectorAll(".country");
  for (let item of countries) {
    if (item.dataset.country === savedCountry) {
      item.classList.add("country_active");
    } else {
      item.classList.remove("country_active");
    }
  }
} else {
  country = "poland"; //by default
}

// Calendar
const newYear = new Year();
const visualization = new YearVisualization(newYear, country, language);
visualization.render("content");

// Switching countries
const countries = document.querySelector(".countries");
countries.addEventListener("click", (e) => {
  const target = e.target.closest(".country");
  markElementAmongOthers(target, "country_active");
  if (target) {
    localStorage.setItem("country", target.dataset.country);
  }
  visualization.localize(target.dataset.country);
  visualization.render();
});

// Switching languages
const languages = document.querySelector(".languages");
languages.addEventListener("click", (e) => {
  const target = e.target.closest(".language");
  markElementAmongOthers(target, "language_active");
  if (target) {
    language = target.dataset.language;
    localStorage.setItem("language", language);
  }
  visualization.translate(language);
  visualization.render();
});

// On scrolling
document.addEventListener("wheel", visualization.handleWheelEvent, {
  passive: false,
});
/*

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
  document.body.style.cursor = "grabbing";
}

function handleTouchMove(event) {
  const window = document.documentElement.clientWidth;

  if (isDragging) {
    let left = event.clientX - offsetX;
    let leftBorder = -2 * window;
    if (
      slides.getBoundingClientRect().left < leftBorder ||
      slides.getBoundingClientRect().left > 0
    ) {
      slides.style.left = window + "px";
      offsetX = event.clientX + Math.abs(slides.getBoundingClientRect().left);
    }
    slides.style.left = left + "px";
  }
}

function handleTouchEnd() {
  isDragging = false;
  document.body.style.cursor = "grab";
}
*/
