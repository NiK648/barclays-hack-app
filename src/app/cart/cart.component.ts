import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cart: CartService, private router: Router, public dialogRef: MatDialogRef<CartComponent>,) { }

  ngOnInit(): void {
  }

  checkout() {
    this.dialogRef.close();
    this.router.navigateByUrl('checkout');
  }

  changeQuantity(event: any, item: any, index: number) {
    console.log(event);
    console.log(this.cart.selectedItemCount);
    if (event == 0) {
      this.cart.delete(item, index);
    }
  }

}
