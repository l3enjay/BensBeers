import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';
import {Router} from '@angular/router';
import {Order} from '../shared/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(public data: DataService, public router: Router) {}
  errorMessage = '';
  orders: Order[] = [];
  neworder: Order = new Order();

  ngOnInit() {}
  onCheckout() {
    this.data.checkout().subscribe(
      success => {
        if (success) {
          this.data.getorderbyordernumber().subscribe(
            success2 => {
              if (success2) {
                this.data.orderSelected = this.data.newOrder.orderID.toString();
                this.router.navigate(['order']);
              }
            },
            err => (this.errorMessage = this.data.newordernumber)
          );
        }
      },
      err => (this.errorMessage = 'Failed to save order')
    );
  }
}
