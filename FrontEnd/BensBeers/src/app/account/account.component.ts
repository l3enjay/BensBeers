import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Order } from '../shared/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public orders: Order[] = [];
  public isCollapsed = false;

  constructor(public data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.data.showuserOrders(true).subscribe(success => {
      if (success) {
        this.orders = this.data.userOrders;
      }
    });
  }

  orderDetails(orderid: string) {
    this.data.orderSelected = orderid;
    this.router.navigate(['order']);
  }

}
