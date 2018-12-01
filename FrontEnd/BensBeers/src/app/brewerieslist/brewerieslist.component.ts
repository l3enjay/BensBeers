import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Brewery } from '../shared/products';

@Component({
  selector: 'app-brewerieslist',
  templateUrl: './brewerieslist.component.html',
  styleUrls: ['./brewerieslist.component.css']
})
export class BrewerieslistComponent implements OnInit {

  breweries: Brewery[] = [];
  constructor(public data: DataService) { }

  ngOnInit(): void {
    this.data.loadBreweries().subscribe(success => {
      if (success) {
        this.breweries = this.data.breweries;
      }
    });
  }

}
