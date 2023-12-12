import {months, weekDays} from "../data/data.js";
import {createNameCell, makeTilt, makeIndent} from "./functions.js";
import {Day} from "./Day.js";

export class Year {
  constructor() {

    this.weekLength = 7;

    this.monthsAmount = 12;
    this.days = [];
    this.monthsNames = Object.keys(months);

    let weekDayCount = 0;
    for (let month = 0; month <= this.monthsAmount - 1; month++) {
      const monthObj = Object.values(months)[`${month}`];
      for (let date = 1; date <= monthObj.daysAmount; date++) {
        const day = new Day(weekDays[weekDayCount], this.monthsNames[month], date);
        day.monthName = monthObj.name;
        this.weekLength-1 <= weekDayCount ? weekDayCount = 0 : weekDayCount++;
        this.days.push(day);

      }
    }
  }

  renderIn(block, cellAmount, indent, language) {
    makeIndent(block, indent);

    let index = 0;
    for (let month = 0; month <= this.monthsAmount - 1; month++) {
      const monthObj = Object.values(months)[`${month}`];
      const monthName = monthObj.name[`${language}`].charAt(0).toUpperCase();

      for (let cell = 0; cell <= cellAmount; cell++) {
        if (cell === 0) {
          createNameCell(block, monthName);
        } else {
          if (cell <= monthObj.daysAmount) {
            const day = this.days[index];
            day.renderIn(block);
            day.html.dataset.month = day.month;
            day.html.dataset.date = day.date;
            day.html.dataset.kind = day.kind;
            index++;
          } else {
            new Day('blank').renderIn(block);
          }
        }
      }
    }
    makeTilt(block);
    this.html = block;
  }

  clearRender() {
    this.html.innerHTML = '';
  }
}
