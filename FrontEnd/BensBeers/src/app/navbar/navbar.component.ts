import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, public data: DataService) { }
  isNavbarCollapsed = true;

  ngOnInit() {
  }

  loggedin() {
    this.data.orderSelected = ' ';
    if (this.data.loginRequired) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['account']);
    }
  }

}
