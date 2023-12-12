import {createNameCell, makeIndent, makeTilt} from "./functions.js";
import {Day} from "./Day.js";

export class CalendarHead {
  constructor() {

  }
  renderIn(block, cellAmount, indent) {
    makeIndent(block, indent);
    for (let name = 0; name <= cellAmount; name++) {
      name > 0 ? createNameCell(block, `${name}`) : new Day('blank').renderIn(block);
    }
    makeTilt(block);
  }
}