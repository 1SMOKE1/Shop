import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataBaseService } from './data-base.service';
import { HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { BasketComponent } from './basket/basket.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    HeaderComponent,
    BasketComponent,
    LoaderComponent
  ],
  providers: [DataBaseService],
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    HeaderComponent,
    BasketComponent,
    LoaderComponent
  ]
})
export class ShareModule { }
