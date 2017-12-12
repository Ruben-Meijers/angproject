import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { ProductStartComponent } from './products/product-start/product-start.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductService } from './products/product.service';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierListComponent } from './suppliers/supplier-list/supplier-list.component';
import { SupplierItemComponent } from './suppliers/supplier-list/supplier-item/supplier-item.component';
import { SupplierEditComponent } from './suppliers/supplier-edit/supplier-edit.component';
import { SupplierService } from './suppliers/supplier.service';
import { OrderAddComponent } from './orders/order-add/order-add.component';
import { OrderItemComponent } from './orders/order-add/order-item/order-item.component';
import { OrderService } from './orders/order.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    DropdownDirective,
    ProductStartComponent,
    ProductEditComponent,
    OrderAddComponent,
    OrderItemComponent,
    SuppliersComponent,
    SupplierListComponent,
    SupplierItemComponent,
    SupplierEditComponent,
    OrderAddComponent,
    OrderItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ProductService, SupplierService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
