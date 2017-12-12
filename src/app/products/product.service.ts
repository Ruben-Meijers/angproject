import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Product } from './product.model';
import { environment } from '../../environments/environment';
import { Http, Headers, URLSearchParams } from '@angular/http';


@Injectable()
export class ProductService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/products'; // URL to web api
  private products: Product[] = [];
  private product: Product;
  productsChanged = new Subject<Product[]>();
  private prodArray: Product[] = [];
  productsArrayChanged = new Subject<Product[]>();

  constructor(private http: Http) {}

public getArray(){
  return this.prodArray;
}

public addToArray(product){
  console.log(product.name + "------naar array gestuurt----");
  this.prodArray.push(product);
   this.productsArrayChanged.next(this.prodArray.slice());
}

 public getProducts(): Promise<Product[]> {
    console.log('items ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
      this.products = response.json() as Product[];
        return this.products;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getProduct(index: string): Promise<Product> {
    return this.http.get(this.serverUrl + '/' + index, { headers: this.headers })
      .toPromise()
      .then(response => {
        // let test = response.json() as Product;
        // console.log(test._id + test.name +  "-----het product-----");
        return response.json() as Product;

      })
      .catch(error => {
        return this.handleError('getproduct id service');
      });
  }

  public getProducts_In_Order(orderid): Promise<Product[]> {
    console.log('items ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
      this.products = response.json() as Product[];
        return this.products;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  addProduct(product: Product) {

    const product2 = product;

    return this.http.post(this.serverUrl , product2)
      .toPromise()
      .then(response => {
        return response.json() as Product;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  updateProduct(index: string, newProduct: Product) {
    return this.http.put(this.serverUrl + '/' + index , newProduct)
      .toPromise()
      .then(response => {
        return response.json() as Product;
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteProduct(index: string) {
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


