import {Component, OnInit} from '@angular/core';
import {TokenService} from '@services/token.service';

@Component({
  selector: 'app-saloon-chat',
  templateUrl: './saloon-chat.component.html',
  styleUrls: ['./saloon-chat.component.scss']
})
export class SaloonChatComponent implements OnInit {

  roomId = '';
  senderRole = 'salon';
  senderId = '';

  receiverId = '5f0aa78d114675cce8aadd6c';
  receiverRole = 'donor';

  constructor(private _token: TokenService) {
  }

  ngOnInit(): void {

    this.senderId = this._token.getId();
    this.senderRole = this._token.getRole();
    this.roomId = this._token.getId();

    console.log(` ${this.senderId} ${this.senderRole} ${this.roomId}`)

  }

}
