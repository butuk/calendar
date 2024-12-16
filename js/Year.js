import { Day } from "./Day.js";
import { weekdays } from "../data/weekdays.js";
import { months } from "../data/months.js";
import { holidays } from "../data/holidays.js";
import { floatingHolidaysDates } from "../data/floatingHolidaysDates.js";

export class Year {
  constructor(yearNumber) {
    this.year = yearNumber ? yearNumber : new Date().getFullYear();
    this.days = [];
    const start = new Date(this.year, 0, 1); // January 1st
    const end = new Date(this.year + 1, 0, 1); // January 1st of the next yearNumber
    for (let date = start; date < end; date.setDate(date.getDate() + 1)) {
      const dayNumber = date.getDate();
      const weekday = date.getDay();
      const monthNumber = Number(date.getMonth()) + 1;
      const day = new Day(this.year, monthNumber, dayNumber, weekday);
      day.monthDate = `${monthNumber}-${dayNumber}`;
      day.working = day.weekday !== 0 && day.weekday !== 6;
      this.days.push(day);
    }
  }

  translate(language) {
    this.language = language;
    for (let day of this.days) {
      const month = day.month;
      day.monthName = months[month - 1][language];
      const weekday = day.weekday;
      day.weekdayNameShort = weekdays[weekday][language]["short"];
      day.weekdayNameLong = weekdays[weekday][language]["long"];
      if (day.holiday) {
        day.holidayName = day.holiday[language];
      }
    }
  }

  localize(country) {
    //Handling holidays
    this.country = country;
    const holidaysItems = holidays[country];
    const holidaysFloats = floatingHolidaysDates[country];

    //Holidays with floating dates
    for (let key in holidaysFloats) {
      if (holidaysItems.hasOwnProperty(key)) {
        const newKey = holidaysFloats[key][this.year];
        holidaysItems[newKey] = holidaysItems[key];
        delete holidaysItems[key];
      }
    }
    // Finding a day objects by its monthDate field and set them as holidays
    const daysHashMap = new Map(this.days.map((obj) => [obj.monthDate, obj]));
    for (let date in holidaysItems) {
      const day = daysHashMap.get(date);
      day.working = false;
      day.holiday = holidaysItems[date];
      day.holidayName = day.holiday[this.language];
    }
  }
}
