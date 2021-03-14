function yearsToWeeks(years) {
  return years * 52;
}

function weeksBetween(start, end) {
  let a = new Date(start);
  let b = new Date(end);
  return Math.floor(Math.abs((b - a) / 60000 / 60 / 24 / 7));
}

function weeksForYears(start, years) {
  let d = new Date(start);
  let dY = d.getFullYear();
  let count = 0;
  let dTs = Math.round(d.getTime() / 1000);
  let arr = [{ date: d.toLocaleDateString(), timeStamp: dTs }];

  for (let i = 2; i <= yearsToWeeks(years); i++) {
    if ((i - 1) % 52 === 0) {
      dY++;
      d.setDate(start.getDate());
      d.setFullYear(dY);

      dTs = Math.round(d.getTime() / 1000);
      let obj = { date: d.toLocaleDateString(), timeStamp: dTs };
      arr.push(obj);
    } else {
      d.setDate(d.getDate() + 7);
      dTs = Math.round(d.getTime() / 1000);
      let obj = { date: d.toLocaleDateString(), timeStamp: dTs };
      arr.push(obj);
    }
  }
  return arr;
}

function beforeToday(array, callback) {
  array.forEach((d, i) => {
    let w = new Date(d.timeStamp * 1000);
    if (w <= new Date()) {
      callback(d, i);
    }
  });
}

function liBlobsHTML(container, date, index) {
  let ol = document.getElementById(container);
  let li = document.createElement("li");
  li.setAttribute("title", date);
  li.setAttribute("id", `item-${index}`);
  ol.appendChild(li);
}

function liBlobHighlight(date, item) {
  let element = document.getElementById(`item-${item}`);
  element.classList.add("highlight");
}

document.getElementById("submit").addEventListener("click", function () {
  document.getElementById("weeks_list").innerHTML = ""; // reset
  const now = new Date();
  const dob = new Date(document.getElementById("dob").value);
  let expectedYears = document.getElementById("expectedYears").value;

  console.log(`selected date : ${dob}`);
  console.log(`todays date : ${now}`);
  console.log(`weeks alive : ${weeksBetween(dob, now)}`);

  document.getElementById("headInfo").innerHTML = `
<h2>you have been alive for ${weeksBetween(
    dob,
    now
  )} weeks. each dot is 1 week, each row is 1 year.</h2>
<p>based on a life expectancy of ${expectedYears} years</p>
`;

  let allWeeks = weeksForYears(dob, expectedYears);
  allWeeks.forEach((d, i) => {
    liBlobsHTML("weeks_list", d.date, i);
  });

  beforeToday(allWeeks, liBlobHighlight);
});
