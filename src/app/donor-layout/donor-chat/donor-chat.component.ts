import { Component, OnInit } from '@angular/core';
import {TokenService} from '@services/token.service';

@Component({
  selector: 'app-donor-chat',
  templateUrl: './donor-chat.component.html',
  styleUrls: ['./donor-chat.component.scss']
})
export class DonorChatComponent implements OnInit {

  roomId = '';
  senderRole = 'donor';
  senderId = '';

  receiverId = '5f083ac5c68a84443c228d26';
  receiverRole = 'salon';

  constructor(private _token: TokenService) { }

  ngOnInit(): void {
    this.senderId = this._token.getId();
    this.senderRole = this._token.getRole();
    this.roomId = this._token.getId();

    console.log(` ${this.senderId} ${this.senderRole} ${this.roomId}`)
  }

}
