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
  signForm1 = new FormGroup({
    title: new FormControl('', [Validators.required]),
    massage: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    validDate: new FormControl('', [Validators.required])
  });
  today: number = Date.now();


  constructor() {
   }
 
  submit1() {

  }

  ngOnInit() {
  }

}
