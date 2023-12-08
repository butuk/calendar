import {months, weekDays} from "../data/data.js";
import {createNameCell, makeTilt, makeIndent} from "./functions.js";
import {Day} from "./Day.js";

export class Year {
  constructor() {
    this.weekLength = 7;
    this.indent = 3;
    this.monthsAmount = 12;
    this.days = [];

    for (let month = 0; month <= this.monthsAmount - 1; month++) {
      let weekDayCount = 0;
      const monthObj = Object.values(months)[`${month}`];
      const monthsNames = Object.keys(months);
      for (let date = 1; date <= monthObj.daysAmount; date++) {
        const day = new Day(weekDays[weekDayCount], monthsNames[month], date);
        day.monthName = monthObj.name;
        this.weekLength-1 <= weekDayCount ? weekDayCount = 0 : weekDayCount++;
        this.days.push(day);
      }
    }
  }

  render(block) {
    this.html = document.querySelector(`${block}`);
    makeIndent(this.html, this.indent);

    for (let month = 0; month <= 11; month++) {

      let mnth = Object.values(months)[`${month}`];
      let monthName = mnth[`${language}`].charAt(0).toUpperCase();

      for (let cell = 0; cell <= 31; cell++) {
        if (cell === 0) {
          createNameCell(calendar, monthName);
        } else {
          if (cell <= mnth.daysAmount) {
            const day = new Day(weekDays[weekDayCount], mnth[`${language}`], cell);
            day.kind = weekDays[weekDayCount];
            weekDayCount >= weekDays.length - 1 ? weekDayCount = 0 : weekDayCount++;
            day.renderIn(calendar);

            day.html.dataset.month = day.month;
            day.html.dataset.date = day.date;
            day.html.dataset.kind = day.kind;
          } else {
            new Day('blank').renderIn(calendar);
          }
        }
      }
    }

    makeTilt(this.html);
  }

}

/*
function buildCalenar(){
  makeIndent(calendar, 3);
  let weekDayCount = 0;

  for (let month = 0; month <= 11; month++) {
    let mnth = Object.values(months)[`${month}`];
    let monthName = mnth[`${language}`].charAt(0).toUpperCase();
    for (let cell = 0; cell <= 31; cell++) {
      if (cell === 0) {
        createNameCell(calendar, monthName);
      } else {
        if (cell <= mnth.daysAmount) {
          const day = new Day(weekDays[weekDayCount], mnth[`${language}`], cell);
          day.kind = weekDays[weekDayCount];
          weekDayCount >= weekDays.length - 1 ? weekDayCount = 0 : weekDayCount++;
          day.renderIn(calendar);

          day.html.dataset.month = day.month;
          day.html.dataset.date = day.date;
          day.html.dataset.kind = day.kind;
        } else {
          new Day('blank').renderIn(calendar);
        }
      }
    }
  }
  makeTilt(calendar);
}*/
