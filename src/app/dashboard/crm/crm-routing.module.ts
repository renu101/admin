import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmComponent } from './crm.component';
import { HouseComponent } from './house/house.component';
import { MoverComponent } from './mover/mover.component';
import { FormrequestComponent } from './formrequest/formrequest.component';

const routes: Routes = [
    // {
    //     path: 'user',
    //     component: CrmComponent
    // },
    // {
    //     path: 'rentals',
    //     component: HouseComponent
    // },
    // {
    //     path: 'mover',
    //     component: MoverComponent
    // },
    // {
    //     path: 'request',
    //     component: FormrequestComponent
    // }
    {
        path: '',
        component: CrmComponent,
        children: [
            { path: 'user', loadChildren: './user/user.module#UserModule' },
            { path: 'request', loadChildren: './request/request.module#RequestModule' }
        ]
     },
    {
        path: 'rentals',
        component: HouseComponent
    },
    {
        path: 'mover',
        component: MoverComponent
    },
    {
        path: 'servicerequest',
        component: FormrequestComponent
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }