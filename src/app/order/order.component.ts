import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private service: PaymentService, private route: ActivatedRoute, private router: Router, private common: CommonService) { }

  order!: any;

  ngOnInit(): void {
    this.common.showCart = true;
    this.common.showOrders = true;
    this.route.queryParamMap.subscribe((params: any) => {
      this.service.getDetails(params.params.id).subscribe((data: any) => {
        console.log(data);
        this.order = data;
      }, err => {

      })
    });
  }

  retry() {

  }

  continue() {
    this.router.navigateByUrl('list');
  }

}
