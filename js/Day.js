import { createElement } from "./functions.js";

export class Day {
  constructor(kind, month, date) {
    this.month = month ? month : null;
    this.date = date ? date : null;
    this.kind = kind ? kind : null;
  }

  renderIn(where) {
    this.html = createElement("div", "day");
    const particularDay = createElement("div", `${this.kind}`);
    this.html.append(particularDay);
    where.append(this.html);
  }
}
