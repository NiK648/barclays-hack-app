import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartComponent } from './cart/cart.component';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public common: CommonService, public dialog: MatDialog, private router: Router, public cookies: CookieService) {

  }
  ngOnInit(): void {
    if (!this.cookies.check('user-info')) {
      this.router.navigateByUrl('login');
    } else {
      this.common.showOrders = true;
      this.common.showCart = true;
    }

  }

  showCart() {
    this.dialog.open(CartComponent, {
      maxHeight: '75%',
      width: '75%'
    });
  }

  logout() {
    this.cookies.delete('user-info');
    this.common.showCart = false;
    this.common.showOrders = false;
    this.router.navigateByUrl('login');
  }

  orders() {
    this.router.navigateByUrl('orders');
  }

  gotolist() {
    if(location.pathname != '/login' && location.pathname != '/register' && location.pathname != '/list') {
      this.router.navigateByUrl('list');
    }
  }

}
