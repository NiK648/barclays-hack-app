import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private common:CommonService) { }

  getBooks(pageInfo: any) {
    return this.http.post(this.common.apiURL + '/listItems', pageInfo);
  }
}
