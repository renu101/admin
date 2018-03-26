import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChartsModule as Charts} from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbTooltipModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { DpDatePickerModule } from 'ng2-date-picker';
import { ScrollToModule } from 'ng2-scroll-to-el';
import { DataService, ExcelService } from '../../shared/data';
import { CrmRoutingModule } from './crm-routing.module';



import { CrmComponent } from './crm.component';
import { StatModule, TodoModule, ChatModule} from '../../shared';
import { CrmsidebarComponent } from './crmsidebar/crmsidebar.component';
import { HouseComponent } from './house/house.component';
import { MoverComponent } from './mover/mover.component';
// import { UserComponent } from './user/user.component';
// import { RequestComponent } from './request/request.component';
import { FormrequestComponent } from './formrequest/formrequest.component';


@NgModule({
  imports: [
    CommonModule,
    CrmRoutingModule,
    TranslateModule,
    // Ng2SmartTableModule,
    FormsModule,
    Charts,
    StatModule,
    TodoModule,
    ChatModule,
    NgbTooltipModule.forRoot(),
    NgbCarouselModule.forRoot(),
    NgbPopoverModule.forRoot(),
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBUuXndrnnJWLi85sQGI4BmGAsZliRDDcY'
        }),
    HttpClientModule,
    ScrollToModule.forRoot()
    // DpDatePickerModule
  ],
  declarations: [CrmComponent,
                 CrmsidebarComponent, 
                 HouseComponent, 
                 MoverComponent, 
                 // UserComponent, 
                 // RequestComponent, 
                 FormrequestComponent],
  providers: [DataService, ExcelService]
})
export class CrmModule { }
