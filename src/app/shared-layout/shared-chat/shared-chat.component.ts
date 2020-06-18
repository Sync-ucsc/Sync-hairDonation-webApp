import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PreviousChatList} from '@model/chat/PreviousChatList';
import {Message} from '@model/chat/Message';
import {ChatService} from "@services/chat.service";

@Component({
  selector: 'app-shared-chat',
  templateUrl: './shared-chat.component.html',
  styleUrls: ['./shared-chat.component.scss']
})
export class SharedChatComponent implements OnInit {



  sendMessage: FormGroup;
  searchBarValue: string;

  previousChatList: PreviousChatList[];
  sendMessageList: Message[];
  receiveMessageList: Message[];

  constructor(private _fb: FormBuilder,
              private _chat: ChatService) {

  }

  ngOnInit(): void {
    this.buildForms();
    this.previousChatList = this._chat.getPreviousChatList();
    this.sendMessageList = this._chat.getSendMessage();
    this.receiveMessageList = this._chat.getReceiveMessage();
  }

  buildForms() {
    this.sendMessage = this._fb.group({
      message: new FormControl('', Validators.required)
    })
  }



  sendMessageToReceiver() {
    console.log(this.sendMessage.value)
  }

  searchValueChange() {
    console.log(this.searchBarValue)
  }
}
