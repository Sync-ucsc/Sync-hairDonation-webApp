import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  x = {
    publicKey: 'BE-J8ek0Xl6Mpgw5R6-B5M5BYISYVkQi6XVGmt8qymgz-u66hyrkEFcgZKJECL8bLHbPyPiVwgTaoH9EpP6VNlc',
    privateKey: 'K2cXkx8quUdVzwF35KBX9NRXrGBiRNXRoE1WNz_StBM'
  }
  title = 'syncWebApp';
  readonly VAPID_PUBLIC_KEY = 'BE-J8ek0Xl6Mpgw5R6-B5M5BYISYVkQi6XVGmt8qymgz-u66hyrkEFcgZKJECL8bLHbPyPiVwgTaoH9EpP6VNlc'

  constructor(
    private swUpdate: SwUpdate,
    private swPush: SwPush,
    // private newsletterService: NewsletterService
    private notificationService: NotificationService
    ) {
     this.subscribeToNotifications()
     }
  ngOnInit(): void {
    this.reloadCache();
  }

  subscribeToNotifications() {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub1 => {
        const data = {
          sub: sub1,
          role: 'all'
        };
        this.notificationService.addPushSubscriber(data).subscribe((data1)=>{});})
      .catch(err => console.log('Could not subscribe to notifications', err));
  }

  reloadCache(){
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      })
    }
  }

}
