import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthComponent } from './auth/auth.component';

import { MainComponent } from './main/main.component';
import { OrdersComponent } from './main/orders/orders.component';
import { ProductFormComponent } from './main/product-form/product-form.component';
import { ProductsComponent } from './main/products/products.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent,
    children: [
    {
      path: '', pathMatch: 'full', redirectTo: 'auth'
    },
    {
      path: 'auth',
      component: AuthComponent,
    },
    {
      path: 'main',
      component: MainComponent,
      children: [
        {
          path: '', pathMatch: 'full', redirectTo: 'products'
        },
        {
          path: 'products',
          component: ProductsComponent
        },
        {
          path: 'products/create',
          component: ProductFormComponent
        },
        {
          path: 'products/edit:id',
          component: ProductFormComponent
        },
        {
          path: 'orders',
          component: OrdersComponent
        }
      ]
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
