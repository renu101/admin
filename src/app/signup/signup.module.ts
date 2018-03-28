import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../shared/data';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SignupRoutingModule
    ],
    declarations: [SignupComponent],
    providers: [DataService]
})
export class SignupModule { }
