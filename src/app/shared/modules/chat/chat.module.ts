import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ChatComponent } from './chat.component';
import { DataService } from '../../data' 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [ChatComponent],
  exports: [ChatComponent],
  providers: [DataService]
})
export class ChatModule {}
