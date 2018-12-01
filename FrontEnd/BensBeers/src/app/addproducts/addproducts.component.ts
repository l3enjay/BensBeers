import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { BaseBeer, Brewery } from '../shared/products';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(public data: DataService) { }
  newBeer: BaseBeer = new BaseBeer();
  breweries: Brewery[] = [];

  ngOnInit(): void {
    this.data.loadBreweries().subscribe(success => {
      if (success) {
        this.breweries = this.data.breweries;
      }
    });
  }

}
