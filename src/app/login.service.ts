import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private common: CommonService) { }

  login(user: any) {
    return this.http.post(this.common.apiURL + '/login', user);
  }

  register(user: any) {
    return this.http.post(this.common.apiURL + '/register', user, {
      responseType: 'text',
      observe: 'response',
    });
  }
}
