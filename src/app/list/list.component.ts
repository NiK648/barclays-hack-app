import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from '../cart.service';
import { CartComponent } from '../cart/cart.component';
import { CommonService } from '../common.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private service: DataService, breakpointObserver: BreakpointObserver, private cart: CartService, public dialog: MatDialog, private common: CommonService) {
    breakpointObserver.observe([
      Breakpoints.Web
    ]).subscribe(result => {
      if (result.matches) {
        this.column = 5;
      }
    });

    breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      if (result.matches) {
        this.column = 1;
      }
    });

    breakpointObserver.observe([
      Breakpoints.Tablet
    ]).subscribe(result => {
      if (result.matches) {
        this.column = 3;
      }
    });

    this.common.showCart = true;
  }

  books: any[] = [];

  searchTerm: string = "";
  sortTerm: string = "";

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  column!: number;

  ngOnInit(): void {
    let temp = {
      pageSize: 20,
      pageNumber: 1,
      filter: this.searchTerm,
      sortColumn: 'average_rating',
      sortDirection: this.sortTerm
    };
    this.getPageData(temp);
  }

  addItem(book: any) {
    this.cart.addItem(book);
  }

  showAddButton(book: any) {
    return !this.cart.isSelected(book);
  }

  pageChange(event: PageEvent) {
    let temp = {
      pageSize: event.pageSize,
      pageNumber: event.pageIndex + 1,
      filter: this.searchTerm,
      sortColumn: 'average_rating',
      sortDirection: this.sortTerm
    };
    this.getPageData(temp);
  }

  getPageData(pageInfo: any) {
    this.common.showLoader = true;
    this.service.getBooks(pageInfo).subscribe((data: any) => {
      this.books = data.items;
      this.paginator.length = data.total;
      this.common.showLoader = false;
    }, err => {
      this.common.showLoader = false;
    });
  }

  search() {
    this.getPageData(this.getPageInfo());
  }

  getPageInfo() {
    return {
      pageSize: this.paginator.pageSize,
      pageNumber: this.paginator.pageIndex + 1,
      filter: this.searchTerm,
      sortColumn: 'average_rating',
      sortDirection: this.sortTerm
    }
  }

  sortChange(event: MatSelectChange) {
    this.getPageData(this.getPageInfo());
  }

}
