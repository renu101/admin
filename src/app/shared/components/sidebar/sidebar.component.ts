import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import * as Ps from 'perfect-scrollbar';
declare var $: any;
// declare var Ps: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    sidebar_val : string;
    constructor(private mycookie : CookieService) { }

    ngOnInit() {
        this.sidebar_val = this.mycookie.get("new_sidebar");
        console.log(this.sidebar_val);
        const calendar: any = $('#calendar1');
        calendar.fullCalendar({
             eventClick: function(calEvent: any, jsEvent: any, view: any) {
                alert('Event: ' + calEvent.title);
                alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                alert('View: ' + view.name);
            }
        });
        Ps.initialize(document.querySelector('.sidenav-outer'));
        
    }
}
