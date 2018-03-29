import { Component, OnInit } from '@angular/core';
import { AsyncLocalStorage, JSONSchema } from 'angular-async-local-storage';
import { DataService } from '../../../shared/data';
import { CookieService } from 'angular2-cookie/core';
import {Angular2Csv}  from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-mover',
  templateUrl: './mover.component.html',
  styleUrls: ['./mover.component.scss']
})
export class MoverComponent implements OnInit {
	mover : any;
	itemlist : any = [];
	sidebarData : any;
	inspectionData : any;
	markers : any = [];
	center_lat : number = 18.5206624;
	center_lon : number = 73.8567415;
	showapp : boolean = false;
	constructor(protected localStorage: AsyncLocalStorage,
				public dataservice : DataService,
				private mycookie : CookieService) { }

	ngOnInit() {
		this.getdetails();
	}

	getdetails(){
	  	let user_id = this.mycookie.get("user");
		this.dataservice.get_usermover(user_id).subscribe(mover => {
			if(mover.data == "1"){
		  		this.mover = mover.item;
		  		this.dataservice.get_schedule(this.mover.request_id,"mover").subscribe(inspection=>{
					this.inspectionData = inspection["item"];
					this.define_status();	
					this.track_status();
				});
			}				
	  	});
	}

	track_status(){
		this.dataservice.get_track().subscribe(track_points=>{
			for(var i in track_points){
	    	if(track_points[i]["info"] == "ORIGIN"){
	    		this.markers.push({
		            id:i,
		            latitude: parseFloat(track_points[i]["lat"]),
		            longitude: parseFloat(track_points[i]["lng"]),
		            icon:'assets/img/markers/wish_home.PNG' 

		      	});
	    	}
	    	else if(track_points[i]["info"] == "DESTINATION"){
	    		this.markers.push({
		            id:i,
		            latitude: parseFloat(track_points[i]["lat"]),
		            longitude: parseFloat(track_points[i]["lng"]),
		            icon:'assets/img/markers/home.png' 

		      	});
	    	}
	    	else{
	    		this.markers.push({
		            id:i,
		            latitude: parseFloat(track_points[i]["lat"]),
		            longitude: parseFloat(track_points[i]["lng"]),
		            icon:'assets/img/markers/home.png' 

		      	});
	    	}	    	
	    }
		})
	}

	define_status(){
		if(this.inspectionData.status == 1){
			this.inspectionData.status_val = "Notification sent";
		}
		if(this.inspectionData.status == 2){
			this.inspectionData.status_val = "Notification received by RM";
		}
		if(this.inspectionData.status == 3){
			this.inspectionData.status_val = "Notification accepted by RM";
		}
		if(this.inspectionData.status == 4){
			this.inspectionData = "Vendor has confirm";
		}
		if(this.inspectionData.status == 6){
			this.inspectionData.status_val = "Vendor status has been updated to customer";
		}
		if(this.inspectionData.status == 7){
			this.inspectionData.status_val = "RM started for customer location";
		}
		if(this.inspectionData.status == 8){
			this.inspectionData.status_val = "Vendor reached at location";
		}
		if(this.inspectionData.status == 9){
			this.inspectionData.status_val = "Item list updated";
		}
		if(this.inspectionData.status == 10){
			this.inspectionData.status_val = "Inspection Done";
		}
		if(this.inspectionData.status == 11){
			this.inspectionData.status_val = "Inspection Done";
		}
	}

	showitemlist(){
		document.getElementById('inspectionSidebar').style.width = '400px';
		this.dataservice.get_itemlist(this.mover.user).subscribe(itemlist =>{
			var myItems =[];
			for(var item in itemlist["item"]["item_list"]){
				myItems.push(itemlist["item"]["item_list"][item]);
			}
			this.itemlist = myItems;
		});
	}

	visitStatus(){
		this.dataservice.get_schedule(this.mover.request_id,"mover").subscribe(inspection=>{
			this.sidebarData = inspection["item"];	
			this.sidebarData.date = this.mover.value.date.m_date;
			document.getElementById('visitSidebar').style.width = '400px';
		});
	}

	exportToExcel() {
       this.dataservice.get_itemlist(this.mover.user).subscribe(itemlist =>{
			var myItems =[];
			for(var item in itemlist["item"]["item_list"]){
				myItems.push(itemlist["item"]["item_list"][item]);
			}
			new Angular2Csv(myItems, 'Item list');
		});
	}

	closeNav() {
		document.getElementById('inspectionSidebar').style.width = '0';
	}

}
