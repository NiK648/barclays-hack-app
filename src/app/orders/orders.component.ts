import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../common.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    private service: PaymentService,
    private cookies: CookieService,
    private common: CommonService
  ) { }

  data: any[] = [];

  ngOnInit(): void {
    let userInfo = JSON.parse(this.cookies.get("user-info"));
    this.common.showLoader = true;
    this.service.getOrders(userInfo.username).subscribe((data: any) => {
      this.data = data;
      this.common.showLoader = false;
    }, err => {
      this.common.showLoader = false;
    });
  }

}
