import {Day} from "./Day.js";
import {months} from "../data/dictionaries.js";
import {weekDays} from "../data/dictionaries.js";

export class Year {
  constructor() {
  this.fill();
  }

  fill() {
    this.days = [];
    let dayCount = 0;
    for (let month of Object.values(months)) {
      for (let day = 0; day < month.daysAmount; day++) {
        const element = new Day();
        element.month = month.eng;
        element.day = day+1;
        element.kind = weekDays[dayCount];
        dayCount >= weekDays.length-1 ? dayCount = 0 : dayCount++;
        this.days.push(element);
      }
    }
    return this.days;
  }

}