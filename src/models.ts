export class Money {
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
    return new Dollar(amount, "USD");
  }

  public static franc(amount: number): Money {
    return new Franc(amount, "CHF");
  }

  public times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency);
  }

  public get currency() {
    return this._currency;
  }
}

export class Dollar extends Money {}

export class Franc extends Money {}
