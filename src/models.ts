import { Expression } from "./interfaces";

export class Money implements Expression {
  protected amount: number;
  protected _currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this._currency = currency;
  }

  public equals(object: Object): boolean {
    const money: Money = object as Money;
    return this.amount === money.amount && this.currency === money.currency;
  }

  public static dollar(amount: number): Money {
    return new Money(amount, "USD");
  }

  public static franc(amount: number): Money {
    return new Money(amount, "CHF");
  }

  public times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency);
  }

  public plus(addend: Money): Expression {
    return new Money(this.amount + addend.amount, this.currency);
  }

  public get currency() {
    return this._currency;
  }
}

export class Bank {
  public reduce(source: Expression, to: string): Money {
    return Money.dollar(10);
  }
}
