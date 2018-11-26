import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(public data: DataService, public router: Router) {}
  errorMessage = '';

  ngOnInit() {}
  onCheckout() {
    this.data.checkout().subscribe(
      success => {
        if (success) {
          this.router.navigate(['shop']);
        }
      },
      err => (this.errorMessage = 'Failed to save order')
    );
  }
}
