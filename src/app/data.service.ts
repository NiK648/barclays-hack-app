import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getBooks(pageInfo: any) {
    return this.http.post('http://localhost:8080/barclays-backend/listItems', pageInfo);
  }
}
