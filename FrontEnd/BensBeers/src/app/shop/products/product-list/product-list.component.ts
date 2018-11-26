import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { BaseBeer } from '../../../shared/products';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private data: DataService) {
   }

  ngOnInit(): void {
    this.data.loadProducts()
        .subscribe(success => {
          if (success){
            this.products = this.data.products;            
          }
        })

  }
  public products: BaseBeer[] = [];

  addProduct(product: BaseBeer){
    this.data.addToOrder(product);
  }

}
