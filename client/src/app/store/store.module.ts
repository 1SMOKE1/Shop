import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store/store.component';
import { CardComponent } from './card/card.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShareModule } from '../share/share.module';
import { CardService } from './card/card.service';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    StoreComponent,
    CardComponent,
    CheckoutComponent,

  ],
  providers: [
    CardService
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ReactiveFormsModule,
    ShareModule
  ]
})
export class StoreModule { }
