import { Component, OnInit } from '@angular/core';
import * as Ps from 'perfect-scrollbar';
declare var $: any;

@Component({
  selector: 'app-crmsidebar',
  templateUrl: './crmsidebar.component.html',
  styleUrls: ['./crmsidebar.component.scss']
})
export class CrmsidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	Ps.initialize(document.querySelector('.sidenav-outer'));
  }

}
