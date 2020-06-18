import { Injectable } from '@angular/core';
import {Message} from "@model/chat/Message";
import {PreviousChatList} from "@model/chat/PreviousChatList";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  senderAvatar = '../../assets/chat/maleAvatar.svg';
  receiverAvatar = '../../assets/chat/femaleAvatar.svg';

  constructor() { }

  getPreviousChatList(): PreviousChatList[]{
    return [
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

  getSendMessage(): Message[]{
    return [
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

  getReceiveMessage(): Message[]{
    return [
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
}
