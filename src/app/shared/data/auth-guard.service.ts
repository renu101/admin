import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private storage : SessionStorageService,private router : Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  	const isLoggedIn = this.storage.retrieve('jwtToken');
    console.log(isLoggedIn);
    //const isLoggedIn = false; // ... your login logic here
    if (isLoggedIn != null) {
    	//if(this.router.url == )
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
