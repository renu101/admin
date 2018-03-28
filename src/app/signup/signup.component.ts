import { Component, OnInit } from '@angular/core';
import{ DataService } from '../shared/data';
import { CookieService } from 'angular2-cookie/core';
import {SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
	name :string;
	email:string;
	pass:string;
	c_pass:string;
    constructor(private dataservice:DataService,
    			private mycookie : CookieService, 
    			private storage : SessionStorageService,
    			private router : Router) { }
    ngOnInit() {}

    register(){
    	var obj = {"name":this.name,
				   "email":this.email,
					"password":this.pass,
					"c_pass":this.c_pass};
		this.dataservice.register_user(obj).subscribe(response=>{
			console.log(response);
			if(response.auth == true){				
				var jwt_token = response.token;
    			jwt_token = "JWT "+jwt_token;
    			this.storage.store('jwtToken', jwt_token);
    			this.mycookie.put("email",this.email);
    			this.router.navigate(['/dashboard/crm/user']);
			}
		});
    }

}
