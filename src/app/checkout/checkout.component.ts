import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../cart.service';
import { CommonService } from '../common.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private service: PaymentService, public cart: CartService, private cookies: CookieService, private common: CommonService) { }

  form!: FormGroup;
  amount: number = 0;

  userInfo: any;

  ngOnInit(): void {

    this.userInfo = JSON.parse(this.cookies.get('user-info'));

    this.form = new FormGroup({
      name: new FormControl(this.userInfo.name),
      email: new FormControl(this.userInfo.email),
      phone: new FormControl(this.userInfo.phone)
    });

    for (let i = 0; i < this.cart.selectedItems.length; i++) {
      let temp = this.cart.selectedItems[i];
      this.amount += (temp.price * this.cart.selectedItemCount[temp.id]);
    }

  }

  placeOrder() {
    let temp = this.form.value;
    temp.items = this.cart.selectedItems;
    temp.count = this.cart.selectedItemCount;
    temp.username = this.userInfo.username;
    this.common.showLoader = true;
    this.service.createPaymentOrder(temp).subscribe((data: any) => {
      window.location.assign(data.paymentOptions.paymentUrl);
      this.common.showLoader = false;
    }, err => {
      this.common.showLoader = false;
    });
  }

}
