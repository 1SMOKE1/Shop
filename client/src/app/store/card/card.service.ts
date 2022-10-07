import { Injectable } from "@angular/core";
import { CardLine } from "src/app/share/models/card.model";
import { Product } from "src/app/share/models/product.model";

@Injectable()

export class CardService {
  public cardLines: CardLine[] = [];

  constructor(){}

  public addCardLine(product: Product): void{
    if(this.hasCartLine(product._id)){
      this.increase(product._id)
    } else {
      this.cardLines.push(new CardLine(product))
    }
  }

  public getCardLines(): CardLine[]{
    return this.cardLines
  }

  public increase(id: number): void{
    if(this.hasCartLine(id)){
      this.getCardLine(id).increase();
    }
  }

  public decrease(id: number): void{
    if(this.hasCartLine(id)){
      this.getCardLine(id).decrease();
    }
  }

  public deleteCardLine(id: number): void{
    if(this.hasCartLine(id))
      this.cardLines = this.cardLines.filter((el: CardLine) => el.product._id !== id);
  }

  public getTotal(): number{
    return this.cardLines.reduce((acc, line) => acc + line.subTotal, 0)
  }

  private hasCartLine(id: number): boolean{
    return !!this.locator(id)
  }

  private getCardLine(id: number): CardLine{
    const cardLine = this.locator(id);
    if(cardLine){
      return cardLine
    } else {
      throw new Error(`not Found CardLine with - ${id} id`)
    }
  }

  private locator(id: number): CardLine | undefined{
    return this.cardLines.find((line: CardLine) => line.product._id === id)
  }

  public clearOrder(): void{
    this.cardLines = [];
  }
}