import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DataService} from '../../../shared/data';
import { Router } from '@angular/router';

import { AsyncLocalStorage, JSONSchema } from 'angular-async-local-storage';
import {Angular2Csv}  from 'angular2-csv/Angular2-csv';
import { IDatePickerConfig } from 'ng2-date-picker';
import {CookieService} from 'angular2-cookie/core';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	config: IDatePickerConfig;
	g_data:any;
	selectedDate1: any;
    selectedDate2: any;
    sidebar_val : string;
    classification:string="prop";
	public prop_settings: any = {
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
                filter : false
            },
            datetime:{
                title:'Date & Time',
                filter:false
            },
            name: {
                title: 'Name',
                filter : false
            },
            phone: {
                title: 'Contact',
                filter : false
            },
            email: {
                title: 'Email',
                filter : false
            },
            area:{
                title:'Location',
                filter : false
            },
            filters: {
                title: 'Requirements',
                filter : false
            }
        }
    };
    public mover_settings: any = {
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
                filter : false
            },
            datetime:{
                title:'Date & Time',
                filter:false
            },
            name: {
                title: 'Name',
                filter : false
            },
            phone: {
                title: 'Contact',
                filter : false
            },
            email: {
                title: 'Email',
                filter : false
            },
            origin:{
                title:'Origin Place',
                filter : false
            },
            destination: {
                title: 'Destination Place',
                filter : false
            },
        }
    };
    errorMessage: string;
    prop_source: LocalDataSource;
    mover_source: LocalDataSource;
  	constructor(public dataService: DataService,
                protected localStorage: AsyncLocalStorage,
                protected router : Router,
                private mycookie : CookieService) { 
  		this.config = {
            closeOnSelect: true,
            format: 'DD-MM-YYYY'
        };
        this.prop_source = new LocalDataSource();
        this.mover_source = new LocalDataSource();
  	}  	

	ngOnInit() {
		this.getCustomer();
	}

//search in table
	onSearchProp(query: string = '') {
         if (query === '') {

            this.prop_source.setFilter([]);

        } else {
            this.prop_source.setFilter([
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
                    field: 'phone',
                    search: query
                },
                {
                    field: 'email',
                    search: query
                },
                {
                    field: 'area',
                    search: query
                },
                {
                    field: 'filters',
                    search: query
                }
            ],false);
        }
      //  console.log(this.source.filteredAndSorted);
    }
    onSearchMover(query: string = '') {
        if (query === '') {

            this.mover_source.setFilter([]);

        } else {
            this.mover_source.setFilter([
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
                    field: 'phone',
                    search: query
                },
                {
                    field: 'email',
                    search: query
                },
                {
                    field: 'origin',
                    search: query
                },
                {
                    field: 'destination',
                    search: query
                }
            ],false);
        }
    }
 //get user details
 getCustomer() {    
        this.dataService.get_user()
        .subscribe(
            names => {
                this.g_data = names; 
                console.log(this.g_data);
                var demo_data = [],lcount,pcount = 0,ccount = 0;
                if(names["data"] == '0'){
                    console.log(names["item"]["mover"].length);
                    console.log(names["item"]["prop"].length);
                    // this.moverTotal += names["item"]["mover"].length;
                    // this.propTotal += names["item"]["prop"].length;
                    // this.leadValue  = this.moverTotal + this.propTotal;
                    this.prop_source.load(names["item"]["prop"]);
                    this.mover_source.load(names["item"]["mover"]);
                    // for(var i in names["item"]["mover"]){
                    //     demo_data.push(names["item"]["mover"][i]);
                    //     if(names["item"]["mover"][i]["status"] >5){
                    //         ccount++; 
                    //     }
                    //     else{
                    //         pcount++;
                    //     }
                    // }
                    // for(var i in names["item"]["prop"]){
                    //     demo_data.push(names["item"]["prop"][i]
                    //     );
                    //     if(names["item"]["prop"][i]["status"] >4){
                    //         ccount++; 
                    //     }
                    //     else{
                    //         pcount++;
                    //     }
                    // }
                    // this.conversionValue =40 //+((ccount/this.leadValue)*100).toFixed(2);
                    // this.pipelineValue = 50 //+ ((pcount/this.leadValue)*100).toFixed(2);
                    // this.new_demo = demo_data;
                    // this.pieChartLabels = ['Movers', 'Property'];
                    // this.pieChartData= [this.moverTotal, this.propTotal];


                }
                
              //  this.source.load(names);
            },
            error =>  this.errorMessage = <any>error
        );
    }
//filter by dates
	filterbyDate(event){
		console.log(event);
        var from_date = new Date(this.selectedDate1);
        var to_date = new Date(this.selectedDate2);
        if(event == "prop"){
           var demo = this.g_data["item"]["prop"].filter(d_data =>{
                if(d_data.datetime != undefined){
                    var d_date = d_data.datetime.split("at")[0];    
                    if(new Date(d_date).getTime() >= from_date.getTime() || new Date(d_date).getTime() <= to_date.getTime()){
                        return d_data;
                    }
                }       
            }); 
           this.prop_source.load(demo); 
        }
        if(event == "mover"){
           var demo = this.g_data["item"]["mover"].filter(d_data =>{
                if(d_data.datetime != undefined){
                    var d_date = d_data.datetime.split("at")[0];    
                    if(new Date(d_date).getTime() >= from_date.getTime() || new Date(d_date).getTime() <= to_date.getTime()){
                        return d_data;
                    }
                }       
            });
            this.mover_source.load(demo); 
        }       
    }
//custom event
	onCustom(event,flag) {
        console.log(flag);
	        if(event.action == "edit"){
	            let user:any = event.data.email;
	            this.mycookie.put("user",user);
	            if(flag == "prop"){
	            	this.router.navigate(['/dashboard/crm/rentals']);
	            }
	            else if(flag == "mover"){
	            	this.router.navigate(['/dashboard/crm/mover']);
	            }
                this.mycookie.put("new_sidebar","1");
                this.sidebar_val = "1";

	        }
    }
    exportToExcel() {        

        if(this.classification == "prop"){
            var options = { 
                fieldSeparator: ',',
                quoteStrings: '"',
                showLabels: true, 
                showTitle: true,
                useBom: true,
                headers: ['Request Id', 'Datetime', 'Name','Email','Location','Requirements','Wishlist','VisitList','Confirm','Scheduled Property','Requirements']
            };
            var dummy_data = this.g_data["item"]["prop"];
            var d_data = dummy_data.filter(i=>{
                for(var j in this.prop_source.filteredAndSorted){
                  return this.prop_source.filteredAndSorted[j]["requestId"]  == i.requestId;  
              }                
            });
            new Angular2Csv(d_data, 'Rentals',options);
        }
        else if(this.classification == "mover"){
            var options = { 
                fieldSeparator: ',',
                quoteStrings: '"',
                showLabels: true, 
                showTitle: true,
                useBom: true,
                headers: ['Request Id', 'Datetime', 'Name','Email','Origin','Destination']
            };
            var dummy_data = this.g_data["item"]["mover"];
            var d_data = dummy_data.filter(i=>{
                for(var j in this.mover_source.filteredAndSorted){
                  return this.mover_source.filteredAndSorted[j]["requestId"]  == i.requestId;  
              }                
            });
            new Angular2Csv(d_data, 'Movers',options);
        }
    }

    reload(){
        if(this.classification=="prop"){
            this.prop_source.load(this.prop_source.data);
            this.prop_source.reset();
        }
        else if(this.classification=="mover"){
            this.mover_source.load(this.g_data["item"]["mover"]);
            this.mover_source.reset();
        }
    }   
}
