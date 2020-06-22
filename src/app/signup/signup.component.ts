import { Component, OnInit } from '@angular/core';
declare const getFingerprint: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor() { 
    console.log(getFingerprint());
  }

  ngOnInit(): void {

  }

}
