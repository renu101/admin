import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../data';
import { CookieService } from 'angular2-cookie/core';
declare var Ps: any;
const id = "FB1Z7IJI01"

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
	@Input() idvalue: string;
	newMsg : string = "";
	newName: string = "";
	senderName :string = "";
    nameList:any = [];

    constructor(private dataservice : DataService,
                private mycookie : CookieService) {
        // this.nameList = [
        //     {name:'Gokul',msg:'Meeting with Nabindar Singh.'},
        //     {name:'customer',msg:'Exercise at 6:pm with Nicholas.'},
        //     {name : 'vendor',msg:'Avengers Age of Ultron.'}
        //     // {'Henna birthday at Mezbaan.'}
        // ];	
    }

    addName(): boolean {
    	console.log(this.newName);
    	console.log(this.newMsg);
    	console.log(this.senderName);
    	if(this.newMsg == ""){
	    	return false
    	}
    	else{
    		if(this.newName == ""){
    			this.newName = "Customer";
    		}
            this.senderName = this.mycookie.get("name");
    		var newObj = {};
    		var currentdate = new Date();
            var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
            var time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            var datetime = date + " at " + time;
    		newObj = {name:this.newName,msg:this.newMsg,from:this.senderName,datetime:datetime};
	        this.nameList.push(newObj);
	        this.newName = '';
	        this.newMsg = '';	
	        this.senderName = '';       
	        this.dataservice.post_msg(this.idvalue,newObj).subscribe(post_data =>{
	        	console.log(post_data);
	        })   
	        return true;     
    	}
    	  	
    }

    ngOnInit() {
        Ps.initialize(document.querySelector('.todo-list-wrap'));
        this.get_msgList();
    }

    get_msgList(){
    	this.dataservice.get_msg(this.idvalue).subscribe(response =>{
    		console.log(response);
    		if(response.data == "1"){
    			this.nameList = response["items"];
    		}  
    		console.log(this.nameList);  		
    	})
    }

}
