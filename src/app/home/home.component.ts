import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

import {environment} from '@environments/environment';
import {GetInTouch} from '@model/getInTouch';
import {BackendResponse} from '@model/backendResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  SlideOptions = {items: 1, dots: true, nav: true};
  CarouselOptions = {items: 3, dots: true, nav: true};
  getInTouch: FormGroup;

  BASE_URL = environment.BASE_URL;

  constructor(private _fb: FormBuilder,
              private _http: HttpClient,
              private _toastr: ToastrService) {
    const node = document.createElement('script');
    node.src = '../../assets/js/main.js';
    node.type = 'text/javascript';
    node.async = false;
    document.getElementsByTagName('head')[0].appendChild(node);

    this.buildForm();
  }


  buildForm() {
    this.getInTouch = this._fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    // const owl = $('.owl-carousel');
    // // @ts-ignore
    // owl.owlCarousel({
    //   items:4,
    //   loop:true,
    //   margin:10,
    //   autoplay:true,
    //   autoplayTimeout:1000,
    //   autoplayHoverPause:true
    // });
    // $('.play').on('click',() => {
    //   owl.trigger('play.owl.autoplay',[1000])
    // })
    // $('.stop').on('click',() => {
    //   owl.trigger('stop.owl.autoplay')
    // })
    setTimeout(() => {
      const loader = document.getElementsByClassName('loader-class')[0] as HTMLElement;
      const head = document.getElementsByClassName('head')[0] as HTMLElement;
      loader.style.display = 'none';
      head.style.display = 'block';
      const top = document.getElementsByClassName('back_top')[0] as HTMLElement;
      top.click();
    }, 500);
  }

  async submit() {
    try {
      const data = this.getInTouch.value as GetInTouch;
      console.log(data)

      const response = await this._http
        .post(`${this.BASE_URL}/getInTouch/sendEmail`, data)
        .toPromise() as BackendResponse;

      console.log(response)

      if (response.success) {
        this.getInTouch.reset()
        this.getInTouch.clearValidators()
        this.getInTouch.clearAsyncValidators()
        setTimeout(() => this.formGroupDirective.resetForm(), 0);
        this._toastr.success('successfully send message');
      } else {
        this._toastr.error('fail to send message');

      }

    } catch (error) {
      this._toastr.error('fail to send message');
    }


  }
}
