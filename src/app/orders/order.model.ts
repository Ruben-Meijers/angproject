import { Product } from "../products/product.model";

export class Order {
    constructor(
        public _id: string,
      public name: string, 
      public description: string,
      public date: string,
      public supplier: string,
      public product: Product[]
    ) {}
    
  }
  