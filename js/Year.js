import { Day } from "./Day.js";
import { weekdays } from "../data/weekdays.js";
import { months } from "../data/months.js";
import { holidays } from "../data/holidays.js";
import { floatingHolidaysDates } from "../data/floatingHolidaysDates.js";
import { daysExchanges } from "../data/daysExchanges.js";

export class Year {
  constructor(yearNumber) {
    this.year = yearNumber ? yearNumber : new Date().getFullYear();
    this.days = [];
    const start = new Date(this.year, 0, 1); // January 1st
    const end = new Date(this.year + 1, 0, 1); // January 1st of the next yearNumber
    for (let date = start; date < end; date.setDate(date.getDate() + 1)) {
      const dayNumber = date.getDate();
      const weekday = date.getDay();
      const month = Number(date.getMonth()) + 1;
      const day = new Day(this.year, month, dayNumber, weekday);
      this.days.push(day);
    }
    this.createHashMap(this.year);
  }

  createHashMap(year) {
    const yearNum = this.year;
    this.yearDatesMap = new Map(
      this.days.map(function (obj) {
        const hashKey = `${yearNum}-${obj.month}-${obj.date}`;
        return [hashKey, obj];
      }),
    );
  }

  translate(language) {
    /*this.language = language;
    for (let day of this.days) {
      const month = day.month;
      day.monthName = months[month - 1][language];
      const weekday = day.weekday;
      day.weekdayNameShort = weekdays[weekday][language]["short"];
      day.weekdayNameLong = weekdays[weekday][language]["long"];
      if (day.holiday) {
        day.holidayName = day.holiday[language];
      }
    }*/
    console.log(this);
    return this;
  }

  localize(country) {
    //Distinquish working and non-working days
    for (let day of this.days) {
      day.working = weekdays[country][day.weekday].working;
    }
    const holidaysItems = holidays[country];
    //Merge steady holidays with floating this year holidays
    if (floatingHolidaysDates[country]) {
      const holidaysFloats = floatingHolidaysDates[country];
      for (let key in holidaysFloats) {
        if (holidaysItems.hasOwnProperty(key)) {
          const newKey = holidaysFloats[key][this.year];
          holidaysItems[newKey] = holidaysItems[key];
          delete holidaysItems[key];
        }
      }
    }
    //Make holidays non-working days
    for (let date in holidaysItems) {
      const day = this.yearDatesMap.get(`${this.year}-${date}`);
      day.working = false;
    }
    //Handle other working and non-working days
    if (daysExchanges[country]) {
      const workDaysMask = daysExchanges[country].working;
      const changes = daysExchanges[country].dates[this.year];
      for (let item of changes) {
        const fromDay = this.yearDatesMap.get(`${this.year}-${item.from}`);
        const toDay = this.yearDatesMap.get(`${this.year}-${item.to}`);
        fromDay.working = workDaysMask.from;
        toDay.working = workDaysMask.to;
        console.log(item, fromDay, toDay);
      }
    }
    console.log(this);
    return this;
  }
}
