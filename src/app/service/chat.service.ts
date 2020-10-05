import { Injectable } from '@angular/core';
import {Message} from '@model/chat/Message';
import {PreviousChatList} from '@model/chat/PreviousChatList';
import {ChatRoom} from '@model/database/dbChat';
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {SharedService} from "@services/shared.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatUrl = `${environment.BASE_URL}/chat`;

  senderAvatar = '../../assets/chat/maleAvatar.svg';
  receiverAvatar = '../../assets/chat/femaleAvatar.svg';

  constructor(private _http: HttpClient,
              private _sharedService: SharedService) { }

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

  getUserDetails(userId: string){
    return this._http.get(`${this.chatUrl}/userDetails/${userId}`)
      .pipe(catchError(this._sharedService.httpErrorManagement));
  }
}
