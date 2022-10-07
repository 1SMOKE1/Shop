import { CardLine } from "./card.model";

export class Order{
  constructor(
    public name: string,
    public phone: string,
    public address: string,
    public cardLines: CardLine[],
    public shiped: boolean,
    public totalCost: number,
    public _id?: number,
  ) {}
}