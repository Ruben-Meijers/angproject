import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Supplier } from '../supplier.model';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {
  id: string;
  editMode = false;
  supplierForm: FormGroup;
  public supplier: Supplier;

  constructor(private route: ActivatedRoute,
              private supplierService: SupplierService,
              private router: Router) {
    this.initForm();

  }
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['_id'];
          this.editMode = params['_id'] != null;
          this.initForm();
        });
        if(this.id){
      this.supplierService.getSupplier(this.id.toString())
      .then(supplier => this.supplier = supplier)
      .catch(error => console.log('editmode error'));
        }
  }

  onSubmit() {
    var tempId = null;
    if(this.id == null || this.id === 'new'){

    }else {
      tempId = this.id;
    }
    const newSupplier = new Supplier(
      tempId,
      this.supplierForm.value['name'],
      this.supplierForm.value['age'],
      this.supplierForm.value['telnummer'],
    );
    if (this.editMode) {
      this.supplierService.updateSupplier(this.id,newSupplier);
    } else {
      this.supplierService.addSupplier(this.supplierForm.value);
    }
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  private initForm() {
    let supplier2: Supplier;
    let supplierName = '';
    let supplierAge = '';
    let supplierTelnummer = '';

    if (this.editMode) {
      this.supplierService.getSupplier(this.id.toString())
        .then(supplier => supplier2 = supplier)
        .catch(error => console.log('editmode error'));
      supplierName = this.supplier.name;
      supplierAge = this.supplier.age;
      supplierTelnummer = this.supplier.telnummer;
    }

    this.supplierForm = new FormGroup({
      'name': new FormControl(supplierName),
      'age': new FormControl(supplierAge),
      'telnummer': new FormControl(supplierTelnummer)
    });
  }

}
