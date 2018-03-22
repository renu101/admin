import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DataService} from '../../../shared/data';
import { Router } from '@angular/router';

import { AsyncLocalStorage, JSONSchema } from 'angular-async-local-storage';
import {Angular2Csv}  from 'angular2-csv/Angular2-csv';
import { IDatePickerConfig } from 'ng2-date-picker';
import {CookieService} from 'angular2-cookie/core';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
	config: IDatePickerConfig;
	serviceData:any;
	selectedDate1: any;
    selectedDate2: any;
	public settings: any = {
        mode: 'external',
        actions: {
            columnTitle: 'Actions',
            add:false,
            edit:false,
            delete:false,
            custom: [
                {
                  name: 'edit',
                  title: '<i style="margin-right:10px! important" class="fa fa-external-link"></i> ',
                },
                {
                  name: 'delete',
                  title: '<i class="fa fa-trash-o"></i> ',
                },
            ],
        },
        columns: {
            requestId:{
                title:'Request Id',
                filter:false
            },
            datetime:{
                title:'Date & Time',
                filter:false
            },
            name: {
                title: 'Name',
                filter:false
            },
            contact: {
                title: 'Contact',
                filter:false
            },
            email: {
                title: 'Email',
                filter:false
            },
            price: {
                title: 'Budget' ,
                filter:false  
            },
            bhk:{
                title:'BHK',
                filter:false
            },
            furnishing:{
                title:'Furnishing',
                filter:false
            },
            service_for:{
                title:'Required For',
                filter:false
            },
            location:{
                title:'Location',
                filter:false
            }
        }
    };
    errorMessage: string;
    source: LocalDataSource;

  	constructor(public dataService: DataService,
                protected localStorage: AsyncLocalStorage,
                protected router : Router,
                private mycookie : CookieService) { 
  		this.config = {
                        closeOnSelect: true,
                        format: 'DD-MM-YYYY'
                    };
  		this.source = new LocalDataSource();

  	}

	ngOnInit() {
		this.get_service_data();
	}

    onSearch(query: string = '') {
        this.source.setFilter([
            {
                field: 'requestId',
                search: query
            },
            {
                field: 'datetime',
                search: query
            },
            {
                field: 'name',
                search: query
            },
            {
                field: 'contact',
                search: query
            },
            {
                field: 'email',
                search: query
            },
            {
                field: 'price',
                search: query
            },
            {
                field: 'bhk',
                search: query
            },
            {
                field: 'furnishing',
                search: query
            },
            {
                field: 'service_for',
                search: query
            },
            {
                field: 'location',
                search: query
            }
        ],false);
      //  console.log(this.source.filteredAndSorted);
    }

	get_service_data() {
        this.dataService.get_servicedata()
        .subscribe(
            names => {
                this.serviceData = names;
                var demo_data = [];
                for(var i in names){
                    demo_data.push({
                        "requestId":names[i]["request_id"],
                        "datetime":names[i]["datetime"],
                        "name":names[i]["name"],
                        "contact": names[i]["phone"],
                        "email": names[i]["email"],
                        "price": names[i]["price"],
                        "bhk":names[i]["bhk"],
                        "furnishing":names[i]["furnishing"],
                        "service_for":names[i]["service_for"],
                        "location":names[i]["loca1"]+", "+names[i]["city"]
                    });
                }
                this.source.load(demo_data);
            }
        );   
    }
//custom event
	onCustom(event) {
	        if(event.action == "edit"){
	            let user_data:any = event.data;	 
	            let my_data = this.serviceData.filter(m_data =>{
	            	return user_data.requestId == m_data.request_id;
	            })
	            console.log(my_data);           
	            this.localStorage.setItem('service_data', my_data[0]).subscribe(() => {
	                this.router.navigate(['/dashboard/crm/servicerequest']);
	            });
	        }
    } 
//filter by dates
	filterbyDate(){
        var from_date = new Date(this.selectedDate1);
        var to_date = new Date(this.selectedDate2);
        var demo = this.serviceData.filter(d_data =>{
            if(d_data.datetime != undefined){
                var d_date = d_data.datetime.split("at")[0];    
                if(new Date(d_date).getTime() >= from_date.getTime() || new Date(d_date).getTime() <= to_date.getTime()){
                    return d_data;
                }
            }       
        }); 
        this.source.load(demo); 
    }
//export excel
    exportToExcel() {
        var options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            showLabels: true, 
            showTitle: true,
            useBom: true,
            headers: ['Request Id', 'Datetime', 'Name','Contact','Email','Budget','BHK','Furnishing','Service for','Location']
        };
        var dummy_data = this.serviceData;
        var d_data = dummy_data.filter(i=>{
            for(var j in this.source.filteredAndSorted){    
              return this.source.filteredAndSorted[j]["requestId"]  == i.request_id;  
            }                
        });
        console.log(d_data);
        new Angular2Csv(d_data, 'Rentals',options);
    }
//reload the data
    reload(){
        // var all_data = this.source.getAll();
        // console.log(all_data);
        this.source.load(this.source.data);
        this.source.reset();
    } 
}
