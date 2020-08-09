import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-saloon-chat',
  templateUrl: './saloon-chat.component.html',
  styleUrls: ['./saloon-chat.component.scss']
})
export class SaloonChatComponent implements OnInit {

  roomId = '5f09eaf4e78dc2ce34623499';
  senderRole = 'salon';
  senderId = '5f09eaf4e78dc2ce34623499';
  receiverId = '5f09ec3de78dc2ce346234ab';
  receiverRole = 'patient';

  constructor() {
  }

  ngOnInit(): void {
  }

}
