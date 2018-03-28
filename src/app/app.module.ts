import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpClientModule } from '@ngx-progressbar/http-client';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {Ng2Webstorage} from 'ngx-webstorage';
import {NgBusyModule} from 'ng-busy';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchtextPipe } from './searchtext.pipe';
import { NumbertoPipe } from './numberto.pipe';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        SearchtextPipe,
        NumbertoPipe
        
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        NgProgressModule.forRoot(),
        NgProgressHttpClientModule,
        AsyncLocalStorageModule,
        Ng2Webstorage,
        NgBusyModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule { }
