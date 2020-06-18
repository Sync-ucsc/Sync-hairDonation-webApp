import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PreviousChatList} from '../../model/chat/PreviousChatList';
import {Message} from '../../model/chat/Message';

@Component({
  selector: 'app-shared-chat',
  templateUrl: './shared-chat.component.html',
  styleUrls: ['./shared-chat.component.scss']
})
export class SharedChatComponent implements OnInit {

  senderAvatar = '../../../assets/chat/maleAvatar.svg';
  receiverAvatar = '../../../assets/chat/femaleAvatar.svg';

  sendMessage: FormGroup;
  searchBarValue: string;

  previousChatList: PreviousChatList[];
  sendMessageList: Message[];
  receiveMessageList: Message[];

  constructor(private _fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.buildForms();
    this.getPreviousChatList();
    this.getSendMessage();
    this.getReceiveMessage();
  }

  buildForms() {
    this.sendMessage = this._fb.group({
      message: new FormControl('', Validators.required)
    })
  }

  getPreviousChatList(){
    this.previousChatList = [
      {
        name: 'Matt Pears',
        avatar: this.receiverAvatar,
        status: 'Head of Development',
        lastChatTime: '35 mins',
      },
      {
        name: 'Nick Nilson',
        avatar: this.senderAvatar,
        status: 'Software Architect',
        lastChatTime: '3 days',
      }
    ]
  }

  getSendMessage(){
    this.sendMessageList = [
      {
        name: 'You',
        avatar: this.senderAvatar,
        lastSeen: 'none',
        createdAt: new Date().toISOString(),
        message: 'sender1'
      },
      {
        name: 'You',
        avatar: this.senderAvatar,
        lastSeen: 'none',
        createdAt: new Date().toISOString(),
        message: 'sender2'
      }
    ]
  }

  getReceiveMessage(){
    this.receiveMessageList = [
      {
        name: 'Matt Pears',
        avatar: this.receiverAvatar,
        lastSeen: 'none',
        createdAt: new Date().toISOString(),
        message: 'receiver1'
      },
      {
        name: 'Matt Pears',
        avatar: this.receiverAvatar,
        lastSeen: 'none',
        createdAt: new Date().toISOString(),
        message: 'receiver2'
      }
    ]
  }

  sendMessageToReceiver() {
    console.log(this.sendMessage.value)
  }

  searchValueChange() {
    console.log(this.searchBarValue)
  }
}
