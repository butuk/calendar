export class Day {
  constructor(type) {
    this.type = type;
  }

  render(place, padding) {
    const element = document.createElement('div');
    element.classList.add('cell');
    element.style.top = `${padding}%`;
    const day = document.createElement('div');
    day.classList.add('day');
    const image = document.createElement('img');
    image.src = `./img/${this.image()}`;
    day.append(image);
    element.append(day);
    place.append(element);
  }

  image() {
      if(this.type === 'weekend') {
        return 'circle_red.svg';
      } else {
        return 'circle_grey.svg';
      }
  }
}