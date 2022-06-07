import { Component, OnInit } from '@angular/core';
import { CouchServiceService } from '../couch-service.service';
import { Router } from '@angular/router';
import * as lodash from 'lodash';

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.css'],
})
export class ViewStockComponent implements OnInit {
  stockTemp = [];
  productTemp: any;
  constructor(private svc: CouchServiceService, private router: Router) {}

  ngOnInit(): void {
    this.svc
      .prodDetails('orderInformation', 'demo_database')
      .subscribe((datas: any) => {
        console.log('product', datas);
        this.productTemp = datas.docs;

        this.getProduct = [];
        let product = [];
        this.getProduct = lodash.uniqBy(this.productTemp, 'product');
        product = lodash.map(this.getProduct, 'product');
        this.getProduct.forEach((element) => {
          const prod = this.productTemp.filter(
            (el) => el['productName'] === element['productName']
          );
          element['quantity'] = lodash.sumBy(prod, 'quantity');
        });

        let data = {
          keys: product,
        };
        this.svc
          .getAllDocsByKeys('demo_database', data)
          .subscribe((productData: any) => {
            const getProd = productData.rows.map((el) => el.doc);
            this.getProduct.forEach((prod) => {
              prod['productData'] = getProd.filter(
                (ell) => ell['_id'] === prod['productName']
              )[0];
            });
            this.stockcalu();
            console.log(productData);
          });
      });
  }
  stockcalu() {
    this.svc.prodDetails('stock', 'demo_database').subscribe((datas: any) => {
      console.log('stock', datas);
      this.stockTemp = datas.docs;
      this.getStock = [];
      let product = [];
      this.getStock = lodash.uniqBy(this.stockTemp, 'productName');
      product = lodash.map(this.getStock, 'productName');
      this.getStock.forEach((element) => {
        const stock = this.stockTemp.filter(
          (el) => el['productName'] === element['productName']
        );
        element['total'] = lodash.sumBy(stock, 'stockTot');
        const order = this.getProduct.filter(
          (el) => el['product'] === element['productName']
        );
        if (order && order.length > 0) {
          element['bln'] = element['total'] - order[0]['quantity'];
        } else {
          element['bln'] = element['total'];
        }
      });

      let data = {
        keys: product,
      };
      this.svc
        .getAllDocsByKeys('demo_database', data)
        .subscribe((productData: any) => {
          const getProd = productData.rows.map((el) => el.doc);
          this.getStock.forEach((stock) => {
            stock['product'] = getProd.filter(
              (ell) => ell['_id'] === stock['productName']
            )[0];
          });
          console.log(productData);
        });
    });
  }

  getProduct: any = [];
  getStock: any = [];

  logOut() {
    localStorage.clear();
    this.router.navigate([''], {});
    alert('Your account will be logged out!');
  }
}
