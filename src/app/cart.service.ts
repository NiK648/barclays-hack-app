import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  selectedItems: any[] = [];

  selectedItemCount: any = {};

  constructor(private cookies: CookieService) {
  }

  addItem(item: any) {
    if (this.selectedItemCount[item.id] != undefined) {
      this.selectedItemCount[item.id]++;
    } else {
      this.selectedItemCount[item.id] = 1;
      this.selectedItems.push(item);
    }
  }

  removeItem(item: any, index: number) {
    if (this.selectedItemCount[item.id] != undefined && this.selectedItemCount[item.id] > 1) {
      this.selectedItemCount[item.id]--;
    } else {
      delete this.selectedItemCount[item.id];
      this.selectedItems.splice(index, 1);
    }
  }

  delete(item: any, index: number) {
    delete this.selectedItemCount[item.id];
    this.selectedItems.splice(index, 1);
  }

  isSelected(item: any) {
    return this.selectedItemCount[item.id] != undefined;
  }

}
