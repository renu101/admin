import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers ,Response } from '@angular/http';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
const fldb = 'http://api.goflytta.com/admin';
// = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlbnVAZ29mbHl0dGEuY29tIiwibmFtZSI6InJlbnUiLCJfaWQiOiI1YWJiMzY2NmYwNmE3N2YyNjFiMjQ5N2EiLCJpYXQiOjE1MjIyMjU2ODgsImV4cCI6MTUyMjMxMjA4OH0.QbcPGGtktnrx1W7ifRTqRyegc1-PhFUHhYq3zTZPCuI";
// import 'rxjs/add/operator/do';  // for debugging

/**
* This class provides the Data service with methods to read names and add names.
*/
@Injectable()
export class DataService {

    /**
    * Creates a new DataService with the injected Http.
    * @param {Http} http - The injected Http.
    * @constructor
    */
    private jwt_token : string;
    constructor(private http: Http, private storage : SessionStorageService) {
        this.jwt_token = this.storage.retrieve('jwtToken');
    }

   //var fldb = "http://ec2-13-126-145-241.ap-south-1.compute.amazonaws.com:3013";
    /**
    * Returns an Observable for the HTTP GET request for the JSON resource.
    * @return {string[]} The Observable for the HTTP request.
    */
    get(): Observable<string[]> {
        return this.http.get('assets/data.json')
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }

    //get data of the users
    get_user(): Observable<string[]> {
        var url = fldb+"/flytta_api/v0.1/crm/show";
        let headers = new Headers({'Authorization':this.jwt_token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url,options)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }

    //get partial property details of given ids
    get_prop(p_data): Observable<string[]> {
        var url = fldb+"/flytta_api/v0.1/property/multi_id";
        let headers = new Headers({'Authorization':this.jwt_token});
        let options = new RequestOptions({headers: headers});
        return this.http.post(url,p_data,options)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }

    //get schedule details
    get_schedule(request_id,type): Observable<string[]> {
        var url = fldb+"/flytta_api/v0.1/customer_schedule/getvisit/"+request_id+"/"+type;
        let headers = new Headers({'Authorization':this.jwt_token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url,options)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }

    //get item list
    get_itemlist(id): Observable<string[]> {
        var url = fldb+"/flytta_api/v0.1/rmp/itemlist/get/"+id;
        let headers = new Headers({'Authorization':this.jwt_token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url,options)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }

    //service request form
    get_servicedata(): Observable<any> {
        var url = fldb+"/flytta_api/v0.1/service_data/getdata";
        let headers = new Headers({'Authorization':this.jwt_token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url,options)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
    //get user's house rental details
    get_userrental(id): Observable<any> {
        var url = fldb+"/flytta_api/v0.1/user_prop/show/"+id;
        let headers = new Headers({'Authorization':this.jwt_token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url,options)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
//get user's movers details
    get_usermover(id): Observable<any> {
        var url = fldb+"/flytta_api/v0.1/user_mover/value/"+id;
        let headers = new Headers({'Authorization':this.jwt_token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url,options)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
    //
    get_scheduleById(id): Observable<any> {
        var url = fldb+"/flytta_api/v0.1/crm/schedule/"+id;
        let headers = new Headers({'Authorization':this.jwt_token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url,options)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
    //get property detail
    get_propDetails(id): Observable<any> {
        var url = fldb+"/flytta_api/v0.1/portal/property/findserviceid/"+id;
        let headers = new Headers({'Authorization':this.jwt_token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url,options)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
    //get the poits to track
    get_track(): Observable<any> {
        var url = fldb+"/flytta_api/v0.1/rmp/track/FB1Z7IJI01";
        let headers = new Headers({'Authorization':this.jwt_token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url,options)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
    //suggested property based on request form
    get_filterbased(p_data): Observable<string[]> {
        var url = fldb+"/flytta_api/v0.1/portal/property/filterbased";
        let headers = new Headers({'Authorization':this.jwt_token});
        let options = new RequestOptions({headers: headers});
        return this.http.post(url,p_data,options)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }

    post_msg(id,p_data): Observable<string[]>{
        var url = fldb+"/flytta_api/v0.1/crm/post_message/"+id;
        let headers = new Headers({'Authorization':this.jwt_token});
        let options = new RequestOptions({headers: headers});
        return this.http.post(url,p_data,options)
        .map((res: Response) => res.json())
        //.do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
    get_msg(id): Observable<any>{
        var url = fldb+"/flytta_api/v0.1/crm/get_message/"+id;
        let headers = new Headers({'Authorization':this.jwt_token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url,options)
        .map((res: Response) => res.json())
        //.do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
    //register new user/admin
    register_user(p_data): Observable<any>{
        var url = fldb+"/flytta_api/v0.1/admin_register";
        return this.http.post(url,p_data)   
        .map((res: Response) => res.json())
        //.do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
    //admin login
    login_user(p_data): Observable<any>{
        var url = fldb+"/flytta_api/v0.1/admin_login";        
        return this.http.post(url,p_data)   
        .map((res: Response) => res.json())
        //.do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }    

    /**
    * Handle HTTP error
    */
    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
