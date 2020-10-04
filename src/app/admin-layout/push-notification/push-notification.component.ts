import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss']
})
export class PushNotificationComponent implements OnInit {

  notification = {
    title: '',
    massage: '',
    validDate: '',
    role: '',
    icon: ''
  }
  notificationForm1 = new FormGroup({
    title: new FormControl('', [Validators.required]),
    massage: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    validDate: new FormControl('', [Validators.required])
  });
  notificationForm2 = new FormGroup({
    title: new FormControl('', [Validators.required]),
    massage: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    validDate: new FormControl('', [Validators.required])
  });
  notificationForm3 = new FormGroup({
    title: new FormControl('', [Validators.required]),
    massage: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    validDate: new FormControl('', [Validators.required])
  });
  notificationForm4 = new FormGroup({
    title: new FormControl('', [Validators.required]),
    massage: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    validDate: new FormControl('', [Validators.required])
  });
  notificationForm5 = new FormGroup({
    title: new FormControl('', [Validators.required]),
    massage: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    validDate: new FormControl('', [Validators.required])
  });
  notificationForm6 = new FormGroup({
    title: new FormControl('', [Validators.required]),
    massage: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    validDate: new FormControl('', [Validators.required])
  });
  notificationForm7 = new FormGroup({
    title: new FormControl('', [Validators.required]),
    massage: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    validDate: new FormControl('', [Validators.required])
  });
  today: number = Date.now();


  constructor() {
   }
 
  submit1() {
    this.notification.role = 'all'
    console.log(this.notification)
  }

  submit2() {
    this.notification.role = 'donor'
    console.log(this.notification)
  }
  submit3() {
    this.notification.role = 'patient'
    console.log(this.notification)
  }
  submit4() {
    this.notification.role = 'salon'
    console.log(this.notification)
  }
  submit5() {
    this.notification.role = 'manager'
    console.log(this.notification)
  }
  submit6() {
    this.notification.role = 'attendant'
    console.log(this.notification)
  }
  submit7() {
    this.notification.role = 'driver'
    console.log(this.notification)
  }

  ngOnInit() {
  }

}
