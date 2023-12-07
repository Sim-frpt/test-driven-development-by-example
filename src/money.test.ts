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
  const five: Franc = Money.franc(5);

  expect(five.times(2)).toEqual(Money.franc(10));
  expect(five.times(3)).toEqual(Money.franc(15));
});
