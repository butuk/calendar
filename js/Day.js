import {createElement} from "./functions.js";

export class Day {

  constructor(kind, month, date) {
      month ? this.month = month : null;
      date ? this.date = date : null;
      kind ? this.kind = kind : null;
  }

  renderIn(where) {
    this.html = createElement('div', 'day');
    const particularDay = createElement('div', `${this.kind}`)
    this.html.append(particularDay);
    where.append(this.html);
  }
}

