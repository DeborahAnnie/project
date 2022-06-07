import { Component, OnInit } from '@angular/core';
import { CouchServiceService } from '../couch-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public product: any;
  public productArray: any = [];
  public filterCategory: any;
  constructor(private svc: CouchServiceService, private router: Router) {
    this.svc.cartSubject.subscribe((data) => {
      this.cartItem = data;
    });
  }

  ngOnInit(): void {
    this.svc
      .prodDetails1('product', 'demo_database')
      .subscribe((datas: any) => {
        console.log('stock', datas);
        this.product = datas;
        this.productArray =
          this.filterCategory =
          this.product =
            datas.rows.map((x) => x.doc);
        this.filterCategory = this.filterCategory.rows;
      });

    this.cartFunc();
  }

  filter(category: string) {
    this.filterCategory = this.productArray.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }

  inc(prd) {
    if (prd.productQnt != 50) {
      prd.productQnt += 1;
    }
  }
  dec(prd) {
    if (prd.productQnt != 1) {
      prd.productQnt -= 1;
    }
  }

  itemsCart: any = []; //global variable
  addCart(stock) {
    console.log(stock);
    let cartData = localStorage.getItem('localCart');
    if (cartData == null) {
      let storeData: any = [];
      storeData.push(stock);
      localStorage.setItem('localCart', JSON.stringify(storeData));
    } else {
      let id = stock.prdId;
      let index: number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart'));
      for (let i = 0; i < this.itemsCart.length; i++) {
        if (parseInt(id) === parseInt(this.itemsCart[i].prdId)) {
          this.itemsCart[i].qnt = stock.qnt;
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemsCart.push(stock);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      } else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumFunc();
  }

  // -----------------------------------------------------------------------------------------------------------
  cartNumber: number = 0;
  cartNumFunc() {
    let cartVal = JSON.parse(localStorage.getItem('localCart'));
    this.cartNumber = cartVal.length;
    this.svc.cartSubject.next(this.cartNumber);
  }

  cartItem: number = 0;
  cartFunc() {
    if (localStorage.getItem('localCart') != null) {
      let cartCount = JSON.parse(localStorage.getItem('localCart'));
      this.cartItem = cartCount.length;
      this.svc.cartSubject.next(this.cartItem);
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate([''], {});
    alert('Your account will be logged out!');
  }
}
