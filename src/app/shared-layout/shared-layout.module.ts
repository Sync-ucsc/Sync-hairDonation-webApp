import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedChatComponent } from './shared-chat/shared-chat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    SharedChatComponent
  ],
  exports: [
    SharedChatComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedLayoutModule { }
