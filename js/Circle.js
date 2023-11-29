export class Circle {
  constructor(cx, cy, r, fillColor, borderColor, borderWidth) {
    const svgns = "http://www.w3.org/2000/svg";
    this.circle = document.createElementNS(svgns, 'circle');

    this.circle.setAttribute('cx', cx);
    this.circle.setAttribute('cy', cy);
    this.circle.setAttribute('r', r);
    this.circle.setAttribute('fill', fillColor);
    this.circle.setAttribute('stroke', borderColor);
    this.circle.setAttribute('stroke-width', borderWidth);

    const container = document.createElement('svg');
    container.style.width = '100px';
    container.style.height = '100px';
    container.append(this.circle);

    return container;
  }
}