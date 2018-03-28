import { Component, OnInit } from '@angular/core';
import{ DataService } from '../shared/data';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import {SessionStorageService, SessionStorage} from 'ngx-webstorage';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	@SessionStorage('AnotherBoundAttribute')
	email:string;
	pass:string;
    constructor(private dataservice:DataService,
    	private router : Router,
    	private mycookie : CookieService, 
    	private storage : SessionStorageService) { }
    ngOnInit() { }

    login(){
    	var obj = {"email" : this.email,
    				"password" : this.pass
    			   }
    	this.dataservice.login_user(obj).subscribe(response =>{
    		console.log(response);
    		if(response.auth){
    			var jwt_token = response.token;
    			jwt_token = "JWT "+jwt_token;
    			 this.storage.store('jwtToken', jwt_token);
    			this.mycookie.put("email",this.email);
                this.mycookie.put("name",response.name);
    			this.router.navigate(['/dashboard/crm/user']);
    		}
    	})
    }
}
