import { months } from "../data/months.js";
import { weekdays } from "../data/weekdays.js";
import { holidays } from "../data/holidays.js";
import { floatingHolidaysDates } from "../data/floatingHolidaysDates.js";
import { daysExchanges } from "../data/daysExchanges.js";
import { createElement } from "./functions.js";

export class YearVisualization {
  constructor(year, country, language) {
    this.year = year;
    this.country = country;
    this.language = language;

    this.localize(this.country);
  }

  translate(language) {
    this.language = language;
    for (let day of this.year.days) {
      const month = day.month;
      day.monthName = months[month - 1][this.language];
      const weekday = day.weekday;
      day.weekdayNameShort =
        weekdays[weekday]["translate"][this.language]["short"];
      day.weekdayNameLong =
        weekdays[weekday]["translate"][this.language]["long"];
    }
    if (this.specialDays) {
      for (let specialDay in this.specialDays) {
        const day = this.year.yearDatesMap.get(
          `${this.year.yearNum}-${specialDay}`,
        );
        day.holiday = this.specialDays[specialDay][this.language];
      }
    }
    //console.log(this);
    return this;
  }

  localize(country) {
    //Distinguish working and non-working days
    for (let day of this.year.days) {
      day.working = weekdays[day.weekday].working;
    }
    const holidaysItems = holidays[country];
    //Merge steady holidays with floating this year holidays
    if (floatingHolidaysDates[country]) {
      const holidaysFloats = floatingHolidaysDates[country];
      for (let key in holidaysFloats) {
        if (holidaysItems.hasOwnProperty(key)) {
          const newKey = holidaysFloats[key][this.year.yearNum];
          holidaysItems[newKey] = holidaysItems[key];
          delete holidaysItems[key];
        }
      }
    }
    //Make holidays non-working days
    for (let date in holidaysItems) {
      const day = this.year.yearDatesMap.get(`${this.year.yearNum}-${date}`);

      day.working = false;
    }
    //Handle other special days types changes
    if (daysExchanges[country]) {
      const exchangeFrom = {};
      const exchangeTo = {};
      const workDaysMask = daysExchanges[country].working;
      const daysNames = daysExchanges[country].translate;
      const changes = daysExchanges[country].dates[this.year.yearNum];
      for (let change of changes) {
        exchangeFrom[change["from"]] = daysNames["from"];
        exchangeTo[change["to"]] = daysNames["to"];
      }
      for (let item of changes) {
        const fromDay = this.year.yearDatesMap.get(
          `${this.year.yearNum}-${item.from}`,
        );
        const toDay = this.year.yearDatesMap.get(
          `${this.year.yearNum}-${item.to}`,
        );
        fromDay.working = workDaysMask.from;
        toDay.working = workDaysMask.to;
      }
      //Gather all the special days in one object
      this.specialDays = { ...holidaysItems, ...exchangeFrom, ...exchangeTo };
    } else {
      this.specialDays = holidaysItems;
    }
    //console.log(this);
    this.country = country;
    this.translate(this.language);
    return this;
  }

  renderIn(block) {
    const delta = 3;
    const content = document.querySelector(`.${block}`);
    const section = createElement("section", "slider");
    const slides = createElement("div", "slides");
    for (let i = 0; i < 3; i++) {
      const slide = createElement("div", "slide");
      //Creating table header
      for (let columnNum = 2; columnNum <= 32; columnNum++) {
        const hr = createElement("div", "name");
        hr.style.gridRow = "1";
        hr.style.gridColumn = `${columnNum}`;
        hr.textContent = `${columnNum - 1}`;
        hr.style.top = `${delta * columnNum}%`;
        slide.append(hr);
      }
      //Creating months names
      for (let rowNum = 0; rowNum < 12; rowNum++) {
        const monthName = createElement("div", "name");
        monthName.style.gridColumn = "1";
        monthName.style.gridRow = `${rowNum + 2}`;
        monthName.textContent = months[rowNum][this.language]
          .charAt(0)
          .toUpperCase();
        console.log();
        slide.append(monthName);
      }
      //Creating table body
      for (let day of this.year.days) {
        const cell = createElement("div", "cell");
        cell.style.gridRow = day.month + 1;
        cell.style.gridColumn = day.date + 1;
        cell.style.top = `${delta * day.date}%`;
        slide.append(cell);
      }
      slides.append(slide);
    }
    section.append(slides);
    content.append(section);
  }
}
