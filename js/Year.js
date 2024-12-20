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
    const yearNum = year;
    this.yearDatesMap = new Map(
      this.days.map(function (obj) {
        const hashKey = `${yearNum}-${obj.month}-${obj.date}`;
        return [hashKey, obj];
      }),
    );
  }

  translate(language) {
    for (let day of this.days) {
      const month = day.month;
      day.monthName = months[month - 1][language];
      const weekday = day.weekday;
      day.weekdayNameShort = weekdays[weekday]["translate"][language]["short"];
      day.weekdayNameLong = weekdays[weekday]["translate"][language]["long"];
    }
    if (this.specialDays) {
      for (let specialDay in this.specialDays) {
        const day = this.yearDatesMap.get(`${this.year}-${specialDay}`);
        day.holiday = this.specialDays[specialDay][language];
      }
    }
    //console.log(this);
    return this;
  }

  localize(country) {
    //Distinguish working and non-working days
    for (let day of this.days) {
      day.working = weekdays[day.weekday].working;
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
    //Handle other special days types changes
    if (daysExchanges[country]) {
      const exchangeFrom = {};
      const exchangeTo = {};
      const workDaysMask = daysExchanges[country].working;
      const daysNames = daysExchanges[country].translate;
      const changes = daysExchanges[country].dates[this.year];
      for (let change of changes) {
        exchangeFrom[change["from"]] = daysNames["from"];
        exchangeTo[change["to"]] = daysNames["to"];
      }
      for (let item of changes) {
        const fromDay = this.yearDatesMap.get(`${this.year}-${item.from}`);
        const toDay = this.yearDatesMap.get(`${this.year}-${item.to}`);
        fromDay.working = workDaysMask.from;
        toDay.working = workDaysMask.to;
      }
      //Gether all the special days in one object
      this.specialDays = { ...holidaysItems, ...exchangeFrom, ...exchangeTo };
    } else {
      this.specialDays = holidaysItems;
    }
    //console.log(this);
    return this;
  }
}
