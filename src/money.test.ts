import { Expression } from "./interfaces";
import { Bank, Money, Sum } from "./models";

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

test("plus returns a sum", () => {
  const five = Money.dollar(5);
  const result = five.plus(five);
  const sum: Sum = result as Sum;
  expect(five).toEqual(sum.augend);
  expect(five).toEqual(sum.addend);
});

test("reduce sum", () => {
  const sum: Expression = new Sum(Money.dollar(3), Money.dollar(4));
  const bank = new Bank();
  const result = bank.reduce(sum, "USD");
  expect(result).toEqual(Money.dollar(7));
});

test("reduce money", () => {
  const bank = new Bank();
  const result: Money = bank.reduce(Money.dollar(1), "USD");

  expect(result).toEqual(Money.dollar(1));
});

test("reduce money to different currency", () => {
  const bank = new Bank();

  bank.addRate("CHF", "USD", 2);

  const result: Money = bank.reduce(Money.franc(2), "USD");

  expect(result).toEqual(Money.dollar(1));
});

test("identity rate", () => {
  expect(new Bank().rate("USD", "USD")).toBe(1);
});

test("mixed addition", () => {
  const fiveBucks: Expression = Money.dollar(5);
  const tenFrancs: Expression = Money.franc(10);
  const bank = new Bank();

  bank.addRate("CHF", "USD", 2);

  const result: Money = bank.reduce(fiveBucks.plus(tenFrancs), "USD");

  expect(result).toEqual(Money.dollar(10));
});

test("sum plus money", () => {
  const fiveBucks: Expression = Money.dollar(5);
  const tenFrancs: Expression = Money.franc(10);

  const bank = new Bank();

  bank.addRate("CHF", "USD", 2);

  const sum: Expression = new Sum(fiveBucks, tenFrancs).plus(fiveBucks);

  const result: Money = bank.reduce(sum, "USD");

  expect(result).toEqual(Money.dollar(15));
});

test("sum times", () => {
  const fiveBucks: Expression = Money.dollar(5);
  const tenFrancs: Expression = Money.franc(10);

  const bank = new Bank();

  bank.addRate("CHF", "USD", 2);

  const sum: Expression = new Sum(fiveBucks, tenFrancs).times(2);
  const result: Money = bank.reduce(sum, "USD");

  expect(result).toEqual(Money.dollar(20));
});
