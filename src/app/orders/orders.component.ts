import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    private service: PaymentService,
    private cookies: CookieService
  ) { }

  data: any[] = [];

  ngOnInit(): void {
    let userInfo = JSON.parse(this.cookies.get("user-info"));

    this.service.getOrders(userInfo.username).subscribe((data: any) => {
      this.data = data;
    }, err => {

    });
  }

}
