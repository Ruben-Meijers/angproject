import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: string;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
        this.productService.getProduct(this.id.toString())
            .then(product => this.product = product)
            .catch(error => console.log('edit init getproduct error'));
        }
      );
  }
  onEditProduct() {
   // this.router.navigate(['edit'], {relativeTo: this.route});
     this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteProduct() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
        } );
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/products']);
  }



}
