import { ProfileComponent } from './profile/profile.component';
import { TokenService } from './../service/token.service';
import { UserService } from '@services/user.service';
import { Component, OnInit, ViewChild, AfterViewInit, Injectable } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from '@services/notification.service';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from '@services/common.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  image;
  name;
  arr: any = [];

  constructor(public location: Location, private userService: UserService, private token: TokenService, private service: CommonService,
    private notificationService:NotificationService) {
      this.name = token.getFirstName() + ' ' + token.getLastName();
      this.image = token.getImg();
    this.getNotification()
      setTimeout(() => {
          const node = document.createElement('script');
          node.src = '../../assets/js/scripts.bundle.js';
          node.type = 'text/javascript';
          node.async = false;
          document.getElementsByTagName('head')[0].appendChild(node);
      }, 200)
  }

  ngOnInit() {
    if (this.image)
    this.service.data$.subscribe(res =>{ this.image = res['image'], this.name = res['name']} )
  }


  logout(){
    this.userService.loguot();
  }

  getNotification(){
    this.notificationService.getAllNotification().subscribe(
      data=> {
        data['data'].forEach(e => { 
          if (e.role === 'all' && e.notificationStatus !== '2' && this.calculateDiff(e.validDate) >= 0){
            this.arr.push(e);
          }
        })
        console.log(this.arr);
      }
    )
  }

  calculateDiff(date) {
    let validDate = new Date(date);
    let currentDate = new Date();

    return Math.floor((Date.UTC(validDate.getFullYear(), validDate.getMonth(), validDate.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / (1000 * 60 * 60 * 24));
  }

}
