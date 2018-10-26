import Money from '../Money';

const expectToEqualMoney = (actual, expected) => {
  expect(actual.equalsTo(expected)).toEqual(true);
};

describe('Money', () => {
  test.each([
    [2.5, 2.50],
    [-2.5, -2.50],
    [2.457, 2.46],
    [-2.457, -2.46],
  ])('Create: %d', (n1, expected) => {
    expectToEqualMoney(Money.fromNumber(n1), Money.fromNumber(expected));
  });

  test.each([
    [2.5, '$2.50'],
    [-5.61, '$-5.61'],
    [-2.756, '$-2.76'],
    [0, '$0.00'],
    [0.0, '$0.00'],
  ])('toString: %d outputs %s', (n, expected) => {
    expect(Money.fromNumber(n).toString()).toEqual(expected);
  });

  test.each([
    [0, -1, 0.00],
    [1.5, 2, 3.00],
    [2, 1.5, 3.00],
    [3, 1.256, 3.77],
    [3, 1.255, 3.76],
    [-2.2, -2, 4.40],
  ])('Multiply: %d by %d is %s', (n1, n2, expected) => {
    const actual = Money.fromNumber(n1).multiply(n2);
    expectToEqualMoney(actual, Money.fromNumber(expected));
  });

  test.each([
    [3, 2, 1.50],
    [1, 3, 0.33],
    [100, -10, -10.00],
  ])('Divide: %d divided by %d is %s', (n1, n2, expected) => {
    const actual = Money.fromNumber(n1).divide(n2);
    expectToEqualMoney(actual, Money.fromNumber(expected));
  });

  test.each([
    [1.2, 1.54, 2.74],
    [1.2, -1.33, -0.13],
  ])('Addition: %d + %d is %s', (n1, n2, expected) => {
    const actual = Money.fromNumber(n1).add(Money.fromNumber(n2));
    expectToEqualMoney(actual, Money.fromNumber(expected));
  });

  test.each([
    [1.2, 1.2, 0.00],
    [5.5, 6.52, -1.02],
    [0, 0.0, 0.00],
  ])('Subtract: %d - %d is %s', (n1, n2, expected) => {
    const actual = Money.fromNumber(n1).subtract(Money.fromNumber(n2));
    expectToEqualMoney(actual, Money.fromNumber(expected));
  });

  test.each([
    [0.00, true],
    [0.001, true],
    [0.009, false],
    [-0.001, true],
    [-0.009, false],
    [0 * -1, true],
  ])('isZero: on %d should be %b', (n1, expected) => {
    expect(Money.fromNumber(n1).isZero()).toBe(expected);
  });

  test('toJSON/fromJSON', () => {
    const convertedMoney = Money.fromJSON(Money.fromNumber(5.5).toJSON());
    expect(convertedMoney.toString()).toEqual(Money.fromNumber(5.5).toString());
  });

  test.each([
    [0, -0, true],
    [1.2, 1.20, true],
    [1.344, 1.34, true],
    [1.346, 1.34, false],
  ])('equalsTo: %d equals %d is %b', (n1, n2, expected) => {
    expect(Money.fromNumber(n1).equalsTo(Money.fromNumber(n2))).toBe(expected);
  });
});
