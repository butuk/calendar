import { markElementAmongOthers } from "./js/functions.js";
import { CalendarHead } from "./js/CalendarHead.js";
import { Year } from "./js/Year.js";

// Calendar head
const head = new CalendarHead();
const hr = document.querySelector(".hr");
head.renderIn(hr, 31, 3);
const year = new Year();

// Calendar
const calendar = document.querySelector(".grid");
year.renderIn(calendar, 31, 3, "eng");

// Switching languages
const languages = document.querySelector(".languages");
languages.addEventListener("click", (e) => {
  const target = e.target.closest(".language");
  markElementAmongOthers(target, "language_active");
  year.clearRender();
  year.renderIn(calendar, 31, 3, target.dataset.language);
});


calendar.addEventListener("mouseover", (e) => {
  const target = e.target.closest(".day");
  const firstChild = target ? target.children[0] : null;
  firstChild.classList.add("day_hover");
});

calendar.addEventListener("mouseout", (e) => {
  const target = e.target.closest(".day");
  const firstChild = target ? target.children[0] : null;
  firstChild.classList.remove("day_hover");
});

