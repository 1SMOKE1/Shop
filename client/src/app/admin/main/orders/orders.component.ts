import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataBaseService } from 'src/app/share/data-base.service';
import { Order } from 'src/app/share/models/order.model';

export type togleBtns = 'All' | 'Shiped' | 'notShiped';

@Component({
  selector: 'ps-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(
    private dataBaseService: DataBaseService
  ) { }

  ngOnInit(): void {
    this.getOrders()

    
  }

  public shipped(order: Order): void{
    const compliteOrder = order;
    compliteOrder.shiped = !compliteOrder.shiped;
    this.dataBaseService
      .updateOrder(compliteOrder)
      .subscribe(() => {
        this.getOrders()
      })
  }

  public toggleChange(val: togleBtns): void{
    switch(val){
      case 'All':
        this.getOrders()
        break;
      case 'Shiped':
        this.filtrationLogic(true).subscribe((orders: Order[]) => this.orders = orders);
        break;
      case 'notShiped': 
        this.filtrationLogic(false).subscribe((orders: Order[]) => this.orders = orders);
        break;
    }
  }

  private getOrders(): void{
    this.dataBaseService
      .getOrders()
      .subscribe((orders: Order[]) =>{
        this.orders = orders
      })
  }

  private filtrationLogic(cond: boolean): Observable<Order[]>{
    return this.dataBaseService
    .getOrders()
    .pipe(
      map((el: Order[]) => el.filter((el: Order) => el.shiped === cond))
    )
  }
}
