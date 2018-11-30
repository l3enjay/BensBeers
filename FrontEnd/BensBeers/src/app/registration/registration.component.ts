import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Registration } from '../shared/registration';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private data: DataService) { }

  details: Registration = new Registration();

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    this.data.register(form.value).subscribe();
  }

}
