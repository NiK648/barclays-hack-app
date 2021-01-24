import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private common: CommonService) { }

  createPaymentOrder(paymentInfo: any) {
    return this.http.post(this.common.apiURL + '/payment', paymentInfo);
  }

  getDetails(paymentId: any) {
    return this.http.get(this.common.apiURL + '/details?paymentId=' + paymentId);
  }

  getOrders(username: any) {
    return this.http.get(this.common.apiURL + '/orders?username=' + username);
  }

  updatePaymentId(paymentId: any, transactionId: any) {
    return this.http.get(this.common.apiURL + '/update?paymentId=' + paymentId + '&transactionId=' + transactionId);
  }
}
