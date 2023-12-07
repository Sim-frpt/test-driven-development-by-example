import { Dollar, Franc } from "./models";

test("multiplication", () => {
  const five: Dollar = new Dollar(5);

  expect(five.times(2)).toEqual(new Dollar(10));
  expect(five.times(3)).toEqual(new Dollar(15));
});

test("equality", () => {
  expect(new Dollar(5)).toEqual(new Dollar(5));
  expect(new Dollar(5)).not.toEqual(new Dollar(6));

  expect(new Franc(5)).toEqual(new Franc(5));
  expect(new Franc(5)).not.toEqual(new Franc(6));
  expect(new Franc(5)).not.toBe(new Dollar(5));
});

test("franc multiplication", () => {
  const five: Franc = new Franc(5);

  expect(five.times(2)).toEqual(new Franc(10));
  expect(five.times(3)).toEqual(new Franc(15));
});
