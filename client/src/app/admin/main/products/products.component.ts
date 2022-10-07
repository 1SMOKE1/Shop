import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DataBaseService } from 'src/app/share/data-base.service';
import { Product } from 'src/app/share/models/product.model';
import { productI } from 'src/interfaces/productI';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductModalDeleteComponent } from '../product-modal-delete/product-modal-delete.component';

@Component({
  selector: 'ps-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'category', 'price', 'actions']
  public products: productI[] = [];
  constructor(
    private dataBaseService: DataBaseService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getProducts()
  }


  public edit(prod: Product): void{
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '500px',
      data: prod
    });
    dialogRef
      .afterClosed()
      .subscribe(() => this.getProducts())
  }

  public delete(id: number, enterAnimationDuration: string): void{
    const dialogRef = this.dialog.open(ProductModalDeleteComponent, {
      width: '300px',
      enterAnimationDuration,
    })

    dialogRef
      .afterClosed()
      .subscribe((cond: boolean) => {
        if(cond){
          this.dataBaseService
            .deleteProduct(id)
            .subscribe(() => this.getProducts())
        }
      })
  }

  public create(): void{
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getProducts()
    })
  }



  private getProducts(): void{
    this.dataBaseService
          .getProducts()
          .subscribe((prods: Product[]) => {
            this.products = prods
          })
  }
}
