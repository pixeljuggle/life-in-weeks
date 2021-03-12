const { yearsToWeeks, weeksBetween, weeksForYears, beforeToday } = require("./index");

describe("yearsToWeeks", () => {
  it("returns the number of weeks in X years", () => {
    const result = yearsToWeeks(2);
    const expected = 104;
    expect(result).toBe(expected);
  });
  it("returns the number of weeks in X years", () => {
    const result = yearsToWeeks(1);
    const expected = 52;
    expect(result).toBe(expected);
  });
  it("returns the number of weeks in X years", () => {
    const result = yearsToWeeks(4);
    const expected = 208;
    expect(result).toBe(expected);
  });
});

// weeks between 2 dates. gives number/int of weeks between 2 dates.
describe("weeksBetween", () => {
  it("returns the number of weeks between 2 dates", () => {
    const result = weeksBetween("1986/10/15", 1615559278000);
    const expected = 1795;
    expect(result).toBe(expected);
  });
  it("returns the number of weeks between 2 dates", () => {
    const result = weeksBetween("2020/01/01", "2021/01/01");
    const expected = 52;
    expect(result).toBe(expected);
  });
  it("returns the number of weeks between 2 dates", () => {
    const result = weeksBetween("2021/01/01", "2021/01/17");
    const expected = 2;
    expect(result).toBe(expected);
  });
  it("returns the number of weeks between 2 dates", () => {
    const result = weeksBetween("2021/01/17", "2021/01/01");
    const expected = 2;
    expect(result).toBe(expected);
  });
});

// array of weeks in life expectancy. pass it your date of birth and life expectancy, return an array of objects containung a date & timsstamp, the dates are week starts from birth to death.
describe("weeksForYears", () => {
  it("returns an array of dates, weeks in X years", () => {
    const result = weeksForYears("1986/10/15", 1);
    const expected = 52;
    expect(result).toHaveLength(expected);
    expect(result[1].date).toBe('22/10/1986');
  });
  it("returns an array of dates, weeks in X years", () => {
    const result = weeksForYears("2012", 2);
    const expected = 104;
    expect(result).toHaveLength(expected);
    expect(result[1].date).toBe('08/01/2012');
  });
});


// itterates through an array of dates from weeksForYears() and passes the value and index to a function if the date is before today. used to highlight weeks lived.
describe("beforeToday", () => {
  beforeEach(() => {
    const expectedArray = [];
    expectedArray.length = 0;
  });
  it("calls a function for each date in array that is before now", () => {
    const expectedArray = [];
    const array = weeksForYears("2012", 2);
    const callBack = (d, i) => { expectedArray.push(`item-${i} date-${d.date}`) };
    const result = beforeToday(array, callBack);
    const expected = 104;
    expect(expectedArray).toHaveLength(expected);
  });
  it("calls a function for each date in array that is before now", () => {
    const expectedArray = [];
    const array = weeksForYears("2100", 1);
    const callBack = (d, i) => { expectedArray.push(`item-${i} date-${d.date}`) };
    const result = beforeToday(array, callBack);
    const expected = 0;
    expect(expectedArray).toHaveLength(expected);
  });
});