import { Subject } from 'rxjs/Subject';
import { Order } from './order.model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class OrderService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private serverUrl = environment.serverUrl + '/orders'; // URL to web api
  OrderChanged = new Subject<Order[]>();
  startedEditing = new Subject<number>();
  orders: Order[];

  constructor(private http: Http) {}

  getOrders() {
    return this.orders.slice();
  }

  getOrder(index: number) {
    return this.orders[index];
  }

  addOrder(order: Order) {
    
        const order2 = order;
        return this.http.post(this.serverUrl+'/new' , order2)
          .toPromise()
          .then(response => {
           const resOrder = response.json() as Order[];
           this.OrderChanged.next(resOrder);
           return resOrder;

          })
          .catch(error => {
            return this.handleError(error);
          });
      }
//   addOrder(order: Order) {
//     this.orders.push(order);   
//     this.OrderChanged.next(this.orders.slice());
//   }
  updateOrder(index: number, newOrder: Order) {
    this.orders[index] = newOrder;
    this.OrderChanged.next(this.orders.slice());
  }

  deleteOrder(index: number) {
    this.orders.splice(index, 1);
    this.OrderChanged.next(this.orders.slice());
  }

  private handleError(error: any): Promise<any> {
    console.log(error.message);
    return Promise.reject(error.message || error);
  }
}
