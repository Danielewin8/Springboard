const addCommas = require("./addCommas");

describe("#addCommas", () => {
  test("it is a function", () => {
    expect(typeof addCommas).toBe("function");
  });
  test("returns correct string", () => {
    expect(addCommas(123)).toBe('123');
    expect(addCommas(123456)).toBe('123,456');
    expect(addCommas(123456789)).toBe('123,456,789');
  })
});