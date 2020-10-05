import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PreviousChatList} from '@model/chat/PreviousChatList';
import {Message} from '@model/chat/Message';
import {ChatService} from '@services/chat.service';

import {environment} from '@environments/environment';

import {DbChat} from '@model/database/dbChat';
import {BackendResponse} from '@model/backendResponse';

@Component({
  selector: 'app-shared-chat',
  templateUrl: './shared-chat.component.html',
  styleUrls: ['./shared-chat.component.scss']
})
export class SharedChatComponent implements OnInit {

  @Input() roomId: string;
  @Input() senderId: string;
  @Input() receiverId: string;
  receiverIds: string;
  @Input() senderRole: string;
  @Input() receiverRole: string;

  senderDetails;

  searchBarValue: string;

  filteredChatList: PreviousChatList[];
  previousChatList: PreviousChatList[];
  sendMessageList: DbChat[] = [];
  receiveMessageList: DbChat[] = [];

  constructor(private _fb: FormBuilder,
              private _chat: ChatService) {

  }

  async ngOnInit(): Promise<void> {

    console.log(`role ${this.senderRole}`)
    console.log(`sender ${this.senderId}`)
    console.log(`receiver ${this.receiverId}`)

    const chatListResponse = await this._chat.getPreviousChatList(this.receiverRole).toPromise() as BackendResponse;

    this.previousChatList = chatListResponse.success ? chatListResponse.data : null
    this.receiverIds = this.previousChatList[0].id
    console.log(this.receiverId)
    this.filteredChatList = this.previousChatList;

  }

  searchValueChange() {
    this.filteredChatList = this
      .previousChatList
      .filter( r => r.fullName.trim().toLocaleLowerCase().indexOf(this.searchBarValue.trim().toLocaleLowerCase()) !== -1)
  }

  changeUser(selectedUser){
    this.receiverIds = selectedUser.id;
    console.log(selectedUser)
  }
}
