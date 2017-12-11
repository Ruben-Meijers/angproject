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

  constructor(private oService: OrderListService) { }

  ngOnInit() {
    this.orders = this.oService.getOrders();
    this.subscription = this.oService.OrderChanged
      .subscribe(
        (orders: Order[]) => {
          this.orders = orders;
        }
      );
  }

  onEditItem(index: number) {
    this.oService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
