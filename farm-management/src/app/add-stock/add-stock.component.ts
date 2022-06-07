import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CouchServiceService } from '../couch-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css'],
})
export class AddStockComponent implements OnInit {
  stockForm: FormGroup;

  userData = JSON.parse(localStorage.getItem('localS') || '{}');

  stock: any = {
    productName: '',
    stockTot: '',
    type: 'stock',
    user: this.userData.id,
  };
  productInfo: any;

  constructor(
    private fb: FormBuilder,
    private dbsvc: CouchServiceService,
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {
    this.stockForm = this.fb.group({
      productName: [''],
      stockTot: [''],
      type: ['stock'],
    });
  }

  ngOnInit(): void {
    const queryParam = {
      type: 'product',
    };

    this.dbsvc
      .fetchDataUsingFind('demo_database', queryParam)
      .subscribe((resp: any) => {
        console.log(resp);
        this.productInfo = resp.docs;
        console.log('product Details', this.productInfo);
      });
  }
  get productName() {
    return this.stockForm.controls;
  }
  get stockTot() {
    return this.stockForm.controls;
  }
  logOut() {
    localStorage.clear();
    this.router.navigate([''], {});
    alert('Your account will be logged out!');
  }

  addStock() {
    console.log(this.stockForm.value);

    const stock = {
      productName: this.stockForm.value.stockName,
      stockTot: this.stockForm.value.stockTot,
      type: 'stock',
    };

    this.dbsvc
      .postDetails(this.stockForm.value, 'demo_database')
      .subscribe((data) => {
        console.log(data);
        console.log('Successful!');
      });
    this.toast.success('Your product stock was added successfully!');
  }
}

function productfetch() {
  throw new Error('Function not implemented.');
}
