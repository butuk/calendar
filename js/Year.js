import { months, weekDays } from "../data/commonData.js";
import {weekDaysNames} from '../data/weekdaysNames.js';
import { createNameCell, makeTilt, makeIndent } from "./functions.js";
import { Day } from "./Day.js";

export class Year {
  constructor() {
    let current = new Date();
    this.currentMonth = current.toLocaleString('default', { month: 'short' });
    this.currentDate = current.getDate();
  }

  createDefault() {
    this.weekLength = 7;
    this.monthsAmount = 12;
    this.days = [];
    this.monthsNames = Object.keys(months);
    let weekDayCount = 0;
    for (let month = 0; month <= this.monthsAmount - 1; month++) {
      const monthObj = Object.values(months)[`${month}`];
      for (let date = 1; date <= monthObj.daysAmount; date++) {
        const day = new Day(
          weekDays[weekDayCount],
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
    return this
  }

  switchTo(country) {
    for (let item of country) {
      const fullDate = new Date(item.date);
      const month = fullDate.toLocaleString('default', { month: 'short' });
      const date = fullDate.getDate();
      for (let day of this.days) {
        if(day.date === date && day.month === month) {
          day.kind = item.kind;
        }
      }
    }

    return this
  }

  renderIn(block, cellAmount, indent, language) {
    makeIndent(block, indent);

    let index = 0;
    for (let month = 0; month <= this.monthsAmount - 1; month++) {
      const monthObj = Object.values(months)[`${month}`];
      const monthName = monthObj.name[`${language}`].charAt(0).toUpperCase();
      createNameCell(block, monthName);
      for (let cell = 1; cell <= cellAmount; cell++) {
        if (cell <= monthObj.daysAmount) {
          const day = this.days[index];

          day.renderIn(block);
          const element = day.html.firstChild;
          if (day.month === this.currentMonth && day.date === this.currentDate) {
            element.classList.add('date-current')
          }
          element.dataset.monthNumber = monthObj.num;
          element.dataset.month = day.monthName[`${language}`];
          element.dataset.shortWeekday = day.weekDay[`${language}`].short;
          element.dataset.date = day.date;
          element.dataset.kind = day.kind;
          index++;
        } else {
          new Day("blank").renderIn(block);
        }
      }
    }
    makeTilt(block);
    this.html = block;
  }

  clearRender() {
    this.html.innerHTML = "";
  }
}
