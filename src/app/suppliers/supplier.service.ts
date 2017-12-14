import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Supplier } from './supplier.model';
import { environment } from '../../environments/environment';
import { Http, Headers, URLSearchParams } from '@angular/http';


@Injectable()
export class SupplierService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/suppliers'; // URL to web api
  private suppliers: Supplier[] = [];
  supplierChanged = new Subject<Supplier[]>();

  constructor(private http: Http) {}
  
 public getSuppliers(): Promise<Supplier[]> {
    console.log('items ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        this.suppliers = response.json() as Supplier[];
        return this.suppliers;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getSupplier(index: string): Promise<Supplier> {
    console.log("im here?" + index);
    return this.http.get(this.serverUrl + '/' + index, { headers: this.headers })
      .toPromise()
      .then(response => {

        return response.json() as Supplier;

      })
      .catch(error => {
        return this.handleError('getsupplier id service');
      });
  }

  addSupplier(supplier: Supplier) {

    const supplier2 = supplier;

    return this.http.post(this.serverUrl , supplier2)
      .toPromise()
      .then(response => {
        return response.json() as Supplier;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  updateSupplier(index: string, newsupplier: Supplier) {
    return this.http.put(this.serverUrl + '/' + index , newsupplier)
      .toPromise()
      .then(response => {
        return response.json() as Supplier;
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteSupplier(index: string) {
    return this.http.delete(this.serverUrl + '/' + index, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
}


