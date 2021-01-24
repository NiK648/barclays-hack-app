import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../cart.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private service: PaymentService, public cart: CartService, private cookies: CookieService) { }

  form!: FormGroup;
  amount: number = 0;

  ngOnInit(): void {

    let userInfo: any = JSON.parse(this.cookies.get('user-info'));

    this.form = new FormGroup({
      name: new FormControl(userInfo.name),
      email: new FormControl(userInfo.email),
      phone: new FormControl(userInfo.phone)
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
    this.service.createPaymentOrder(temp).subscribe((data: any) => {
      console.log(data);
      window.location.assign(data.paymentOptions.paymentUrl);
    }, err => {

    });
  }

}
