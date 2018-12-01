import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../shared/data.service';
import {BaseBeer} from '../../../shared/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private data: DataService) {}
  public products: BaseBeer[] = [];

  ngOnInit(): void {
    this.data.loadProducts().subscribe(success => {
      if (success) {
        this.products = this.data.products;
      }
    });
    console.log(this.data.isuseradmin());
  }

  addProduct(product: BaseBeer) {
    this.data.addToOrder(product);
  }
}
