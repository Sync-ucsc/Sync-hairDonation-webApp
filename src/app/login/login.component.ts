import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:{
    email:null,
    password: null
  }

  constructor() { }

  ngOnInit(): void {
  }

  ismobile(){
    if(window.innerWidth<764){
      return true;
    } else {
      return false;
    }
  }

  login(){
    
  }

}
