import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AsyncLocalStorage, JSONSchema } from 'angular-async-local-storage';
import { DataService, PaginationService } from '../../../shared/data';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { IDatePickerConfig } from 'ng2-date-picker';
import * as _ from 'underscore';

var g_data, filter_obj = {};

@Component({
  selector: 'app-formrequest',
  templateUrl: './formrequest.component.html',
  styleUrls: ['./formrequest.component.scss']
})
export class FormrequestComponent implements OnInit {
	config: IDatePickerConfig;
	serviceData : any;
	msg: string;
	request_id : string;
	sidebarDataProp : any;
	sidebarDataStatus : any;
	properties :any;
	new_properties :any = [];
	amn : any = []
	showapp : boolean = false;
	public latitude: number;
  	public longitude: number;
  	public zoom: number; 
    range : number = 1000;
  	dateValue : any;
  	slots : any = [];
  	 // pager object
    pager: any = {}; 
    // paged items
    pagedItems: any[];
  	@ViewChild("search")
  	public searchElementRef: ElementRef;

	constructor(protected localStorage: AsyncLocalStorage,
				protected dataService : DataService,
				private mapsAPILoader: MapsAPILoader,
    			private ngZone: NgZone,
    			private pagerService : PaginationService) {
					this.config = {
                        closeOnSelect: true,
                        format: 'DD-MM-YYYY'
                    };
    			 }

	ngOnInit() {
		this.getDetails();		
	}
	getDetails(){
		this.localStorage.getItem("service_data").subscribe(my_data=>{
			console.log(my_data.furnishing);
			this.serviceData = my_data;
			this.request_id = 'FHK-HJLK-Z';
			this.dataService.get_scheduleById('FHK-HJLK-Z').subscribe(my_data2=>{
				g_data = my_data2;
				if(my_data2.data == "0"){
					this.msg = my_data2.msg;
				}
				else if(my_data2.data=="1"){
					this.properties = my_data2.item.schedule;
				}
			});	
			//create fitler object
		
			var rent_to  = [my_data.service_for];
			var price = [parseInt(my_data.price), parseInt(my_data.price)+5000];
			var areas_name = [my_data.loca1+","+my_data.city,my_data.loca2+","+my_data.city,my_data.loca3+","+my_data.city];
			filter_obj = {"areas":[],
				"filters":{
				"configuration":my_data.bhk,
				"fur":my_data.furnishing,
				"rent_to":rent_to,
				"m_rent":price}
			}
			var range = this.range;
			this.get_latlon(areas_name,range);
		});
	}


	get_properties(){
		this.dataService.get_filterbased(filter_obj).subscribe(my_properties =>{
			this.new_properties = my_properties;
			this.setPage(1);
			console.log(my_properties);
		});
	}

	get_latlon(areaList,range){
		console.log(areaList);
		//load Places Autocomplete
	    this.mapsAPILoader.load().then(() => {
	    	let geocoder = new google.maps.Geocoder;
	    	for(var i in areaList){
		    	geocoder.geocode({'address':areaList[i]}, function(results, status) {
		    		console.log(status);
		    		console.log(results);
		    		//if(status === OK){
		    			console.log(range);
		    			let center_lat = results[0].geometry.location.lat();
		    			let center_lng = results[0].geometry.location.lng();
		    			filter_obj["areas"].push({lat:center_lat,lng:center_lng,radius:range});
		    		//}
		    	});
			}
			console.log(filter_obj);
	   //    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
	   //      types: ["address"]
	   //    });
	   //    autocomplete.addListener("place_changed", () => {
	   //      this.ngZone.run(() => {
	   //        //get the place result
	   //        var geocoder = google.maps.Geocoder;
				// console.log(geocoder);
	   //        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

	   //        //verify result
	   //        if (place.geometry === undefined || place.geometry === null) {
	   //          return;
	   //        }

	   //        //set latitude, longitude and zoom
	   //        this.latitude = place.geometry.location.lat();
	   //        this.longitude = place.geometry.location.lng();
	   //        this.zoom = 12;
	   //      });
	   //    });
	    });
	}

	setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.new_properties.length, page);
 
        // get current page of items
        this.pagedItems = this.new_properties.slice(this.pager.startIndex, this.pager.endIndex + 1);
        console.log(this.pagedItems);
    }

	getSlotList(){
		this.dataService.get_slots().subscribe(response =>{
			var slot_arr = ["9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30","6:00"];
			for(var j in slot_arr){
	            var count = parseInt(j)+1;            
	            if(response["slots"].length>0){
					console.log("slos present");
					if(response["slots"].indexOf(count)<0){
						this.slots.push({indeValue:count,name:slot_arr[j]});
						console.log(this.slots);
					}
				}
				else{
					this.slots.push({indeValue:count,name:slot_arr[j]});
				}
			}
		})
	}

	bookslot(){
		alert("book slots");
	}

	openNav(thisdata) {
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
			prop_data = prop_data["item"];
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
