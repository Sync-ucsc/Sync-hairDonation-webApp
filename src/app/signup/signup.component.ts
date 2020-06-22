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
    setTimeout(() => {
      const node = document.createElement('script');
      node.src = '../../assets/js/login3.js';
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }, 200)
  }

  ngOnInit(): void {

  }

}
