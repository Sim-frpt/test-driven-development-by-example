import { Expression } from "./interfaces";

export class Money implements Expression {
  public amount: number;
  public _currency: string;

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
    return new Sum(this, addend);
  }

  public get currency() {
    return this._currency;
  }

  public reduce(to: string) {
    return this;
  }
}

export class Bank {
  public reduce(source: Expression, to: string): Money {
    return source.reduce(to);
  }
}

export class Sum implements Expression {
  constructor(public augend: Money, public addend: Money) {}

  public reduce(to: string): Money {
    const amount: number = this.augend.amount + this.addend.amount;
    return new Money(amount, to);
  }
}
