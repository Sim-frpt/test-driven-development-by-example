import { Bank, Money } from "./models";

export interface Expression {
  reduce(bank: Bank, to: string): Money;
  plus: (addend: Expression) => Expression | null;
}
