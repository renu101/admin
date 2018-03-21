import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';
import { Ng2SmartTableModule } from 'ng2-smart-table';	

import { RequestRoutingModule } from './request-routing.module';
import { RequestComponent } from './request.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DpDatePickerModule,
    Ng2SmartTableModule,
    RequestRoutingModule
  ],
  declarations: [RequestComponent],
    // providers: [DataService]
})
export class RequestModule { }
