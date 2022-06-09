import { Component, OnInit } from '@angular/core';
import { CouchServiceService } from '../couch-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  userData: any;
  products = [];
  constructor(
    private svc: CouchServiceService,
    private router: Router,
    private toast: ToastrService
  ) {}

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

  // -------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  post() {
    this.userData = JSON.parse(localStorage.getItem('localS') || '{}');
    console.log(this.userData);

    const information = {
      type: 'order',
      user: this.userData.docs[0]._id,
    };

    this.svc.add('demo_database', information).subscribe(
      (res: any) => {
        console.log('cart', res);
        const orderId = res.id;
        let taskList: any = [];
        this.products = JSON.parse(localStorage.getItem('localCart'));
        this.products.forEach((element) => {
          const orderInformation = {
            order: orderId,
            product: element['_id'],
            productName: element['productName'],
            quantity: element['productQnt'],
            price: element['productPrice'],
            type: 'orderInformation',
          };
          taskList.push(
            this.svc
              .add('demo_database', orderInformation)
              .subscribe((_res: any) => {
                console.log('after pushed', res);
                return res;
              })
          );
        });
        Promise.all(taskList).then((_result) => {
          this.toast.success(
            'Your product was added successfully and will be deliverd!'
          );
        });
      },
      (rej) => {
        alert('opps' + rej);
      }
    );
  }
}
