import { Component, OnInit } from '@angular/core';
import { AsyncLocalStorage, JSONSchema } from 'angular-async-local-storage';
import { DataService } from '../../../shared/data';
import { NumbertoPipe } from '../../../numberto.pipe';
import { CookieService } from 'angular2-cookie/core';
import { ScrollToService } from 'ng2-scroll-to-el';

declare var $: any;

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
  providers: [NumbertoPipe]
})
export class HouseComponent implements OnInit {
	wish : any = [];
	visit : any = [];
	schedule :any = [];
	confirm : any;
	sidebarData :any;
	amn : any = [];
	request_id:string;
	user_id : string;
	lat: number = 51.678418;
    lng: number = 7.809007;
   	strvalue : string = "747383";
	constructor(protected localStorage: AsyncLocalStorage,
				protected dataService : DataService, 
				public numberpipe : NumbertoPipe,
				private mycookie : CookieService,
				private scrollService: ScrollToService) { }
	
	ngOnInit() {
		this.getDetails();
	}
	scrollToTop(element) {
        this.scrollService.scrollTo(element);
    }
	openNav(thisdata,type) {
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
        for (var i in ammenities) {
            if (thisdata[ammenities[i]['id']] == "check" || thisdata[ammenities[i]['id']] == "true" || thisdata[ammenities[i]['id']].match(/^[0-9()]+$/)) {
                this.amn.push(ammenities[i]);
            }
        }	
        if(thisdata.fur == "s_furnished"){
        	thisdata.fur = "Semi furnished";
        }
        else if(thisdata.fur == "n_furnished"){
        	thisdata.fur = "Furnished";
        }
        else if(thisdata.fur == "furnished"){
        	thisdata.fur = "Furnished";
        }	
        thisdata.lat = parseFloat(thisdata.lat);	
        thisdata.lon = parseFloat(thisdata.lon);
		
		if(type == "sch"){
			this.dataService.get_schedule(this.request_id,"property").subscribe(sch_data =>{
				console.log(sch_data);
				this.sidebarData = thisdata;
				this.sidebarData["name"] = sch_data["item"]["name"];
				this.sidebarData["rm_id"] = sch_data["item"]["rm_id"];
				this.sidebarData["phone"] = sch_data["item"]["phone"];
				this.sidebarData["rm_area"] = sch_data["item"]["area"].toString();

				if(sch_data["item"]["interest"]){
					if(sch_data["item"]["interest"] == "1"){
						this.sidebarData["interest"] = "Interested";
					}
					if(sch_data["item"]["interest"] == "0"){
						this.sidebarData["interest"] = "Not Interested";
					}
				}
				if(sch_data["item"]["feed"]){
					this.sidebarData["feed"] = sch_data["item"]["feed"];
				}
				if(sch_data["item"]["status"] == 1){
					this.sidebarData["status"] = "Notification sent";
				}
				if(sch_data["item"]["status"] == 2){
					this.sidebarData["status"] = "Notification Reached";
				}
				if(sch_data["item"]["status"] == 3){
					this.sidebarData["status"] = "Notification accepted";
				}
				if(sch_data["item"]["status"] == 4){
					this.sidebarData["status"] = "RM started for the visit";
				}
				if(sch_data["item"]["status"] == 5){
					this.sidebarData["status"] = "Met the customer";
				}
				if(sch_data["item"]["status"] == 6){
					this.sidebarData["status"] = "Payment received";
				}
				if(sch_data["item"]["status"] == 7){
					this.sidebarData["status"] = "Reached property";
				}
				if(sch_data["item"]["status"] == 8){
					this.sidebarData["status"] = "Interested status updated";
				}
				if(sch_data["item"]["status"] == 9){
					this.sidebarData["status"] = "Feedback status updated";
				}
				if(sch_data["item"]["status"] == 10){
					this.sidebarData["status"] = "Property visited";
				}
				if(sch_data["item"]["status"] == 11){
					this.sidebarData["status"] = "Awaiting";
				}
				document.getElementById('mySidenav').style.width = '400px';
			});
		}
		else{
			this.sidebarData = thisdata;
			document.getElementById('mySidenav').style.width = '400px';
		}
	}

	closeNav() {
		document.getElementById('mySidenav').style.width = '0';
	}

	getDetails(){
		this.user_id = this.mycookie.get("user");
	    this.dataService.get_userrental(this.user_id).subscribe(prop => {
	    	console.log(prop);
	    	if(prop.data == "1"){
	    		prop = prop["item"];
	            console.log(prop);
	            let wishArray : any = [];
	            let visitArray : any = [];
	            let confirmArray : any = [];
	            let scheduleArray : any = Object.keys(prop.visit_date);
	            let propArray :any = [];
	            this.request_id = prop.request_id;
	            propArray = prop.wish.concat(prop.visit);
	            propArray = propArray.concat(prop.confirm);
	            propArray.concat(Object.keys(prop.visit_date));
	            var propObj = {"value":propArray};
	            this.dataService.get_prop(propObj).subscribe(property =>{  

	            	//for(var value of property["prop"]){
	            	//	console.log(value);
	            		this.wish = property["prop"].filter(m_data => {
	            			return prop.wish.indexOf(m_data.service_id) > -1
		            	});
		            	this.visit = property["prop"].filter(m_data => {
	            			return prop.visit.indexOf(m_data.service_id) > -1
		            	});
		            	this.schedule = property["prop"].filter(m_data => {
		            		if(scheduleArray.indexOf(m_data.service_id) > -1){	   
		            			m_data["date"] = prop.visit_date[scheduleArray[scheduleArray.indexOf(m_data.service_id)]]["date"];
		            			m_data["time"] = prop.visit_date[scheduleArray[scheduleArray.indexOf(m_data.service_id)]]["time"];          			
	            				return m_data;
		            		}
		            	});
		            	if(prop.confirm){
		            		var confirmValue = property["prop"].filter(m_data => {
		            			return prop.confirm.indexOf(m_data.service_id) > -1
			            	});
			            	this.confirm = confirmValue[0];
		            	}
		            	
	            	//}
		            console.log(this.wish);
		            console.log(this.schedule);
		            console.log(this.confirm);            		
		            console.log(this.visit);
	            });
	    	}
	    	
          // Called if data is valid or null
        }, (error) => {
            console.log(error);
          // Called if data is invalid
        });
	}


}
