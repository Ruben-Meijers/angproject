import { Subject } from 'rxjs/Subject';
import { Order } from '../shared/order.model';

export class OrderListService {
  OrderChanged = new Subject<Order[]>();
  startedEditing = new Subject<number>();
  private orders: Order[] = [
    new Order('Appels', 600),
    new Order('Peren', 7000),
  ];

  getOrders() {
    return this.orders.slice();
  }

  getOrder(index: number) {
    return this.orders[index];
  }

  addOrder(order: Order) {
    this.orders.push(order);
    this.OrderChanged.next(this.orders.slice());
  }

  addOrders(orders: Order[]) {
    this.orders.push(...orders);
    this.OrderChanged.next(this.orders.slice());
  }

  updateOrder(index: number, newOrder: Order) {
    this.orders[index] = newOrder;
    this.OrderChanged.next(this.orders.slice());
  }

  deleteOrder(index: number) {
    this.orders.splice(index, 1);
    this.OrderChanged.next(this.orders.slice());
  }
}
