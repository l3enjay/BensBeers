import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Order } from 'src/app/shared/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  title = 'Order Summary';

  order: Order = new Order();

  constructor(public data: DataService) { }

  ngOnInit() {
    this.data.specificorderpage().subscribe(success => {
      if (success) {
        this.order = this.data.selectedOrder;
        this.data.orderSelected = '';
      }
    });
  }

}
