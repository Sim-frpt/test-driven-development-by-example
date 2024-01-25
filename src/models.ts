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

  public times(multiplier: number): Expression {
    return new Money(this.amount * multiplier, this.currency);
  }

  public plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }

  public get currency() {
    return this._currency;
  }

  public reduce(bank: Bank, to: string) {
    const rate = bank.rate(this.currency, to);

    return new Money(this.amount / rate, to);
  }
}

export class Bank {
  private rates: Map<Pair, number>;

  constructor() {
    this.rates = new Map();
  }

  public reduce(source: Expression, to: string): Money {
    return source.reduce(this, to);
  }

  /* Shitty object value equality cause js maps do allow Objects as keys, but compare by reference, not value */
  public rate(from: string, to: string): number {
    if (from === to) {
      return 1;
    }

    let rate = null;

    [...this.rates.keys()].forEach((pair: Pair) => {
      if (JSON.stringify(pair) === JSON.stringify(new Pair(from, to))) {
        rate = this.rates.get(pair);
      }
    });

    if (!rate) {
      throw new Error("rate is not in the bank! ");
    }

    return rate;
  }

  public addRate(from: string, to: string, rate: number): void {
    this.rates.set(new Pair(from, to), rate);
  }
}

export class Sum implements Expression {
  constructor(public augend: Expression, public addend: Expression) {}

  public reduce(bank: Bank, to: string): Money {
    const amount: number =
      this.augend.reduce(bank, to).amount + this.addend.reduce(bank, to).amount;

    return new Money(amount, to);
  }

  public plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }

  public times(multiplier: number): Expression {
    return new Sum(
      this.augend.times(multiplier),
      this.addend.times(multiplier)
    );
  }
}

class Pair {
  constructor(private from: string, private to: string) {}

  public equals(object: Object): boolean {
    const pair: Pair = object as Pair;
    return this.from === pair.from && this.to === pair.to;
  }

  public hashCode(): number {
    return 0;
  }
}
