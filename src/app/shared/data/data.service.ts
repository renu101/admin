import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
const fldb = 'http://api.goflytta.com/admin';
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
    constructor(private http: Http) {}

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
        return this.http.get(url)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }

    //get partial property details of given ids
    get_prop(p_data): Observable<string[]> {
        var url = fldb+"/flytta_api/v0.1/property/multi_id";
        return this.http.post(url,p_data)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }

    //get schedule details
    get_schedule(request_id,type): Observable<string[]> {
        var url = fldb+"/flytta_api/v0.1/customer_schedule/getvisit/"+request_id+"/"+type;
        return this.http.get(url)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }

    //get item list
    get_itemlist(id): Observable<string[]> {
        var url = fldb+"/flytta_api/v0.1/rmp/itemlist/get/"+id;
        return this.http.get(url)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }

    //service request form
    get_servicedata(): Observable<any> {
        var url = fldb+"/flytta_api/v0.1/service_data/getdata";
        return this.http.get(url)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
    //get user's house rental details
    get_userrental(id): Observable<any> {
        var url = fldb+"/flytta_api/v0.1/user_prop/show/"+id;
        return this.http.get(url)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
//get user's movers details
    get_usermover(id): Observable<any> {
        var url = fldb+"/flytta_api/v0.1/user_mover/value/"+id;
        return this.http.get(url)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
    //
    get_scheduleById(id): Observable<any> {
        var url = fldb+"/flytta_api/v0.1/crm/schedule/"+id;
        return this.http.get(url)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
    //get property detail
    get_propDetails(id): Observable<any> {
        var url = fldb+"/flytta_api/v0.1/portal/property/findserviceid/"+id;
        return this.http.get(url)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
    //get the poits to track
    get_track(): Observable<any> {
        var url = fldb+"/flytta_api/v0.1/rmp/track/FB1Z7IJI01";
        return this.http.get(url)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
        .catch(this.handleError);
    }
    //suggested property based on request form
    get_filterbased(p_data): Observable<string[]> {
        var url = fldb+"/flytta_api/v0.1/portal/property/filterbased";
        return this.http.post(url,p_data)
        .map((res: Response) => res.json())
        //              .do(data => console.log('server data:', data))  // debug
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
