import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Supplier } from '../../supplier.model';



@Component({
  selector: 'app-supplier-item',
  templateUrl: './supplier-item.component.html',
  styleUrls: ['./supplier-item.component.css']
})
export class SupplierItemComponent implements OnInit {
  @Input() supplier: Supplier;
  @Input() index: string;
  @Output() getSupplierInfo: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
  }

  getSupplierInfoFunc(suppliername: string){
    console.log("supplier item kom ik hier");
    console.log(suppliername + "dit komt in de infofunc");
    this.getSupplierInfo.emit(suppliername);
}
}
