import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'typography', loadChildren: './typography/typography.module#TypographyModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarModule' },
            { path: 'invoice', loadChildren: './invoice/invoice.module#InvoiceModule' },
            { path: 'mail', loadChildren: './mail/mail.module#MailModule' },
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
            { path: 'ui-elements', loadChildren: './ui-elements/ui-elements.module#UiElementsModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'crm', loadChildren: './crm/crm.module#CrmModule' },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
