import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductStartComponent } from './products/product-start/product-start.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierEditComponent } from './suppliers/supplier-edit/supplier-edit.component';
import { OrderAddComponent } from './orders/order-add/order-add.component';
import { OrderItemComponent } from './orders/order-add/order-item/order-item.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent, children: [
    { path: '', component: ProductStartComponent },
    { path: 'new', component: ProductEditComponent },
    { path: ':id', component: ProductDetailComponent },
    { path: ':id/edit', component: ProductEditComponent },
  ] },
  { path: 'suppliers', component: SuppliersComponent, children: [
    { path: 'new', component: SupplierEditComponent },
  ] },
  { path: 'orders', component: OrderAddComponent, children: [
    { path: 'new', component: OrderItemComponent },
    {path: ':id', component:  OrderAddComponent},
  ]}];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
