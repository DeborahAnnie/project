import { Component, OnInit } from '@angular/core';
import { CouchServiceService } from '../couch-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  userData: any;
  products = [];
  constructor(private svc: CouchServiceService, private router: Router) {}

  ngOnInit(): void {
    this.cartDetails();
    this.loadCart();
    this.cartFunc();
  }

  getcartDetail: any = [];
  cartDetails() {
    if (localStorage.getItem('localCart')) {
      this.getcartDetail = JSON.parse(localStorage.getItem('localCart'));
      console.log(this.getcartDetail, 'carddetail');
    }
  }
  total: number = 0;
  loadCart() {
    if (localStorage.getItem('localCart')) {
      this.getcartDetail = JSON.parse(localStorage.getItem('localCart'));
      this.total = this.getcartDetail.reduce(function (acc, val) {
        return acc + val.productPrice * val.productQnt;
      }, 0);
    }
  }

  removeall() {
    localStorage.removeItem('localCart');
    this.getcartDetail = [];
    this.total = 0;
  }

  // ---------------------------------------------
  cartItem: number = 0;
  cartFunc() {
    if (localStorage.getItem('localCart') != null) {
      var cartCount = JSON.parse(localStorage.getItem('localCart'));
      this.cartItem = cartCount.length;
      this.svc.cartSubject.next(this.cartItem);
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate([''], {});
    alert('Your account will be logged out!');
  }

  // --------------------------------------------------------------------------
  post() {
    this.userData = JSON.parse(localStorage.getItem('localS') || '{}');

    const information = {
      type: 'addProd',
      user: this.userData.id,
    };

    this.svc.add('demo_database', information).subscribe(
      (res: any) => {
        console.log(res);
        const oderId = res.id;
        let taskList: any = [];
        this.products.forEach((element) => {
          const orderInfo = {
            order: oderId,
            product: element['_id'],
            quantity: element['productQnt'],
            price: element['productPrice'],
            type: 'orderInfo',
          };
          taskList.push(
            this.svc.add('demo_database', orderInfo).subscribe((_res: any) => {
              return res;
            })
          );
        });
        Promise.all(taskList).then((result) => {
          console.log(result);
          alert('Your product was created successfully!');
        });
      },
      (rej) => {
        alert('opps' + rej);
      }
    );
  }
  orderDetails() {
    let data = {
      selector: {
        type: 'addProd',
        user: this.userData.id,
      },
    };
  }
}
