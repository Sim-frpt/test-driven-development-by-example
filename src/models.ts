export class Money {
  protected amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  public equals(object: Object): boolean {
    const money: Money = object as Money;
    return this.amount === money.amount;
  }
}

export class Dollar extends Money {
  public times(multiplier: number): Dollar {
    return new Dollar(this.amount * multiplier);
  }
}

export class Franc extends Money {
  public times(multiplier: number): Franc {
    return new Franc(this.amount * multiplier);
  }
}
