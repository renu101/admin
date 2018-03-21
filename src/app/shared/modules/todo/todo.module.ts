import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { TodoComponent } from './todo.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule
    ],
    declarations: [TodoComponent],
    exports: [TodoComponent]
})
export class TodoModule { }
