import { Component, OnInit, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from 'sweetalert2'

import {environment} from '../../../environments/environment';
import {BackendResponse} from '@model/backendResponse';

@Component({
  selector: 'app-view-contact-us',
  templateUrl: './view-contact-us.component.html',
  styleUrls: ['./view-contact-us.component.scss']
})
export class ViewContactUsComponent implements OnInit,OnDestroy {
  BASE_URL = `${environment.BASE_URL}/getInTouch`;
  socket = io(`${environment.BASE_URL}`);
  loading = true;
  messages;
  geturlSub;
  posturlSub;

  constructor(private _http: HttpClient,
              private _toastr: ToastrService,
              public spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    console.log('here');
    this.spinner.show();
    this.getContactUs();
    this.socket.on('new-contact-us', () => this.getContactUs());
    this.socket.on('delete-contact-us', () => {
      console.log('trigger');
      this.getContactUs()
    });
  }

  getContactUs() {

    const url = `${this.BASE_URL}/all`;

    this.geturlSub = this._http.get(url).subscribe(
      (response: BackendResponse) => {
        this.loading = false;
        if (response.success) {
          this.spinner.hide();
          this.messages = response.data;
        } else {
          this.messages = null;
          this.spinner.hide();
          this._toastr.error('fail to fetch data');
        }
      },
      error => {
        this.loading = false;
        this.spinner.hide();
        this._toastr.error('fail to fetch data');
        this.messages = null;
      }
    )
  }

  deleteMessage(message: any) {

    const url = `${this.BASE_URL}/deleteOne`;

    Swal.fire({
      title: 'Are you sure?',
      text: `Message will be deleted permanently`,
      icon: 'warning',
      showCancelButton: true,

      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(result => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Message was not deleted',
          'error'
        )
      } else {
        this.posturlSub = this._http.post(url, {id: message._id}).subscribe(
          (response: BackendResponse) => {
            if (!response.success) {
              Swal.fire(
                'Error',
                'Message was not deleted',
                'error'
              )
            } else {
              Swal.fire(
                'Deleted!',
                'Message has been deleted.',
                'success'
              )
            }
          },
          error => {
            Swal.fire(
              'Error',
              'Message was not deleted',
              'error'
            )
          }
        )
      }
    });
    console.log(message)
  }

  ngOnDestroy() {

    if (this.posturlSub !== undefined) {
      this.posturlSub.unsubscribe();
    }
    if (this.geturlSub !== undefined) {
      this.geturlSub.unsubscribe();
    }
  }
}
