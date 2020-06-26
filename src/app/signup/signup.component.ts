import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare function getFingerprint(): any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {
    fname:'',
    lname:'',
    phone:'',
    email:'',
    lat: ''
  }

  btn1 =false;
  btn2 = false;
  btn3 = false;
  btn4 = false;
  btncu2 = false;
  btncu3 = false;
  btncu4 = false;



  form1 = true;
  form2 = false;
  form3 = false;
  form4 = false;

  

  signForm1 = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required,Validators.maxLength(10), Validators.minLength(8)])
  });

  constructor() {
    // console.log(getFingerprint());
  }

  ngOnInit(): void {
    console.log()
  }

  ismobile() {
    if (window.innerWidth < 764) {
      return true;
    } else {
      return false;
    }
  }

  changeForm(x){
    let elm1 = document.getElementsByClassName('btn1')
    if(x === 'form1'){
      this.form1 = true;
      this.form2 = false;

      this.btn1 = false;
      this.btn2 = false;
      this.btn3 = false;
      this.btn4 = false;
      this.btncu2 = false;
      this.btncu3 = false;
      this.btncu4 = false;
    } else if( x === 'form2'){
      if(this.signForm1.valid){
        this.form1 = false;
        this.form2 = true;
        this.form3 = false;

        this.btn1 = true;
        this.btn2 = false;
        this.btn3 = false;
        this.btn4 = false;
        this.btncu2 = true;
        this.btncu3 = false;
        this.btncu4 = false;
      }
    } else if ( x === 'form3'){
      this.form2 = false;
      this.form3 = true;
      this.form4 = false;

      this.btn1 = true;
      this.btn2 = true;
      this.btn3 = false;
      this.btn4 = false;
      this.btncu2 = false;
      this.btncu3 = true;
      this.btncu4 = false;

    } else if ( x === 'form4'){
      this.form3 = false;
      this.form4 = true;
      
      this.btn1 = true;
      this.btn2 = true;
      this.btn3 = true;
      this.btn4 = false;
      this.btncu2 = false;
      this.btncu3 = false;
      this.btncu4 = true;
    }
  }

}
