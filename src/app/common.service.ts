import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  showLoader: boolean = false;

  showCart: boolean = false;

  apiURL: string = "http://localhost:8080/barclays-backend";

  constructor() { }
}
