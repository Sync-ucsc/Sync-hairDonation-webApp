import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedChatComponent } from './shared-chat/shared-chat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";
import { ChatMessagesComponent } from './shared-chat/chat-messages/chat-messages.component';
import  {TimeAgoPipe} from './shared-chat/timeAgo.pipe';
import { SharedPaymentComponent } from './shared-payment/shared-payment.component'

@NgModule({
  declarations: [
    SharedChatComponent,
    ChatMessagesComponent,
    TimeAgoPipe,
    SharedPaymentComponent
  ],
  exports: [
    SharedChatComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
  ]
})
export class SharedLayoutModule { }
