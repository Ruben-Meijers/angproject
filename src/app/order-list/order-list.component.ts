import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OrderListService } from './order-list.service';
import { Order } from '../shared/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Order[];
  private subscription: Subscription;

  constructor(private slService: OrderListService) { }

  ngOnInit() {
    this.orders = this.slService.getOrders();
    this.subscription = this.slService.OrderChanged
      .subscribe(
        (orders: Order[]) => {
          this.orders = orders;
        }
      );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
