import { createNameCell, makeIndent, makeTilt } from "./functions.js";
import { Day } from "./Day.js";

export class CalendarHead {
  constructor() {}
  renderIn(block, cellAmount, indent) {
    makeIndent(block, indent);
    new Day("blank").renderIn(block);
    for (let name = 1; name <= cellAmount; name++) {
      createNameCell(block, `${name}`);
    }
    makeTilt(block);
  }
}
