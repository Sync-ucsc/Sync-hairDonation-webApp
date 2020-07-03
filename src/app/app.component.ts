import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  x = { 
    publicKey: 'BE-J8ek0Xl6Mpgw5R6-B5M5BYISYVkQi6XVGmt8qymgz-u66hyrkEFcgZKJECL8bLHbPyPiVwgTaoH9EpP6VNlc', 
    privateKey: 'K2cXkx8quUdVzwF35KBX9NRXrGBiRNXRoE1WNz_StBM'
  }
  title = 'syncWebApp';
  readonly VAPID_PUBLIC_KEY = 'BE-J8ek0Xl6Mpgw5R6-B5M5BYISYVkQi6XVGmt8qymgz-u66hyrkEFcgZKJECL8bLHbPyPiVwgTaoH9EpP6VNlc'

  constructor(
    // private swPush: SwPush,
    // private newsletterService: NewsletterService
    ) {
    this.subscribeToNotifications()
     }

  subscribeToNotifications() {

    // this.swPush.requestSubscription({
    //   serverPublicKey: this.VAPID_PUBLIC_KEY
    // })
    //   .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
    //   .catch(err => console.error('Could not subscribe to notifications', err));
  }

}
