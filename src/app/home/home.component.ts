import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  divs = [
    ` <div class="item">
                        <div class="row align-items-center">
                            <div class="col-lg-7">
                                <div class="content">
                                    <h2 class="banner-title text-lg-left text-center text-white text-uppercase">
                                        GROW YOUR BUSINESS<br>WITH US
                                    </h2>
                                    <p class="text-white text-lg-left text-center para-txt font-weight-medium f-16">
                                        simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                                        the
                                        industry's standard dummy text ever since the 1500s, when an unknown printer
                                        took a
                                        galley of type and scrambled it to make a type specimen book.
                                    </p>
                                    <div class="mt-md-4 mb-4 text-lg-left text-center">
                                        <a href="#" class="btn theme-btn text-white">GET STARTED</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div class="banner-img-02">
                                    <img src="../../assets/images/main-banner-01.png" class="img-fluid" alt>
                                </div>
                            </div>
                        </div>
                    </div>`,
     `<div class="item">
                        <div class="row align-items-center">
                            <div class="col-lg-7">
                                <div class="content">
                                    <h2 class="banner-title text-lg-left text-center text-white text-uppercase">
                                        GROW YOUR BUSINESS<br>WITH US
                                    </h2>
                                    <p class="text-white text-lg-left text-center para-txt font-weight-medium f-16">
                                        simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                                        the
                                        industry's standard dummy text ever since the 1500s, when an unknown printer
                                        took a
                                        galley of type and scrambled it to make a type specimen book.
                                    </p>
                                    <div class="mt-md-4 mb-4 text-lg-left text-center">
                                        <a href="#" class="btn theme-btn text-white">GET STARTED</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div class="banner-img-02">
                                    <img src="../../assets/images/main-banner-01.png" class="img-fluid" alt>
                                </div>
                            </div>
                        </div>
                    </div>`,
      `<div class="item">
                        <div class="row align-items-center">
                            <div class="col-lg-7">
                                <div class="content">
                                    <h2 class="banner-title text-lg-left text-center text-white text-uppercase">
                                        GROW YOUR BUSINESS<br>WITH US
                                    </h2>
                                    <p class="text-white text-lg-left text-center para-txt font-weight-medium f-16">
                                        simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                                        the
                                        industry's standard dummy text ever since the 1500s, when an unknown printer
                                        took a
                                        galley of type and scrambled it to make a type specimen book.
                                    </p>
                                    <div class="mt-md-4 mb-4 text-lg-left text-center">
                                        <a href="#" class="btn theme-btn text-white">GET STARTED</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div class="banner-img-02">
                                    <img src="../../assets/images/main-banner-01.png" class="img-fluid" alt>
                                </div>
                            </div>
                        </div>
                    </div>`
      ];

  SlideOptions = { items: 1, dots: true, nav: true };
  CarouselOptions = { items: 3, dots: true, nav: true }; 

  constructor() {
    const node = document.createElement('script');
    node.src = '../../assets/js/main.js';
    node.type = 'text/javascript';
    node.async = false;
    document.getElementsByTagName('head')[0].appendChild(node);
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

}
