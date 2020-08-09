import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PreviousChatList} from '@model/chat/PreviousChatList';
import {Message} from '@model/chat/Message';
import {ChatService} from '@services/chat.service';

import {environment} from '@environments/environment';

import * as io from 'socket.io-client';
import {DbChat} from '@model/database/dbChat';
import {BackendResponse} from "@model/backendResponse";

@Component({
  selector: 'app-shared-chat',
  templateUrl: './shared-chat.component.html',
  styleUrls: ['./shared-chat.component.scss']
})
export class SharedChatComponent implements OnInit {

  @Input() roomId: string;
  @Input() senderId: string;
  @Input() receiverId: string;
  @Input() senderRole: string;
  @Input() receiverRole: string;

  senderDetails;
  receiverDetails;

  sendMessage: FormGroup;
  searchBarValue: string;

  previousChatList: PreviousChatList[];
  sendMessageList: DbChat[] = [];
  receiveMessageList: DbChat[] = [];

  socket = io(`${environment.BASE_URL}`);

  constructor(private _fb: FormBuilder,
              private _chat: ChatService) {

  }

  async ngOnInit(): Promise<void> {
    // join for chat room
    this.socket.emit('join_to_room', {roomId: this.roomId})
    // get sender and receiver full name and profile picture
    const receiverDetails = await this._chat.getUserDetails(this.receiverId)
      .toPromise() as BackendResponse

    this.receiverDetails = receiverDetails.success ? receiverDetails.data : null;

    const senderDetails = await this._chat.getUserDetails(this.senderId)
      .toPromise()  as BackendResponse

    this.senderDetails = senderDetails.success ? senderDetails.data : null;

    console.log(this.receiverDetails)
    console.log(this.senderDetails)
    // listen for new message
    this.socket.on('receive_message', data => {

      this.receiveMessageList.push(data)

      if(this.receiveMessageList.length >= 4) {
        this.receiveMessageList.shift();
      }
      console.log(this.receiveMessageList)
    })

    this.buildForms();

    this.previousChatList = this._chat.getPreviousChatList();
    // this.sendMessageList = this._chat.getSendMessage();
    // this.receiveMessageList = this._chat.getReceiveMessage();

  }

  buildForms() {
    this.sendMessage = this._fb.group({
      message: new FormControl('', Validators.required)
    })
  }



  showData() {
    console.log({
      senderId: this.senderId,
      receiverId: this.receiverId,
      senderRole: this.senderRole,
      receiverRole: this.receiverRole,
    })
  }

  sendMessageToReceiver() {

    const data: DbChat = {
      senderId: this.senderId,
      receiverId: this.receiverId,
      senderRole: this.senderRole,
      receiverRole: this.receiverRole,
      content: this.sendMessage.value.message,
      createdAt: Date.now().toString(),
    }

    this.sendMessageList.push(data);

    if(this.sendMessageList.length >= 4) {
      this.sendMessageList.shift();
    }
    console.log(this.sendMessageList)

    this.socket.emit('send_message', data)
  }

  joinRoom1() {
    this.socket.emit('join_to_room', {roomId: 1})
  }


  joinRoom2() {
    this.socket.emit('join_to_room', {roomId: 2})
  }

  searchValueChange() {
    console.log(this.searchBarValue)
  }

}
