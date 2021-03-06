const now = new Date();
let dob = document.getElementById("dob").value;
console.log(dob);

function weeks_between(start, end) {
  let week = 1000 * 60 * 60 * 24 * 7;
  let start_ms = start.getTime();
  let end_ms = end.getTime();
  let ms_between = end - start;
  return Math.floor(ms_between / week);
}

function life_weeks(start, total) {
  let weeks_alive = [start.toLocaleDateString()];
  let week = start;
  for (let i = 1; i <= total; i++) {
    week.setDate(week.getDate() + 7);
    weeks_alive.push(week.toLocaleDateString());
  }
  return weeks_alive;
}

document.getElementById("submit").addEventListener("click", function () {
  let dob = new Date(document.getElementById("dob").value);
  console.log(`selected date : ${dob}`);

  const now = new Date();
  console.log(`todays date : ${now}`);
  let n_weeks_alive = weeks_between(dob, now);
  console.log(`weeks between : ${weeks_between(dob, now)}`);

  let weeks_alive = life_weeks(dob, weeks_between(dob, now));
  console.log(weeks_alive);
  document.getElementById(
    "header_label"
  ).innerHTML = `you have been alive for ${n_weeks_alive} weeks.`;
  weeks_alive.forEach((d, i) => {
    let ol = document.getElementById("weeks_list");
    let li = document.createElement("li");
    li.setAttribute("title", d);
    li.setAttribute("id", `item-${i}`);
    ol.appendChild(li);
  });
});
