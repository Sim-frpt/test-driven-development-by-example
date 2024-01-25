import { Money } from "./models";

export interface Expression {
  reduce(to: string): Money;
}
