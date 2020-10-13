import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ChatService} from '@services/chat.service';

import {environment} from '@environments/environment';

import {BackendResponse} from '@model/backendResponse';
import {DbChat} from '@model/database/dbChat';

import * as io from 'socket.io-client';
import {TokenService} from "@services/token.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit, OnChanges {

  @Input() roomId: string;
  @Input() senderId: string;
  @Input() receiverId: string;
  @Input() senderRole: string;
  @Input() receiverRole: string;

  senderDetails;
  messagesList = [];
  sendMessageForum: FormGroup;
  receiverDetails: any;
  previousSender = undefined;
  sendMessageList: DbChat[] = [];
  receiveMessageList: DbChat[] = [];
  myId
  socket = io(`${environment.BASE_URL}`);

  constructor(private _fb: FormBuilder,
              private _chat: ChatService,
              private _tokenService: TokenService,
              private _http: HttpClient) {
    this.myId = this._tokenService.getId()
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
      .toPromise() as BackendResponse

    this.senderDetails = senderDetails.success ? senderDetails.data : null;

    this.socket.on('new_message', async (data) => {
      console.log('new message')
      console.log(data)
      console.log(data.receiverId)
      console.log(this._tokenService.getId())
      if (data.receiverId === this._tokenService.getId()) {
        if (this.previousSender !== data.senderId) {

          console.log('new user')
          this.messagesList = [];
          this.receiverId = data.senderId
          this.previousSender = data.senderId
          this.receiveMessageList = [];
          this._http.post(`${environment.BASE_URL}/chat/getMyOldMessage`, {
            receiverId: data.receiverId,
            senderId: data.senderId
          }).subscribe(data1 => {
            console.log('success previous chat list')
            console.log(data1)

            // @ts-ignore
            this.messagesList = data1.data
          }, error => {
            console.log('error on previous chat list')
          })
          const receiverDetails1 = await this._chat.getUserDetails(data.senderId)
            .toPromise() as BackendResponse


          this.receiverDetails = receiverDetails1.success ? receiverDetails1.data : null;
        } else {
          console.log('old user')
        }


        this.messagesList.push({
          senderId: data.senderId,
          receiverId: data.receiverId,
          senderRole: data.senderRole,
          receiverRole: data.receiverRole,
          content: data.content,
          createdAt: data.createdAt,
        })

        console.log(this.messagesList)

        console.log('msg for me')
      }


    })

    // listen for new message
    this.socket.on('receive_message', async data => {

      // if(this.previousSender !== data.senderId){
      //   console.log('new user')
      //   this.receiveMessageList = [];
      //   const receiverDetails1 = await this._chat.getUserDetails(data.senderId)
      //     .toPromise() as BackendResponse
      //
      //   console.log(receiverDetails1);
      //
      //
      //   this.receiverDetails = receiverDetails1.success ? receiverDetails1.data : null;
      //
      //   this.socket.emit('join_to_room', {roomId: this.roomId})
      // }
      // console.log(data)
      //
      // this.receiveMessageList.push(data)
      //
      // if(this.receiveMessageList.length >= 4) {
      //   this.receiveMessageList.shift();
      // }
      //
      // console.log(this.sendMessageList)
      // console.log(this.receiveMessageList)

    })
  }

  async ngOnChanges(changes: SimpleChanges) {

    this.receiveMessageList = [];
    this.sendMessageList = [];
    this.messagesList = [];

    const receiverDetails = await this._chat.getUserDetails(changes.receiverId.currentValue)
      .toPromise() as BackendResponse

    this._http.post(`${environment.BASE_URL}/chat/getMyOldMessage`, {
      receiverId: this.receiverId,
      senderId: this.senderId
    }).subscribe(data1 => {
      console.log('success previous chat list')
      // @ts-ignore
      this.messagesList = data1.data
      // this.receiveMessageList = ;
    }, error => {
      console.log('error on previous chat list')
    })

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

    // if(this.sendMessageList.length >= 4) {
    //   this.sendMessageList.shift();
    // }
    this.socket.emit('send_message', data)

    this.messagesList.push(data)
    console.log(data)
    console.log(this.messagesList)
    this.sendMessageList.push(data)
  }


}
