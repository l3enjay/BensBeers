import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { BaseBeer, Brewery } from '../shared/products';
import { NgForm, FormControlName, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(public data: DataService, public router: Router) { }
  breweries: Brewery[] = [];
  newproduct: BaseBeer = new BaseBeer();

  public formGroup: FormGroup;

  public beersize = [
    { value: 330, display: '330ml' },
    { value: 440, display: '440ml' },
    { value: 500, display: '500ml' },
    {value: 1000, display: '1 Litre'}
  ];

  ngOnInit(): void {
    this.data.loadBreweries().subscribe(success => {
      if (success) {
        this.breweries = this.data.breweries;
      }
    });
  }

  onAdd(form: NgForm) {
     this.data.addproduct(form.value).subscribe();
  }

}
