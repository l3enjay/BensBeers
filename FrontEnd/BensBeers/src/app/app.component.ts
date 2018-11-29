import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'BensBeers';

  constructor(private router: Router, public data: DataService) {}
  loggedin() {
    this.data.orderSelected = ' ';
    if (this.data.loginRequired) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['account']);
    }
  }
}
