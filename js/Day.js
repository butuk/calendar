export class Day {

  constructor() {
  }

  render(place, padding) {
    const element = document.createElement('div');
    const day = document.createElement('div');
    const image = document.createElement('img');

    element.classList.add('cell');

    element.style.top = `${padding}%`;

    day.classList.add('day');

    image.src = `./img/${this.image()}`;
    day.append(image);
    element.append(day);
    place.append(element);
  }

  image() {
    return `${this.kind}.svg`;
  }
}