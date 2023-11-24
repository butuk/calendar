export const year = [];

const monthsLengths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

fillTheYear();

function fillTheYear() {
  let dayCount = 0;
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < monthsLengths[i]; j++) {
      const object = new Object();
      object.month = i;
      object.day = j;

      if (dayCount !== 5 && dayCount !== 6) {
        object.kind = 'workday';
        dayCount++;
      } else if (dayCount === 5) {
        object.kind = 'weekend';
        dayCount++;
      } else {
        object.kind = 'weekend';
        dayCount = 0;
      }

      year.push(object);
    }
  }
}