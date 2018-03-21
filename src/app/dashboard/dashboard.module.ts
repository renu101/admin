import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TopnavComponent, SidebarComponent } from '../shared';

//import { CrmComponent } from './crm/crm.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        DashboardRoutingModule
    ],
    declarations: [
        DashboardComponent,
        TopnavComponent,
        SidebarComponent
        //CrmComponent
    ]
})
export class DashboardModule { }
