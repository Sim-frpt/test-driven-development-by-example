import { Franc, Money } from "./models";

test("multiplication", () => {
  const five: Money = Money.dollar(5);

  expect(five.times(2)).toEqual(Money.dollar(10));
  expect(five.times(3)).toEqual(Money.dollar(15));
});

test("equality", () => {
  expect(Money.dollar(5)).toEqual(Money.dollar(5));
  expect(Money.dollar(5)).not.toEqual(Money.dollar(6));

  expect(Money.franc(5)).toEqual(Money.franc(5));
  expect(Money.franc(5)).not.toEqual(Money.franc(6));
  expect(Money.franc(5)).not.toBe(Money.dollar(5));
});

test("franc multiplication", () => {
  const five: Money = Money.franc(5);

  expect(five.times(2)).toEqual(Money.franc(10));
  expect(five.times(3)).toEqual(Money.franc(15));
});

test("currency", () => {
  expect("USD").toEqual(Money.dollar(1).currency);
  expect("CHF").toEqual(Money.franc(1).currency);
});

test("different class equality", () => {
  expect(new Money(10, "CHF").equals(new Franc(10, "CHF"))).toBe(true);
});
