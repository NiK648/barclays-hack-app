import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  selectedItems: any[] = [];

  selectedItemCount: any = {};

  constructor(private cookies: CookieService) {
    let userInfo = JSON.parse(this.cookies.get('user-info'));
    if (userInfo) {
      this.selectedItems = userInfo.selectedItems != undefined ? userInfo.selectedItems : [];
      this.selectedItemCount = userInfo.selectedItemCount != undefined ? userInfo.selectedItemCount : [];
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
    userInfo.selectedItems = this.selectedItems
    userInfo.selectedItemCount = this.selectedItemCount;
    this.cookies.set('user-info', JSON.stringify(userInfo), { expires: 2 });
  }
}
