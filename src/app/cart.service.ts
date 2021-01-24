import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  selectedItems: any[] = [];

  selectedItemCount: any = {};

  constructor(private cookies: CookieService) {
    if (this.cookies.check("user-info")) {
      let userInfo = JSON.parse(this.cookies.get('user-info'));
      if (this.cookies.check("cart-items-" + userInfo.username)) {
        this.selectedItems = JSON.parse(this.cookies.get("cart-items-" + userInfo.username));
      }
      if (this.cookies.check("cart-items-count-" + userInfo.username)) {
        this.selectedItemCount = JSON.parse(this.cookies.get("cart-items-" + userInfo.username));
      }
    }
  }

  addItem(item: any) {
    if (this.selectedItemCount[item.id] != undefined) {
      this.selectedItemCount[item.id]++;
    } else {
      this.selectedItemCount[item.id] = 1;
      this.selectedItems.push(item);
    }
    this.updateCookie();
  }

  removeItem(item: any, index: number) {
    if (this.selectedItemCount[item.id] != undefined && this.selectedItemCount[item.id] > 1) {
      this.selectedItemCount[item.id]--;
    } else {
      delete this.selectedItemCount[item.id];
      this.selectedItems.splice(index, 1);
    }
    this.updateCookie();
  }

  delete(item: any, index: number) {
    delete this.selectedItemCount[item.id];
    this.selectedItems.splice(index, 1);
    this.updateCookie();
  }

  isSelected(item: any) {
    return this.selectedItemCount[item.id] != undefined;
  }

  updateCookie() {
    let userInfo = JSON.parse(this.cookies.get('user-info'));
    if (this.cookies.check("cart-items-" + userInfo.username)) {
      this.cookies.delete("cart-items-" + userInfo.username);
    }
    this.cookies.set('cart-items-' + userInfo.username, JSON.stringify(this.selectedItems), { expires: 2 });

    if (this.cookies.check("cart-items-count-"+userInfo.username)) {
      this.cookies.delete("cart-items-count-" + userInfo.username);
    }
    this.cookies.set('cart-items-count-' + userInfo.username, JSON.stringify(this.selectedItemCount), { expires: 2 });
  }
}
