import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SupplierService } from '../supplier.service';
import { Supplier } from '../supplier.model';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit, OnDestroy {
  suppliers: Supplier[];
  subscription: Subscription;

  constructor(private supplierService: SupplierService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.supplierService.supplierChanged
      .subscribe(
        (suppliers: Supplier[]) => {
          this.suppliers = suppliers;
        }
      );
     this.supplierService.getSuppliers()
      .then(suppliers => this.suppliers = suppliers)
      .catch(error => console.log(error));
  }

  onNewSupplier() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
