import { NotificationService } from '@services/notification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss']
})
export class PushNotificationComponent implements OnInit,OnDestroy {

  notification = {
    title: '',
    massage: '',
    validDate: '',
    role: '',
    icon: ''
  }
  addNotificationSub1
  addNotificationSub2
  addNotificationSub3
  addNotificationSub4
  addNotificationSub5
  addNotificationSub6
  addNotificationSub7
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


  constructor(private notificationService:NotificationService) {
   }
 
  submit1() {
    this.notification.role = 'all'
    this.addNotificationSub1 = this.notificationService.addNotification(this.notification).subscribe(
      data => {
        Swal.fire(
          'Notification add!',
          data['msg'],
          'success'
        );
      },
      error => {
        Swal.fire(
          'Error!',
          error.error.msg,
          'error'
        );
      }
    )

  }

  submit2() {
    this.notification.role = 'donor'
    this.addNotificationSub2 = this.notificationService.addNotification(this.notification).subscribe(
      data => {
        Swal.fire(
          'Notification add!',
          data['msg'],
          'success'
        );
      },
      error => {
        Swal.fire(
          'Error!',
          error.error.msg,
          'error'
        );
      }
    )

  }
  submit3() {
    this.notification.role = 'patient'
    this.addNotificationSub3 = this.notificationService.addNotification(this.notification).subscribe(
      data => {
        Swal.fire(
          'Notification add!',
          data['msg'],
          'success'
        );
      },
      error => {
        Swal.fire(
          'Error!',
          error.error.msg,
          'error'
        );
      }
    )

  }
  submit4() {
    this.notification.role = 'salon'
    this.addNotificationSub4 = this.notificationService.addNotification(this.notification).subscribe(
      data => {
        Swal.fire(
          'Notification add!',
          data['msg'],
          'success'
        );
      },
      error => {
        Swal.fire(
          'Error!',
          error.error.msg,
          'error'
        );
      }
    )

  }
  submit5() {
    this.notification.role = 'manager'
    this.addNotificationSub5 = this.notificationService.addNotification(this.notification).subscribe(
      data => {
        Swal.fire(
          'Notification add!',
          data['msg'],
          'success'
        );
      },
      error => {
        Swal.fire(
          'Error!',
          error.error.msg,
          'error'
        );
      }
    )

  }
  submit6() {
    this.notification.role = 'attendant'
    this.addNotificationSub6 = this.notificationService.addNotification(this.notification).subscribe(
      data => {
        Swal.fire(
          'Notification add!',
          data['msg'],
          'success'
        );
      },
      error => {
        Swal.fire(
          'Error!',
          error.error.msg,
          'error'
        );
      }
    )

  }
  submit7() {
    this.notification.role = 'driver'
    this.addNotificationSub7 = this.notificationService.addNotification(this.notification).subscribe(
      data => {
        Swal.fire(
          'Notification add!',
          data['msg'],
          'success'
        );
      },
      error => {
        Swal.fire(
          'Error!',
          error.error.msg,
          'error'
        );
      }
    )

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.addNotificationSub1 !== undefined) {
      this.addNotificationSub1.unsubscribe();
    }
    if (this.addNotificationSub2 !== undefined) {
      this.addNotificationSub2.unsubscribe();
    }
    if (this.addNotificationSub3 !== undefined) {
      this.addNotificationSub3.unsubscribe();
    }
    if (this.addNotificationSub4 !== undefined) {
      this.addNotificationSub4.unsubscribe();
    }
    if (this.addNotificationSub5 !== undefined) {
      this.addNotificationSub5.unsubscribe();
    }
    if (this.addNotificationSub6 !== undefined) {
      this.addNotificationSub6.unsubscribe();
    }
    if (this.addNotificationSub7 !== undefined) {
      this.addNotificationSub7.unsubscribe();
    }
  }

}
