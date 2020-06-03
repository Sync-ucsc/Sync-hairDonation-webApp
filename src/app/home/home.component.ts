import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  SlideOptions = { items: 1, dots: true, nav: true };
  CarouselOptions = { items: 3, dots: true, nav: true };
  getInTouch: FormGroup;

  constructor(private _fb: FormBuilder) {
    const node = document.createElement('script');
    node.src = '../../assets/js/main.js';
    node.type = 'text/javascript';
    node.async = false;
    document.getElementsByTagName('head')[0].appendChild(node);

    this.buildForm();
   }


   buildForm(){
    this.getInTouch = this._fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    })
   }

  ngOnInit(): void {
      setTimeout(()=>{
          const loader = document.getElementsByClassName('loader-class')[0] as HTMLElement;
          const head = document.getElementsByClassName('head')[0] as HTMLElement;
          loader.style.display = 'none';
          head.style.display = 'block';
          const top = document.getElementsByClassName('back_top')[0] as HTMLElement;
          top.click();
      },500);
  }

  submit() {
    console.log(this.getInTouch.value);
  }
}
