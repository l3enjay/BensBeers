import {Component, OnInit} from '@angular/core';
import {DataService} from 'src/app/shared/data.service';
import {Router} from '@angular/router';
import { OrderItem } from 'src/app/shared/order';
import { BaseBeer } from 'src/app/shared/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(public data: DataService, private router: Router) {}

  ngOnInit() {}

  onCheckout() {
    if (this.data.loginRequired) {
      this.data.orderSelected = '';
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['shop/checkout']);
    }
  }


}
