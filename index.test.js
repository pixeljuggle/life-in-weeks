const {
  yearsToWeeks,
  weeksBetween
 } = require("./index");

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
    const result = weeksBetween('1986/10/15', 1615559278000 );
    const expected = 1795;
    expect(result).toBe(expected);
  });
  it("returns the number of weeks between 2 dates", () => {
    const result = weeksBetween('2020/01/01', '2021/01/01' );
    const expected = 52;
    expect(result).toBe(expected);
  });
  it("returns the number of weeks between 2 dates", () => {
    const result = weeksBetween('2021/01/01', '2021/01/17' );
    const expected = 2;
    expect(result).toBe(expected);
  });
  it("returns the number of weeks between 2 dates", () => {
    const result = weeksBetween('2021/01/17', '2021/01/01' );
    const expected = 2;
    expect(result).toBe(expected);
  });
});

// array of weeks in life expectancy. pass it your date of birth and life expectancy, return an array of dates, the dates are week starts from birth to death.

// itterates through an array of dates and calls a function if the date is bfore today. used to highlight weeks lived.