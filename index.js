function yearsToWeeks(years) {
  return years * 52;
};

function weeksBetween(start, end) {
  let a = new Date(start);
  let b = new Date(end);
  return Math.floor(Math.abs((b - a) / 60000 / 60 / 24 / 7));
};

module.exports =  {yearsToWeeks, weeksBetween };