import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedChatComponent } from './shared-chat/shared-chat.component';


@NgModule({
  declarations: [
    SharedChatComponent
  ],
  exports: [
    SharedChatComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedLayoutModule { }
