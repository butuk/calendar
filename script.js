import { Year } from "./js/Year.js";
import { YearVersion } from "./js/YearVersion.js";
import { YearVisualization } from "./js/YearVisualization.js";
import { InterfaceHeader } from "./js/InterfaceHeader.js";

//Year
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
let year;

// User's browser tab title
document.title = `${currentDate.getDate()}.${
  currentDate.getMonth() + 1
}.${currentYear}`;

// Language and country
let language;
let country;
let savedYear = localStorage.getItem("year");
let savedLanguage = localStorage.getItem("language");
let savedCountry = localStorage.getItem("country");
year = savedYear ? savedYear : currentYear;
language = savedLanguage ? savedLanguage : "eng";
country = savedCountry ? savedCountry : "poland";

// Calendar visualization
const newYear = new Year(2025);

const version = new YearVersion(newYear, country, language);
console.log(version);

const visualization = new YearVisualization(version, "content");

// Interface
new InterfaceHeader(version, visualization, "header");
