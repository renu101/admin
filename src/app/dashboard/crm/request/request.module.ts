import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';
import { Ng2SmartTableModule } from 'ng2-smart-table';	
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from '../../../shared';

import { RequestRoutingModule } from './request-routing.module';
import { RequestComponent } from './request.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DpDatePickerModule,
    Ng2SmartTableModule,
    TranslateModule,
    RequestRoutingModule
  ],
  declarations: [SidebarComponent,RequestComponent],
    // providers: [DataService]
})
export class RequestModule { }
