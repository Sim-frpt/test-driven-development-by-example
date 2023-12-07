export abstract class Money {
  protected amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  public equals(object: Object): boolean {
    const money: Money = object as Money;
    return this.amount === money.amount;
  }

  public static dollar(amount: number): Money {
    return new Dollar(amount);
  }

  public static franc(amount: number): Money {
    return new Franc(amount);
  }

  public abstract times(amount: number): Money;
}

export class Dollar extends Money {
  public times(multiplier: number): Money {
    return new Dollar(this.amount * multiplier);
  }
}

export class Franc extends Money {
  public times(multiplier: number): Money {
    return new Franc(this.amount * multiplier);
  }
}
