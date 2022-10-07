import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './main/products/products.component';
import { ProductFormComponent } from './main/product-form/product-form.component';
import { OrdersComponent } from './main/orders/orders.component';
import { ShareModule } from '../share/share.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductModalDeleteComponent } from './main/product-modal-delete/product-modal-delete.component'
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { CreateCategoryFormComponent } from './main/create-category-form/create-category-form.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { ErrorInterceptor } from '../error.interceptor';

@NgModule({
  declarations: [
    AdminComponent,
    AuthComponent,
    MainComponent,
    ProductsComponent,
    ProductFormComponent,
    OrdersComponent,
    ProductModalDeleteComponent,
    CreateCategoryFormComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: ErrorInterceptor,
    }
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ShareModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class AdminModule { }
