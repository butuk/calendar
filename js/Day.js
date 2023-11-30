export class Day {

  constructor() {
  }

  render(where) {
    this.html = createElement('div', 'date');
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