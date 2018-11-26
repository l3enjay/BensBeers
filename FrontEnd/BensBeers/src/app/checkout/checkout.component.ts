import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit() {
  }
  onCheckout() {
    // TODO
    alert("Doing checkout");
  }
}