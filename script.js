import {Year} from "./js/Year.js";

const calendar = document.querySelector('.calendar');
const year = new Year();
console.log(year);
//calendar.append(year);

/*const delta = 3;



let k = 0;
for (let j = 0; j < 13; j++) {
  let padding = 0;
  for (let i = 0; i < 32; i++) {
    new Day(`${year[k].kind}`).render(calendar, padding)
    padding += delta;
    k++;
  }
}*/
