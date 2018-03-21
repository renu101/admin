import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    sidebar_val : string;
    constructor(public router: Router,
                private mycookie : CookieService) {}
    ngOnInit() {
        
        console.log(this.router.url);
        if (this.router.url === '/dashboard') {
            if(this.router.url.indexOf('rentals')>-1 || this.router.url.indexOf('mover')>-1){
                this.mycookie.put("new_sidebar","1");
                alert("hello");
            }
            else{
                this.mycookie.put("new_sidebar","0");    
                alert("nsdkdnfs");
            }
            this.sidebar_val = this.mycookie.get("new_sidebar");
            console.log(this.sidebar_val);
            // console.log('%c this.router => ', 'background: #222; color: #bada55', this.router);
            // this.router.navigate(['/login']);
        }
    }
}
