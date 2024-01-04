import { Expression } from "./interfaces";
import { Bank, Money } from "./models";

test("multiplication", () => {
  const five: Money = Money.dollar(5);

  expect(five.times(2)).toEqual(Money.dollar(10));
  expect(five.times(3)).toEqual(Money.dollar(15));
});

test("equality", () => {
  expect(Money.dollar(5)).toEqual(Money.dollar(5));
  expect(Money.dollar(5)).not.toEqual(Money.dollar(6));
  expect(Money.franc(5)).not.toBe(Money.dollar(5));
});

test("currency", () => {
  expect("USD").toEqual(Money.dollar(1).currency);
  expect("CHF").toEqual(Money.franc(1).currency);
});

test("simple addition", () => {
  const five = Money.dollar(5);
  const sum: Expression = five.plus(five);
  const bank: Bank = new Bank();
  const reduced: Money = bank.reduce(sum, "USD");

  expect(Money.dollar(10)).toEqual(reduced);
});
