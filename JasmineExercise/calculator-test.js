
it('should calculate the monthly rate correctly', function () {
  const values = {
    amount: 500,
    years: 2,
    rate: 10
  };
  expect(calculateMonthlyPayment(values)).toBe('23.07');
});


it("should return a result with 2 decimal places", function() {
  const values = {
    amount: 6789,
    years: 6,
    rate: 4.8
  };
  expect(calculateMonthlyPayment(values)).toBe('108.71');
});


