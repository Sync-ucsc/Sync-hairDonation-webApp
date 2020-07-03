import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-request',
  templateUrl: './password-request.component.html',
  styleUrls: ['./password-request.component.scss']
})
export class PasswordRequestComponent implements OnInit {

  email:'';
  requestForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
