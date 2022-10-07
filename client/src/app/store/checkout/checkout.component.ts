import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/share/data-base.service';
import { Order } from 'src/app/share/models/order.model';
import { CardService } from '../card/card.service';

@Component({
  selector: 'ps-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public endOrder: boolean = false;
  public orderForm: FormGroup;
  
  constructor(
    private dataBaseService: DataBaseService,
    private cardLineService: CardService
    ) {
    this.orderForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
  }


  public submit(): void{
    const order = new Order(
      this.orderForm.value.name,
      this.orderForm.value.phone,
      this.orderForm.value.address,
      this.cardLineService.getCardLines(),
      false,
      this.cardLineService.getTotal(),
    )
    this.dataBaseService
      .addOrder(order)
      .subscribe(() => {
        this.endOrder = !this.endOrder
        this.cardLineService.clearOrder()
      })
  }
  
}
