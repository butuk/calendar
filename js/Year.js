import {months, weekDays} from "../data/data.js";
import {createNameCell, makeTilt, makeIndent} from "./functions.js";
import {Day} from "./Day.js";

export class Year {
  constructor() {
    this.weekLength = 7;
    this.indent = 3;
    this.monthsAmount = 12;
    this.days = [];
    this.monthsNames = Object.keys(months);

    let weekDayCount = 0;
    for (let month = 0; month <= this.monthsAmount - 1; month++) {
      const monthObj = Object.values(months)[`${month}`];
      for (let date = 1; date <= monthObj.daysAmount; date++) {
        console.log(weekDayCount);
        const day = new Day(weekDays[weekDayCount], this.monthsNames[month], date);
        day.monthName = monthObj.name;
        this.weekLength-1 <= weekDayCount ? weekDayCount = 0 : weekDayCount++;
        this.days.push(day);

      }
    }
  }

  renderIn(block, language) {
    this.html = block;
    makeIndent(this.html, this.indent);

    let index = 0;
    for (let month = 0; month <= this.monthsAmount - 1; month++) {
      const monthObj = Object.values(months)[`${month}`];
      const monthName = monthObj.name[`${language}`].charAt(0).toUpperCase();

      for (let cell = 0; cell <= 31; cell++) {
        if (cell === 0) {
          createNameCell(this.html, monthName);
        } else {
          if (cell <= monthObj.daysAmount) {
            const day = this.days[index];
            day.renderIn(this.html);
            day.html.dataset.month = day.month;
            day.html.dataset.date = day.date;
            day.html.dataset.kind = day.kind;
            index++;
          } else {
            new Day('blank').renderIn(this.html);
          }
        }
      }
    }
    makeTilt(this.html);
  }

}
