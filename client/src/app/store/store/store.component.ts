import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map} from 'rxjs';
import { DataBaseService } from 'src/app/share/data-base.service';
import { Product } from 'src/app/share/models/product.model';
import { CardService } from '../card/card.service';


@Component({
  selector: 'ps-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  itemsPerPage: number = 0;
  products: Product[] = [];
  navBtns: string[] = [];
  constructor(
    private dataBaseService: DataBaseService, 
    private router: Router,
    private cardService: CardService) { 
      
    }

  ngOnInit(): void {
    this.getProducts();
    this.getBtns();
      
  }

  public getProducts(): void{
    this.dataBaseService
      .getProducts()
      .subscribe((products: Product[]) => {
        this.products = products;
        this.itemsPerPage = this.products.length;
      })
  }

  private getBtns(): void{
    this.dataBaseService.getProducts()
    .pipe(
      map((el: Product[]) => el
      .map((el: Product) => el.category)
      )
    )
        .subscribe((res: string[]) => this.navBtns = [...new Set(res)])
  }

  public filterCategory(condition: string){
    this.dataBaseService.getProducts().pipe(
      map((el: Product[]) => 
        el.filter((el: Product) => 
          el.category === condition)
      ))
          .subscribe((res: Product[]) => {
            this.products = res;
          })
  }


  public addToCard(product: Product): void{
    this.cardService.addCardLine(product)
    this.router.navigate(['/card']);
  }

  public changeItemsPerPage(e: Event): void{
    let cur = e.target as HTMLSelectElement;
    this.itemsPerPage = +cur.value;
  }
}
