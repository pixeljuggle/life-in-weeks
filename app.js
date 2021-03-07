const now = new Date();
const dob = new Date(document.getElementById("dob").value);
let expectedYears = document.getElementById("expectedYears").value;

function weeks_between(start, end) {
  let week = 1000 * 60 * 60 * 24 * 7;
  let start_ms = start.getTime();
  let end_ms = end.getTime();
  let ms_between = end - start;
  return Math.floor(ms_between / week);
}

function weeksInLife(years) {
  let start = new Date(document.getElementById("dob").value);
  let startTimeStamp = Math.round(start.getTime() / 1000);
  let weeksInLife = [
    { date: start.toLocaleDateString(), timeStamp: startTimeStamp },
  ];
  let nWeeks = Math.floor(years * 52);
  for (let i = 2; i <= nWeeks; i++) {
    start.setDate(start.getDate() + 7);
    let startTimeStamp = Math.round(start.getTime() / 1000);
    let weekObject = {
      date: start.toLocaleDateString(),
      timeStamp: startTimeStamp,
    };
    weeksInLife.push(weekObject);
  }
  return weeksInLife;
}

function highlightWeeks(weeksArray) {
  weeksArray.forEach((d, i) => {
    let nWeek = new Date(d.timeStamp * 1000);
    if (nWeek <= now) {
      let element = document.getElementById(`item-${i}`);
      element.classList.add("highlight");
    }
  });
}

document.getElementById("submit").addEventListener("click", function () {
  document.getElementById("weeks_list").innerHTML = ""; // reset
  let dob = new Date(document.getElementById("dob").value);
  let expectedYears = document.getElementById("expectedYears").value;

  console.log(`selected date : ${dob}`);
  console.log(`todays date : ${now}`);
  console.log(`weeks alive : ${weeks_between(dob, now)}`);

  let allWeeks = weeksInLife(expectedYears);

  document.getElementById("headInfo").innerHTML = `
<h1>you have been alive for ${weeks_between(dob, now)} weeks.</h1>
<h3>each dot is 1 week, each row is 1 year.</h3>
<p>based on a life expectancy of ${expectedYears} years</p>

`;

  allWeeks.forEach((d, i) => {
    let ol = document.getElementById("weeks_list");
    let li = document.createElement("li");
    li.setAttribute("title", d.date);
    li.setAttribute("id", `item-${i}`);
    ol.appendChild(li);
  });
  highlightWeeks(allWeeks);
});
