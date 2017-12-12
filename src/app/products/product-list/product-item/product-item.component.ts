import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../product.model';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() index: string;
  @Output() addtoOrderEvent: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
  }

  addtoOrder(productid: string){
      this.addtoOrderEvent.emit(productid);
  }

}
