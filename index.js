function yearsToWeeks(years) {
  return years * 52;
}

function weeksBetween(start, end) {
  let a = new Date(start);
  let b = new Date(end);
  return Math.floor(Math.abs((b - a) / 60000 / 60 / 24 / 7));
}

function weeksForYears (start, years) {
  let d = new Date(start);
  let dTs = Math.round(d.getTime() / 1000);
  let arr = [
    { 'date': d.toLocaleDateString(), 'timeStamp': dTs },
  ];

  for (let i = 2; i <= yearsToWeeks(years); i++) {
    d.setDate(d.getDate() + 7);
    dTs = Math.round(d.getTime() / 1000);
    let obj = { 'date': d.toLocaleDateString(), 'timeStamp': dTs };
    arr.push(obj);
  }
  return arr;
}

function beforeToday(array, callback){
  array.forEach((d, i) => {
    let w = new Date(d.timeStamp * 1000);
    if (w <= (new Date())) {
    callback(d, i);
    }
  });
}

module.exports = { yearsToWeeks, weeksBetween, weeksForYears, beforeToday };