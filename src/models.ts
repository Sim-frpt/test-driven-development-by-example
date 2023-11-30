export class Dollar {
  private amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  public times(multiplier: number): Dollar {
    return new Dollar(this.amount * multiplier);
  }

  public equals(object: Object): boolean {
    const dollar: Dollar = object as Dollar;
    return this.amount === dollar.amount;
  }
}

export class Franc {
  private amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  public times(multiplier: number): Franc {
    return new Franc(this.amount * multiplier);
  }

  public equals(object: Object): boolean {
    const franc: Franc = object as Franc;
    return this.amount === franc.amount;
  }
}
