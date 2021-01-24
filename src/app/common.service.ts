import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  showLoader: boolean = false;

  showCart: boolean = false;
  showOrders: boolean = false;

  apiURL: string = "https://barclays-backend-app.herokuapp.com";

  //apiURL: string = "http://localhost:8080";

  constructor() { }
}
