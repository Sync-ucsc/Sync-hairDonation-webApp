import { TokenService } from './../service/token.service';
import { UserService } from '@services/user.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  image;
  name;

  constructor(public location: Location,private userService: UserService,private token: TokenService) {
      this.name = token.getFirstName() + ' ' + token.getLastName();
      this.image = token.getImg();
      setTimeout(() => {
          const node = document.createElement('script');
          node.src = '../../assets/js/scripts.bundle.js';
          node.type = 'text/javascript';
          node.async = false;
          document.getElementsByTagName('head')[0].appendChild(node);
      }, 200)
  }

  ngOnInit() {
  }

  logout(){
    this.userService.loguot();
  }

}
