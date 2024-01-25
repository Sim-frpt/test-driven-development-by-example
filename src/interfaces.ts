import { Bank, Money } from "./models";

export interface Expression {
  reduce(bank: Bank, to: string): Money;
}
