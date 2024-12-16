import { createElement } from "./functions.js";

export class _Day {
  constructor(kind, month, date) {
    this.month = month ? month : null;
    this.date = date ? date : null;
    this.kind = kind ? kind : null;
    //console.log(this);
  }

  renderIn(where) {
    this.html = createElement('div', 'cell');
    const date = createElement('div', 'date');
    const particularDay = createElement('div', `${this.kind}`);
    date.append(particularDay);
    this.html.append(date);
    where.append(this.html);
  }
}
