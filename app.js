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

function dateOfInterest(date, label, allWeeks) {
  let dateOfInterest = new Date(date);
  let doiStart = Math.round(dateOfInterest.getTime() / 1000);
  let doiEnd = doiStart + 60 * 60 * 24 * 7;

  if (
    allWeeks.findIndex(
      (v, i) => v.timeStamp >= doiStart && v.timeStamp < doiEnd
    ) > 1
  ) {
    let doi = document.getElementById(
      `item-${
        allWeeks.findIndex(
          (v, i) => v.timeStamp >= doiStart && v.timeStamp < doiEnd
        ) - 1
      }`
    );
    doi.classList.add("date-of-interest");
    doi.setAttribute(
      "title",
      `${label}\n${dateOfInterest.toLocaleDateString()}`
    );
  }
}

let doiCount = 0;
function addDOi() {
  doiCount++;
  var div = document.createElement("div");
  div.innerHTML = `
  <div class="doi-instance">
  <div class="inputs">
    <label for="doi-label-${doiCount}">
      <h5>label ${doiCount}</h5>
    </label>
    <input type="text" id="doi-label-${doiCount}" name="doi-label-${doiCount}">
  </div>

  <div class="inputs">
    <label for="doi-date-${doiCount}">
      <h5>date ${doiCount}</h5>
    </label>
    <input type="date" id="doi-date-${doiCount}" name="doi-date-${doiCount}">
  </div>
</div>
`;
  document.getElementById("date-of-interest-container").appendChild(div);
}

document.getElementById("add-doi").addEventListener("click", function () {
  addDOi();
});

function loopDOi(dob, expectedYears) {
  for (let i = 0; doiCount > i; i++) {
    let doiDate = new Date(document.getElementById(`doi-date-${i + 1}`).value);
    let doiLabel = document.getElementById(`doi-label-${i + 1}`).value;

    let allWeeks = weeksForYears(dob, expectedYears);
    dateOfInterest(new Date(doiDate), doiLabel, allWeeks);
  }
}

function populateInitial(dob) {
  document.getElementById("weeks_list").innerHTML = ""; // reset
  const now = new Date();
  // const dob = new Date(document.getElementById("dob").value);
  let expectedYears = document.getElementById("expectedYears").value;

  document.getElementById("opt-dob").value = document.getElementById(
    "dob"
  ).value;

  let allWeeks = weeksForYears(dob, expectedYears);
  allWeeks.forEach((d, i) => {
    liBlobsHTML("weeks_list", d.date, i);
  });

  beforeToday(allWeeks, liBlobHighlight);

  // dateOfInterest(new Date(document.getElementById("doi").value),allWeeks);
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

function stats() {
  const dob = new Date(document.getElementById("opt-dob").value);
  const now = new Date();
  let expectedYears = document.getElementById("expectedYears").value;
  const statsElement = document.getElementById("stats");
  const weeksLived = weeksBetween(dob, now);
  let title = "Your Life in Weeks";

  document.title=title;
  document.getElementById("logo-text").innerHTML = `${title}`

  document.getElementById("stat-numbers").innerHTML = `
  <\h1><h1>${Math.round((100 / (expectedYears * 52)) * weeksLived)} % complete</h1>
  <h3>you have completed ${weeksLived} weeks out of ${expectedYears * 52}</h3>
`;
  statsElement.classList.remove("hide");

  document.getElementById("info").classList.remove("hide");
  document.getElementById("stats").classList.remove("transparent");
}

document.getElementById("submit").addEventListener("click", function () {
  const dob = new Date(document.getElementById("dob").value);
  populateInitial(dob);

  stats();

  document.getElementById("start-form").classList.add("hide");
});

document.getElementById("apply").addEventListener("click", function () {
  document.getElementById("dob").value = document.getElementById(
    "opt-dob"
  ).value;
  const dob = new Date(document.getElementById("opt-dob").value);
  const now = new Date();
  let expectedYears = document.getElementById("expectedYears").value;
  populateInitial(dob);
  loopDOi(dob, expectedYears);
  stats();
  document.getElementById("options").classList.add("hide");
});

document.getElementById("stat-menu").addEventListener("click", function () {
  document.getElementById("options").classList.remove("hide");
  document.getElementById("stats").classList.add("hide");
});

document.getElementById("close").addEventListener("click", function () {
  document.getElementById("options").classList.add("hide");
  document.getElementById("stats").classList.remove("hide");
});

