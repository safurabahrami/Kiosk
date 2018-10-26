import assert from 'assert';

const PRECISION = 2;

export default class Money {
  static fromNumber(amount) {
    assert(Number(amount) === amount);
    // https://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding
    return new Money(Math.round(amount + 'e' + PRECISION));
  }

  static fromJSON({ amount }) {
    return new Money(amount);
  }

  constructor(amount) {
    // expecting integer (so instead of 2.00 expecting 200)
    // this should only be used internally.
    // https://stackoverflow.com/questions/3885817/how-do-i-check-that-a-number-is-float-or-integer
    assert(Number(amount) === amount && Number.isInteger(amount), 'amount should be integer');
    this.amount = amount;
  }

  toString() {
    // https://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding
    return '$' + (+(this.amount + 'e' + -PRECISION)).toFixed(PRECISION);
  }

  toJSON() {
    return { amount: this.amount };
  }

  multiply(multiplier) {
    return new Money(Math.round(this.amount * multiplier));
  }

  divide(divisor) {
    return new Money(Math.round(this.amount / divisor));
  }

  add(money) {
    assert(money instanceof Money, 'passed in argument should be instance of Money');
    return new Money(this.amount + money.amount);
  }

  subtract(money) {
    assert(money instanceof Money, 'passed in argument should be instance of Money');
    return new Money(this.amount - money.amount);
  }

  isZero() {
    return this.amount === 0;
  }

  equalsTo(money) {
    assert(money instanceof Money, 'passed in argument should be instance of Money');
    return this.amount === money.amount;
  }
}
