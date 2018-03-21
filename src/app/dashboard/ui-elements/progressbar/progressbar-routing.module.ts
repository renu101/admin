import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgressbarComponent } from './progressbar.component';

const routes: Routes = [
    {
        path: '',
        component: ProgressbarComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProgressbarRoutingModule { }
