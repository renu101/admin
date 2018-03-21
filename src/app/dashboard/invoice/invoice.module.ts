import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';

@NgModule({
    imports: [
        CommonModule,
        InvoiceRoutingModule
    ],
    declarations: [InvoiceComponent]
})
export class InvoiceModule { }
