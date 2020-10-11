import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ChatService} from '@services/chat.service';

import {environment} from '@environments/environment';

import {BackendResponse} from '@model/backendResponse';
import {DbChat} from '@model/database/dbChat';

import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit , OnChanges{

  @Input() roomId: string;
  @Input() senderId: string;
  @Input() receiverId: string;
  @Input() senderRole: string;
  @Input() receiverRole: string;

  senderDetails;

  sendMessageForum: FormGroup;
  receiverDetails: any;

  sendMessageList: DbChat[] = [];
  receiveMessageList: DbChat[] = [];

  socket = io(`${environment.BASE_URL}`);

  constructor(private _fb: FormBuilder,
              private _chat: ChatService) {
  }

  async ngOnInit(): Promise<void> {

    console.log(`sender Id ${this.senderId}`)
    console.log(`senderRole ${this.senderRole}`)
    console.log(`receiver Id ${this.receiverId}`)
    console.log(`receiver role ${this.receiverRole}`)
    console.log(`roomId ${this.roomId}`)


    this.sendMessageForum = this._fb.group({
      message: new FormControl('', Validators.required)
    })

    const receiverDetails = await this._chat.getUserDetails(this.receiverId)
      .toPromise() as BackendResponse

    this.receiverDetails = receiverDetails.success ? receiverDetails.data : null;

    // join for chat room
    this.socket.emit('join_to_room', {roomId: this.roomId})

    // get sender and receiver full name and profile picture
    const senderDetails = await this._chat.getUserDetails(this.senderId)
      .toPromise()  as BackendResponse

    this.senderDetails = senderDetails.success ? senderDetails.data : null;

    // listen for new message
    this.socket.on('receive_message', data => {

      this.receiveMessageList.push(data)

      if(this.receiveMessageList.length >= 4) {
        this.receiveMessageList.shift();
      }

      console.log(this.sendMessageList)
      console.log(this.receiveMessageList)

    })
  }

  async ngOnChanges(changes: SimpleChanges) {

    this.receiveMessageList = [];
    this.sendMessageList = [];

    const receiverDetails = await this._chat.getUserDetails(changes.receiverId.currentValue)
      .toPromise() as BackendResponse

    this.receiverDetails = receiverDetails.success ? receiverDetails.data : null;

    // join for chat room
    this.socket.emit('join_to_room', {roomId: this.roomId})
  }

  sendMessageToReceiver() {
    const data: DbChat = {
      senderId: this.senderId,
      receiverId: this.receiverId,
      senderRole: this.senderRole,
      receiverRole: this.receiverRole,
      content: this.sendMessageForum.value.message,
      createdAt: Date.now().toString(),
    }

    if(this.sendMessageList.length >= 4) {
      this.sendMessageList.shift();
    }

    this.sendMessageList.push(data)
    this.socket.emit('send_message', data)
  }


}
