export class Day {

  constructor(month, date, kind) {
      this.month = month;
      this.date = date;
      this.kind = kind;
  }

  renderIn(where) {
    this.html = createElement('div', 'day');
    const particularDay = createElement('div', `${this.kind}`)
    this.html.append(particularDay);
    where.append(this.html);
  }

}

function createElement(element, className) {
  const result = document.createElement(`${element}`);
  className ? result.classList.add(`${className}`) : null;
  return result;
}