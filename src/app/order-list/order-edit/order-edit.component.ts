import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../../shared/order.model';
import { OrderListService } from '../order-list.service';
import { SupplierService } from '../../suppliers/supplier.service';
import { Supplier } from '../../suppliers/supplier.model';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  subscriptionsup: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Order;
  supplierItem : Supplier[];
  suppliers: Supplier[];
  supplier: Supplier;

  constructor(private oService: OrderListService, private supService : SupplierService ) { }

  ngOnInit() {
    this.subscription = this.oService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.oService.getOrder(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
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
    const value = form.value;
    const newOrder = new Order(value.name, value.amount);
    if (this.editMode) {
      this.oService.updateOrder(this.editedItemIndex, newOrder);
    } else {
      this.oService.addOrder(newOrder);
    }
    this.editMode = false;
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
    this.subscription.unsubscribe();
  }

}
