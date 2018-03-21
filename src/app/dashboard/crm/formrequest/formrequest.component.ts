import { Component, OnInit } from '@angular/core';
import { AsyncLocalStorage, JSONSchema } from 'angular-async-local-storage';
import { DataService } from '../../../shared/data';
var g_data;

@Component({
  selector: 'app-formrequest',
  templateUrl: './formrequest.component.html',
  styleUrls: ['./formrequest.component.scss']
})
export class FormrequestComponent implements OnInit {
	serviceData : any;
	msg: string;
	request_id : string;
	sidebarDataProp : any;
	sidebarDataStatus : any;
	properties :any;
	amn : any = []
	constructor(protected localStorage: AsyncLocalStorage,protected dataService : DataService) { }

	ngOnInit() {
		this.getDetails();
		
	}
	getDetails(){
		this.localStorage.getItem("service_data").subscribe(my_data=>{
			console.log(my_data);
			this.serviceData = my_data;
			this.request_id = 'FHK-HJLK-Z';
			this.dataService.get_scheduleById('FHK-HJLK-Z').subscribe(my_data2=>{
				console.log(my_data2);
				g_data = my_data2;
				if(my_data2.data == "0"){
					this.msg = my_data2.msg;
				}
				else if(my_data2.data=="1"){
					this.properties = my_data2.item.schedule;
				}
			});			
		});
	}

	openNav(thisdata) {
		console.log(thisdata);
		let ammenities = [{ "id": "gym", "name": "Gym", "icn": "assets/images/search/ICONS-01.png" },
	        { "id": "atm", "name": "ATM", "icn": "assets/images/search/ICONS-02.png" },
	        { "id": "elevator", "name": "Elevator", "icn": "assets/images/search/ICONS-03.png" },
	        { "id": "security", "name": "Security", "icn": "assets/images/search/ICONS-04.png" },
	        { "id": "intercom", "name": "Intercom", "icn": "assets/images/search/ICONS-09.png" },
	        { "id": "swim", "name": "Swimming", "icn": "assets/images/search/ICONS-05.png" },
	        { "id": "internet", "name": "Internet", "icn": "assets/images/search/ICONS-08.png" },
	        { "id": "play", "name": "Play Ground", "icn": "assets/images/search/ICONS-06.png" },
	        { "id": "ac", "name": "AC", "icn": "assets/images/search/ICONS-11.png" },
	        { "id": "water", "name": "Water", "icn": "assets/images/search/ICONS-10.png" },
	        { "id": "v_parking", "name": "Visitor Parking", "icn": "assets/images/search/ICONS-12.png" }
	    ];
		this.amn = [];
		this.dataService.get_propDetails(thisdata.service_id).subscribe(prop_data=>{
			console.log(prop_data);
			prop_data = prop_data["item"];
			console.log(prop_data);;
			for (var i in ammenities) {
	            if (prop_data[ammenities[i]['id']] == "check" || prop_data[ammenities[i]['id']] == "true" || prop_data[ammenities[i]['id']].match(/^[0-9()]+$/)) {
	                this.amn.push(ammenities[i]);
	            }
	        }	
	        if(prop_data.fur == "s_furnished"){
	        	prop_data.fur = "Semi furnished";
	        }
	        else if(prop_data.fur == "n_furnished"){
	        	prop_data.fur = "Furnished";
	        }
	        else if(prop_data.fur == "furnished"){
	        	prop_data.fur = "Furnished";
	        }	
	        prop_data.lat = parseFloat(prop_data.lat);	
	        prop_data.lon = parseFloat(prop_data.lon);
	        this.sidebarDataProp = prop_data;
	        // var status_data = g_data.filter(f_data =>{
	        // 	return f_data
	        // })
		 	document.getElementById('mySidenav').style.width = '400px';
		})
        
		
		// if(type == "sch"){
		// 	this.dataService.get_schedule(this.request_id,"property").subscribe(sch_data =>{
		// 		console.log(sch_data);
		// 		this.sidebarData = thisdata;
		// 		this.sidebarData["name"] = sch_data["item"]["name"];
		// 		this.sidebarData["rm_id"] = sch_data["item"]["rm_id"];
		// 		this.sidebarData["phone"] = sch_data["item"]["phone"];
		// 		this.sidebarData["rm_area"] = sch_data["item"]["area"].toString();

		// 		if(sch_data["item"]["interest"]){
		// 			if(sch_data["item"]["interest"] == "1"){
		// 				this.sidebarData["interest"] = "Interested";
		// 			}
		// 			if(sch_data["item"]["interest"] == "0"){
		// 				this.sidebarData["interest"] = "Not Interested";
		// 			}
		// 		}
		// 		if(sch_data["item"]["feed"]){
		// 			this.sidebarData["feed"] = sch_data["item"]["feed"];
		// 		}
		// 		if(sch_data["item"]["status"] == 1){
		// 			this.sidebarData["status"] = "Notification sent";
		// 		}
		// 		if(sch_data["item"]["status"] == 2){
		// 			this.sidebarData["status"] = "Notification Reached";
		// 		}
		// 		if(sch_data["item"]["status"] == 3){
		// 			this.sidebarData["status"] = "Notification accepted";
		// 		}
		// 		if(sch_data["item"]["status"] == 4){
		// 			this.sidebarData["status"] = "RM started for the visit";
		// 		}
		// 		if(sch_data["item"]["status"] == 5){
		// 			this.sidebarData["status"] = "Met the customer";
		// 		}
		// 		if(sch_data["item"]["status"] == 6){
		// 			this.sidebarData["status"] = "Payment received";
		// 		}
		// 		if(sch_data["item"]["status"] == 7){
		// 			this.sidebarData["status"] = "Reached property";
		// 		}
		// 		if(sch_data["item"]["status"] == 8){
		// 			this.sidebarData["status"] = "Interested status updated";
		// 		}
		// 		if(sch_data["item"]["status"] == 9){
		// 			this.sidebarData["status"] = "Feedback status updated";
		// 		}
		// 		if(sch_data["item"]["status"] == 10){
		// 			this.sidebarData["status"] = "Property visited";
		// 		}
		// 		if(sch_data["item"]["status"] == 11){
		// 			this.sidebarData["status"] = "Awaiting";
		// 		}
		// 		document.getElementById('mySidenav').style.width = '400px';
		// 	});
		// }
		// else{
		// 	this.sidebarData = thisdata;
		// 	document.getElementById('mySidenav').style.width = '400px';
		// }
	}
	closeNav() {
		document.getElementById('mySidenav').style.width = '0';
	}


}
