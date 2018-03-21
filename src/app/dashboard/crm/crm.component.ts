import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';
import { DataService} from '../../shared/data';
import {SearchtextPipe} from '../../searchtext.pipe';
import { Router } from '@angular/router';
import * as c3 from 'c3';

import { AsyncLocalStorage, JSONSchema } from 'angular-async-local-storage';
import { Angular2Csv}  from 'angular2-csv/Angular2-csv';
import { IDatePickerConfig } from 'ng2-date-picker';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss'],
  providers : [SearchtextPipe]
})
export class CrmComponent implements OnInit {
	bar_stat1:string= "leads";
	bar_stat2:string= "Conversion";
	bar_stat3:string= "Pipeline";
    newcheck:boolean;
    classification:string="service_type";
    leadValue:number=0;
    conversionValue:number=0;
    pipelineValue:number=0;
    moverTotal:number=0;
    propTotal:number=0;
    protected g_data : any = [];
    new_demo :any = [];
    serviceData:any=[];
    showUser : boolean = true;
    showForm : boolean;
    sidebar_val : string;
    config: IDatePickerConfig;
    selectedDate1: any;
    selectedDate2: any;

    public settings2: any = {
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
    source2: LocalDataSource;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = ['January', 'February', 'March', 'April'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartData: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Gated Community'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Semi-gated Community'},
        {data: [28, 12 , 40, 20, 76, 30, 85], label: 'Non-gated Community'}
    ];


    public pieChartLabels: string[];
    public pieChartData: number[];
    public pieChartType: string = 'pie';

  	constructor(public dataService: DataService,
                public location : Location, 
                private SearchtextPipe : SearchtextPipe,
                protected localStorage: AsyncLocalStorage,
                public router : Router,
                private mycookie : CookieService) { 
                    this.config = {
                        closeOnSelect: true,
                        format: 'DD-MM-YYYY'
                    };
  		            // this.source = new LocalDataSource();
                    this.source2 = new LocalDataSource();
  	}

    
  	ngOnInit() {
        this.get_service_data();
        this.showUser == true;
        var current_path = this.location.path();
        if(current_path.indexOf("rentals")>-1 || current_path.indexOf("mover")>-1){
            this.mycookie.put("new_sidebar","1");
            this.sidebar_val = "1";
        }
        else{
            this.mycookie.put("new_sidebar","0");  
            this.sidebar_val = "0"; 
        }
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
                this.source2.load(demo_data);
            }
        );   
    }
  
    // exportToExcel() {
    //     var options = { 
    //         fieldSeparator: ',',
    //         quoteStrings: '"',
    //         // decimalseparator: '.',
    //         showLabels: true, 
    //         showTitle: true,
    //         useBom: true,
    //         headers: ['Request Id', 'Datetime','Email', 'Name','Email','Location','Requirements','Wishlist','VisitList','Confirm','Scheduled Property','Requirements']
    //     };

    //     if(this.showUser){
    //         var dummy_data = this.g_data["item"]["prop"];
    //        // dummy_data.concat(this.g_data["item"]["mover"]);
    //         console.log(dummy_data);
    //         var d_data = dummy_data.filter(i=>{
    //             for(var j in this.source.filteredAndSorted){
    //               return this.source.filteredAndSorted[j]["requestId"]  == i.requestId;  
    //           }                
    //         });
    //         console.log(d_data);
    //         new Angular2Csv(dummy_data, 'userData',options);
    //     }
    //     else if(this.showForm){
    //         var d_data = this.serviceData.filter(i=>{
    //             return this.source2.filteredAndSorted.indexOf(i) > -1;
    //         });
    //         var title_obj = {
    //             "name":"Name",
    //             "email": "Email",
    //             "contact": "Contact",
    //             "m_info":"Description",
    //             "price": "Budget",
    //             "bhk":"BHK",
    //             "furnishing":"Furnishing", 
    //             "service_for": "Family",
    //             "from": "Origin City",
    //             "city": "Destination City",
    //             "date": "Relocation Date",
    //             "loca1": "Location 1",
    //             "loca2": "Location 2",
    //             "loca3": "Location 3",
    //             "request_id": "Request Id",
    //             "datetime": "Date & Time"
    //         }
    //         d_data.splice(0,0,title_obj);
    //         new Angular2Csv(d_data, 'serviceDATA');
    //     }        
    // }

    // onCustom(event) {
    //     console.log(event);
    //     if(event.action == "edit"){
    //         console.log(this.g_data);
    //         console.log(event);
    //         let user:any = event.data;
    //         console.log(user);  
    //         var user_data1 = this.g_data["item"]["prop"].filter(m_data=>{
    //             return m_data.user == user.email;
    //         });  
    //         var user_data2 = this.g_data["item"]["mover"].filter(m_data =>{
    //             return m_data.user == user.email;
    //         });
    //         var user_data = user_data1.concat(user_data2);
    //         console.log(user_data);
    //         this.localStorage.setItem('user_prop', user_data1).subscribe(() => {
    //             this.router.navigate(['/dashboard/crm/rentals']);
    //         });
    //         this.localStorage.setItem('user_mover', user_data2).subscribe(() => { 
    //             console.log(user_data2);
    //         });
    //     }
    // }

    // filterbyDate(){
    //     var from_date = new Date(this.selectedDate1);
    //     var to_date = new Date(this.selectedDate2);
    //     if(this.showUser){
    //        var demo = this.new_demo.filter(d_data =>{
    //             if(d_data.datetime != undefined){
    //                 var d_date = d_data.datetime.split("at")[0];    
    //                 if(new Date(d_date).getTime() >= from_date.getTime() || new Date(d_date).getTime() <= to_date.getTime()){
    //                     return d_data;
    //                 }
    //             }       
    //         }); 
    //     }
    //     if(this.showForm){
    //        var demo = this.serviceData.filter(d_data =>{
    //             if(d_data.datetime != undefined){
    //                 var d_date = d_data.datetime.split("at")[0];    
    //                 if(new Date(d_date).getTime() >= from_date.getTime() || new Date(d_date).getTime() <= to_date.getTime()){
    //                     return d_data;
    //                 }
    //             }       
    //         }); 
    //     }
        
    //     this.source.load(demo);
    // }

    // reload(){
    //     if(this.showUser){
    //         this.source.load(this.new_demo);
    //     }
    //     else if(this.showForm){
    //         this.source2.load(this.serviceData);
    //     }
    // }
}
