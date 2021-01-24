import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  createPaymentOrder(paymentInfo: any) {
    return this.http.post('http://localhost:8080/barclays-backend/payment', paymentInfo);
  }

  getDetails(paymentId: any) {
    return this.http.get('http://localhost:8080/barclays-backend/details?paymentId=' + paymentId);
  }
}
