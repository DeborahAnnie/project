import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CouchServiceService } from '../couch-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  prodForm: FormGroup;

  userData = JSON.parse(localStorage.getItem('localS') || '{}');

  product: any = {
    productName: '',
    img: '',
    category: '',
    productPrice: '',
    productQnt: '',
    type: 'product',
  };

  constructor(
    private fb: FormBuilder,
    private dbsvc: CouchServiceService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.prodForm = this.fb.group({
      productName: [''],
      img: [''],
      category: [''],
      productPrice: [''],
      productQnt: [''],
      type: ['product'],
    });
  }

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

  add() {
    console.log(this.prodForm.value);

    this.dbsvc
      .postDetails(this.prodForm.value, 'demo_database')
      .subscribe((data) => {
        console.log(data);
        this.toast.success('Your product was added successfully!');
      });
  }

  logOut() {
    this.router.navigate([''], {});
    alert('Your account will be logged out!');
  }
}
