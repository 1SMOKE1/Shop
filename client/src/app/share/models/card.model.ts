import { Product } from "./product.model";

export class CardLine{
  public quantity: number = 1;
  constructor(
    public product: Product,
  ) 
  {}

  get subTotal(): number{
    return this.product.price * this.quantity;
  }

  public increase(): void{
    ++this.quantity
  }

  public decrease(): void{
    if(this.quantity >= 2)
      --this.quantity
    
  }
}