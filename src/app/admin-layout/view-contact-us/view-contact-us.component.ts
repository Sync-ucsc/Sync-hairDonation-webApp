import {Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Response} from '../../interfaces/response';

@Component({
  selector: 'app-view-contact-us',
  templateUrl: './view-contact-us.component.html',
  styleUrls: ['./view-contact-us.component.scss']
})
export class ViewContactUsComponent implements OnInit {
  BASE_URL = environment.BASE_URL;
  socket = io(`${this.BASE_URL}/getInTouch`);
  loading = true;
  messages;
  constructor(private _http: HttpClient) {
  }

  ngOnInit(): void {
    console.log('here');
    this.getContactUs();
    this.socket.on('new-contact-us', () => {
    });
    this.socket.on('update-contact-us', () => {
    });
    this.socket.on('delete-contact-us', () => {
    });
  }

  getContactUs() {
    console.log('here2');

    const url = `${this.BASE_URL}/getInTouch/all`;
    console.log(url)

    this._http.get(`${this.BASE_URL}/getInTouch/all`).subscribe(
      (response: Response) => {
        if(response.success){
          this.loading = false;
          this.messages = response.data;
          console.log(response.data);
        }else {
          console.log(response.debugMessage);
        }
      },
      error => {
        console.log('error');
        console.log(error)
      }
    )
  }

}
