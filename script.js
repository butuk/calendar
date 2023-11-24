

const calendar = document.querySelector('.calendar');

for (let j = 0; j < 13; j++) {
  const delta = 3.13;
  let padding = 0;
  for (let i = 0; i < 32; i++) {
    createCell(padding);
    padding += delta;
  }
}

function createCell(padding) {
    const element = document.createElement('div');
    element.classList.add('cell');
    element.style.paddingTop = `${padding}%`;
    const image = document.createElement('img');
    image.src = '/img/circle.svg';
    element.append(image);
    calendar.append(element);
}