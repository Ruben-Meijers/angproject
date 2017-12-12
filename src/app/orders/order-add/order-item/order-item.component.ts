import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Input
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../../order.model';
import { OrderService } from '../../order.service';
import { SupplierService } from '../../../suppliers/supplier.service';
import { Supplier } from '../../../suppliers/supplier.model';
import { ProductService } from '../../../products/product.service';
import { Product } from '../../../products/product.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  @Input()
  subscription: Subscription;
  subscriptionsup: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Order;
  supplierItem : Supplier[];
  suppliers: Supplier[];
  supplier: Supplier;
  products: Product[]
  prodSubscription: Subscription;

  constructor(private oService: OrderService, 
    private supService : SupplierService, 
    private prodService: ProductService) { }

  ngOnInit() {
      this.prodSubscription = this.prodService.productsChanged
      .subscribe(
        (products : Product[]) => {
          this.products = products;
        }
      );
      this.prodService.getProducts()
      .then((products) => {
        products => this.products = products;     
              })
      .catch(error => console.log(error));
      this.subscriptionsup = this.supService.supplierChanged
      .subscribe(
        (suppliers: Supplier[]) => {
          this.suppliers = suppliers;
        }
      );
      this.supService.getSuppliers()
      .then((suppliers) => {
        suppliers => this.suppliers = suppliers;
        console.log(this.supplier = suppliers[1]);
              })
      .catch(error => console.log(error));
  }

  onSubmit(form: NgForm) {
    // let productSelected = this.prodService.getProduct();
    console.log(this.prodService.getArray()[0].name+ "dit staat in le array");
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.oService.deleteOrder(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
