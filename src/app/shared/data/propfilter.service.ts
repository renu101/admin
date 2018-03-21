import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';

import 'rxjs/add/observable/throw';

@Injectable()
export class PropfilterService {

  constructor(private http: Http, private dataService: DataService) { }
  

}
