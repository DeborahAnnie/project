import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-buy-form',
  templateUrl: './buy-form.component.html',
  styleUrls: ['./buy-form.component.css'],
})
export class BuyFormComponent implements OnInit {
  buyform: FormGroup;
  buy: any = {
    firstname: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardname: '',
    cardnumber: '',
    expmonth: '',
    cvv: '',
  };

  constructor(private fb: FormBuilder) {
    this.buyform = this.fb.group({
      firstname: [''],
      email: [''],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
      cardname: [''],
      cardnumber: [''],
      expmonth: [''],
      cvv: [''],
    });
  }
  ngOnInit(): void {
    console.log('buy form');
  }

  submit() {
    console.log(this.buyform.value);

    const buyf = {
      firstname: this.buyform.value.firstname,
      email: this.buyform.value.email,
      address: this.buyform.value.address,
      city: this.buyform.value.city,
      state: this.buyform.value.state,
      zip: this.buyform.value.zip,
      cardname: this.buyform.value.cardname,
      cardnumber: this.buyform.value.cardnumber,
      expmonth: this.buyform.value.expmonth,
      cvv: this.buyform.value.cvv,
      type: 'buying',
    };
  }
}
