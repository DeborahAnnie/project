import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CouchServiceService } from '../couch-service.service';
import { Router } from '@angular/router';
// import { isMaster } from 'cluster';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  prodForm: FormGroup;

  userData = JSON.parse(localStorage.getItem('localS') || '{}');

  product: any = {
    productName: '',
    img: '',
    category: '',
    productPrice: '',
    productQnt: '',
    totQnt: '',
    type: 'addProd',
    user: this.userData.id,
  };

  constructor(
    private fb: FormBuilder,
    private dbsvc: CouchServiceService,
    private http: HttpClient,
    private router: Router
  ) {
    this.prodForm = this.fb.group({
      productName: [''],
      img: [''],
      category: [''],
      productPrice: [''],
      productQnt: [''],
      totQnt: [''],
      type: ['addProd'],
    });
  }

  ngOnInit(): void {}

  get productName() {
    return this.prodForm.controls;
  }
  get img() {
    return this.prodForm.controls;
  }
  get category() {
    return this.prodForm.controls;
  }
  get productPrice() {
    return this.prodForm.controls;
  }
  get productQnt() {
    return this.prodForm.controls;
  }
  get totQnt() {
    return this.prodForm.controls;
  }

  add() {
    console.log(this.prodForm.value);

    const prod = {
      productName: this.prodForm.value.productName,
      img: this.prodForm.value.productId,
      category: this.prodForm.value.category,
      productPrice: this.prodForm.value.productPrice,
      productQnt: this.prodForm.value.productQnt,
      totQnt: this.prodForm.value.totQnt,
      type: 'addProd',
    };

    this.dbsvc
      .postDetails(this.prodForm.value, 'demo_database')
      .subscribe((data) => {
        console.log(data);
        console.log('Successful!');
      });
  }

  logOut() {
    this.router.navigate([''], {});
    alert('Your account will be logged out!');
  }

  ProductDetails() {
    //add selector

    let datas = {
      selector: {
        type: 'addProd',
        user: this.userData.id,
      },
    };
  }
}
