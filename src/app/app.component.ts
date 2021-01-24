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

  constructor(public common: CommonService, public dialog: MatDialog, private router: Router, private cookies: CookieService) {

  }
  ngOnInit(): void {
    if (this.router.url !== 'order' && !this.cookies.check('user-info')) {
      this.router.navigateByUrl('login');
    }
  }

  showCart() {
    this.dialog.open(CartComponent, {
      maxHeight: '75%',
      width: '75%'
    });
  }

  logout() {
    this.cookies.deleteAll();
    this.router.navigateByUrl('login');
  }

  showOrders() {
    this.router.navigateByUrl('orders');
  }

}
