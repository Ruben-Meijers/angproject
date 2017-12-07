import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { ProductService } from '../product.service';
import {Product} from '../product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id: string;
  editMode = false;
  productForm: FormGroup;
  public product: Product;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {
    this.initForm();

  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        });
    console.log(this.productService.getProduct(this.id.toString())
      .then(product => this.product = product)
      .catch(error => console.log('editmode error')) );

  }

  onSubmit() {
    const newProduct = new Product(
      this.productForm.value['name'],
      this.productForm.value['description'],
      this.productForm.value['imagePath'],
      this.productForm.value['instock'],
      this.productForm.value['orderprice'],
    );
    if (this.editMode) {
      this.productService.updateProduct(this.id,newProduct);
    } else {
      this.productService.addProduct(this.productForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.productForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.productForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let product2: Product;
    let productName = '';
    let productImagePath = '';
    let productDescription = '';
    let productInstock = '';
    let productOrderPrice = '';

    if (this.editMode) {
      this.productService.getProduct(this.id.toString())
        .then(product => product2 = product)
        .catch(error => console.log('editmode error'));
      productName = this.product.name;
      productImagePath = this.product.imagePath;
      productDescription = this.product.description;
      productInstock = this.product.instock;
      productOrderPrice = this.product.orderprice;
    }

    this.productForm = new FormGroup({
      'name': new FormControl(productName),
      'imagePath': new FormControl(productImagePath),
      'description': new FormControl(productDescription),
      'instock': new FormControl(productInstock),
      'orderprice': new FormControl(productOrderPrice),
    });
  }

}
