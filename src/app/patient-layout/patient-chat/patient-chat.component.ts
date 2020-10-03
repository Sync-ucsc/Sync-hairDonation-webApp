import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-patient-chat',
  templateUrl: './patient-chat.component.html',
  styleUrls: ['./patient-chat.component.scss']
})
export class PatientChatComponent implements OnInit {

  roomId = '5f09ec3de78dc2ce346234ab';
  senderRole = 'patient';
  senderId = '5f09ec3de78dc2ce346234ab';
  receiverId = '5f09eaf4e78dc2ce34623499';
  receiverRole = 'salon';

  constructor() {
  }

  ngOnInit(): void {
  }

}
