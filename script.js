import { Year } from "./js/Year.js";
import { YearVersion } from "./js/YearVersion.js";
import { YearVisualization } from "./js/YearVisualization.js";
import { Headline } from "./js/Headline.js";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

// User's browser tab title
document.title = `${currentDate.getDate()}.${
  currentDate.getMonth() + 1
}.${currentYear}`;

// Language and country
let language;
let country;
let savedLanguage = localStorage.getItem("language");
let savedCountry = localStorage.getItem("country");
language = savedLanguage ? savedLanguage : "eng";
country = savedCountry ? savedCountry : "poland";

// Calendar visualization
const year = new Year(currentYear);
const version = new YearVersion(year, country, language);
const visualization = new YearVisualization(version, "content");

// Interface
new Headline(version, visualization, "header");
