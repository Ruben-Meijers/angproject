import { Component, OnInit, Input } from '@angular/core';
import { Supplier } from '../../supplier.model';


@Component({
  selector: 'app-supplier-item',
  templateUrl: './supplier-item.component.html',
  styleUrls: ['./supplier-item.component.css']
})
export class SupplierItemComponent implements OnInit {
  @Input() supplier: Supplier;
  @Input() index: number;

  ngOnInit() {
  }

}
