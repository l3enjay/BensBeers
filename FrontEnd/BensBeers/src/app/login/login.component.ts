import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private data: DataService, private router: Router) {}
  errorMessage = '';

  public creds = {
    username: '',
    password: '',
  };

  ngOnInit() {}

  onLogin() {
    this.data.login(this.creds).subscribe(
      success => {
        if (success) {
          if (this.data.order.items.length === 0) {
            this.router.navigate(['shop']);
          } else {
            this.router.navigate(['shop/checkout']);
          }
        }
      },
      err => (this.errorMessage = 'Failed to Login')
    );
  }
}
