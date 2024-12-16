import { _months, _weekDays } from "../data/_commonData.js";
import { weekDaysNames } from "../data/weekdaysNames.js";
import { createNameCell, makeTilt, makeIndent } from "./functions.js";
import { _Day } from "./_Day.js";

export class _Year {
  constructor() {
    this.current = new Date();
    this.currentMonth = this.current.toLocaleString("default", {
      month: "short",
    });
    if (this.currentMonth.length > 3) {
      this.currentMonth = this.currentMonth.slice(0, -1);
    }
    this.currentDate = this.current.getDate();
  }

  createDefault() {
    this.weekLength = 7;
    this.monthsAmount = 12;
    this.days = [];
    this.monthsNames = Object.keys(_months);
    let weekDayCount = 0;
    for (let month = 0; month <= this.monthsAmount - 1; month++) {
      const monthObj = Object.values(_months)[`${month}`];
      for (let date = 1; date <= monthObj.daysAmount; date++) {
        const day = new _Day(
          _weekDays[weekDayCount],
          this.monthsNames[month],
          date,
        );
        day.monthName = monthObj.name;
        day.weekDay = weekDaysNames[weekDayCount];
        weekDayCount =
          this.weekLength - 1 <= weekDayCount ? 0 : weekDayCount + 1;
        this.days.push(day);
      }
    }
    //console.log(this);
    return this;
  }

  switchTo(country) {
    for (let item of country) {
      const fullDate = new Date(item.date);
      const month = fullDate.toLocaleString("default", { month: "short" });
      const date = fullDate.getDate();
      for (let day of this.days) {
        if (day.date === date && day.month === month) {
          day.kind = item.kind;
        }
      }
    }

    return this;
  }

  renderIn(block, cellAmount, indent, language) {
    makeIndent(block, indent);

    let index = 0;
    for (let month = 0; month <= this.monthsAmount - 1; month++) {
      const monthObj = Object.values(_months)[`${month}`];
      const monthName = monthObj.name[`${language}`].charAt(0).toUpperCase();
      createNameCell(block, monthName);
      for (let cell = 1; cell <= cellAmount; cell++) {
        if (cell <= monthObj.daysAmount) {
          const day = this.days[index];

          day.renderIn(block);
          const element = day.html.firstChild;

          if (
            monthObj.num <= this.current.getMonth() ||
            (day.month === this.currentMonth &&
              day.date < this.current.getDate())
          ) {
            element.parentElement.classList.add("past");
          }

          // Mark current day
          if (
            day.month === this.currentMonth &&
            day.date === this.currentDate
          ) {
            element.classList.add("date-current");
          }

          element.dataset.monthNumber = monthObj.num;
          element.dataset.month = day.monthName[`${language}`];
          element.dataset.shortWeekday = day.weekDay[`${language}`].short;
          element.dataset.date = day.date;
          element.dataset.kind = day.kind;

          index++;
        } else {
          new _Day("blank").renderIn(block);
        }
      }
    }
    makeTilt(block, 32);
    this.html = block;
  }
}
