import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { forEach } from '@angular/router/src/utils/collection';
import { OrderService } from '../order.service';
import { Order } from '../order.model';
import { ProductService } from '../../products/product.service';
import { Product } from '../../products/product.model';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit, OnDestroy {
  orders: Order[];
  order: Order;
  products: Product[];
  products_in_order: Product[];
  private subscription: Subscription;
  private subscriptionProduct: Subscription;
  private subscriptionAllProducts: Subscription;
  constructor(private oService: OrderService, private prodService: ProductService) { }

  ngOnInit() {
    // this.orders = this.oService.getOrders();

    this.subscription = this.oService.OrderChanged
      .subscribe(
        (orders: Order[]) => {
          this.orders = orders;
        }
      );
      this.subscriptionAllProducts = this.prodService.productsChanged
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        }
      );
      this.prodService.getProducts()
      .then((products)=>{this.products = products})
      .catch((error)=>console.log(error));
      this.subscriptionProduct = this.prodService.productsArrayChanged
      .subscribe(
        (products_in_order: Product[]) => {
          this.products_in_order = products_in_order;
        }
      );
      console.log(this.products_in_order+"<--- products in order");
  }

  onEditItem(index: number) {
    this.oService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){
   const value = form.value;
    let temporder = new Order(value._id ,value.name,
       value.description,
       value.date,
        'steve', 
        this.prodService.getArray());
        this.oService.addOrder(temporder);
  }

  addToOrder(productid: string){
      this.prodService.getProduct(productid)
      .then((product) => {
        this.prodService.addToArray(product);
              })
      .catch((error)=>console.log(error));
  }
}
