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
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  x = {
    publicKey: 'BE-J8ek0Xl6Mpgw5R6-B5M5BYISYVkQi6XVGmt8qymgz-u66hyrkEFcgZKJECL8bLHbPyPiVwgTaoH9EpP6VNlc',
    privateKey: 'K2cXkx8quUdVzwF35KBX9NRXrGBiRNXRoE1WNz_StBM'
  }
  constructor(public location: Location, private router: Router, private swPush: SwPush,private notificationService: NotificationService) {
      setTimeout(() => {
          const node = document.createElement('script');
          node.src = '../../assets/js/scripts.bundle.js';
          node.type = 'text/javascript';
          node.async = false;
          document.getElementsByTagName('head')[0].appendChild(node);
      }, 200)
  }

  ngOnInit() {
  this.subscribeToNotifications()
  }

  subscribeToNotifications() {

    this.swPush.requestSubscription({
      serverPublicKey: this.x.publicKey
    })
      .then(sub => this.notificationService.addPushSubscriber(sub).subscribe())
      .catch(err => console.log('Could not subscribe to notifications', err));
  }

}
