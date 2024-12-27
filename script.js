import { markElementAmongOthers } from "./js/functions.js";
import { Year } from "./js/Year.js";
import { YearVersion } from "./js/YearVersion.js";
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
const year = new Year();
const version = new YearVersion(year, country, language);
const visualization = new YearVisualization(version, "content");

// Switching countries
const countries = document.querySelector(".countries");
countries.addEventListener("click", (e) => {
  const target = e.target.closest(".country");
  markElementAmongOthers(target, "country_active");
  if (target) {
    localStorage.setItem("country", target.dataset.country);
  }
  version.localize(target.dataset.country);
  visualization.render(version);
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
  version.translate(target.dataset.language);
  visualization.render(version);
});

// On scrolling
document.addEventListener("wheel", visualization.handleWheelEvent, {
  passive: false,
});

// Slider
document.addEventListener("mousedown", visualization.handleGrab);
document.addEventListener("touchstart", visualization.handleGrab);

//-----Should be moved inside the object

// Days on hover
if (visualization && visualization.slides) {
  visualization.slides.addEventListener("mouseover", (e) => {
    const target = e.target.closest(".cell");
    const firstChild = target ? target.children[0] : null;
    if (firstChild) {
      firstChild.classList.add("day_hover");

      const date = firstChild.parentElement.dataset.date;
      const month = firstChild.parentElement.dataset.month;
      const weekday = firstChild.parentElement.dataset.weekday;
      const message = `${weekday}<br>${date}.${month}`;
      const text = document.createElement("div");
      text.classList.add("cell-text");
      text.innerHTML = message;
      firstChild.append(text);
    }
  });

  visualization.slides.addEventListener("mouseout", (e) => {
    const target = e.target.closest(".cell");
    const firstChild = target ? target.children[0] : null;
    if (firstChild) {
      firstChild.firstChild.remove();
      firstChild.classList.remove("day_hover");
    }
  });
}
