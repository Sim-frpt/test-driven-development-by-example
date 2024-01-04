export abstract class Money {
  protected amount: number;
  protected _currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this._currency = currency;
  }

  public equals(object: Object): boolean {
    const money: Money = object as Money;
    return this.amount === money.amount;
  }

  public static dollar(amount: number): Money {
    return new Dollar(amount, "USD");
  }

  public static franc(amount: number): Money {
    return new Franc(amount, "CHF");
  }

  public abstract times(amount: number): Money;

  public currency() {
    return this._currency;
  }
}

export class Dollar extends Money {
  public times(multiplier: number): Money {
    return Money.dollar(this.amount * multiplier);
  }
}

export class Franc extends Money {
  public times(multiplier: number): Money {
    return Money.franc(this.amount * multiplier);
  }
}
