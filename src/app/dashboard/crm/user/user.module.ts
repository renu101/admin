import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from '../../../shared';
// import { DataService } from '../../../shared/data';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DpDatePickerModule,
    Ng2SmartTableModule,
    TranslateModule,
    UserRoutingModule
  ],
  declarations: [SidebarComponent,UserComponent],
    // providers: [DataService]
})
export class UserModule { }
