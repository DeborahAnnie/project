import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { CouchServiceService } from '../couch-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  myform: FormGroup;
  user: any = {
    firstname: '',
    lastname: '',
    aadhar: '',
    mobile: '',
    age: '',
    add: '',
    cardname: '',
    cardnumber: '',
    expmonth: '',
    expyear: '',
    cvv: '',
    user: '',
  };
  userData: any;
  userId: any;
  id: any;
  constructor(
    private formBuilder: FormBuilder,
    private couchdbsvc: CouchServiceService,
    private toast: ToastrService
  ) {
    this.userData = JSON.parse(localStorage.getItem('localS') || '{}');
    this.userId = this.userData;
    this.id = this.userId.docs[0]._id;
    console.log('Master Id', this.id);
  }

  ngOnInit(): void {
    this.myform = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      aadhar: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      age: ['', Validators.required],
      add: ['', Validators.required],
      cardname: ['', Validators.required],
      cardnumber: ['', Validators.required],
      expmonth: ['', Validators.required],
      expyear: ['', Validators.required],
      cvv: ['', Validators.required],
      type: ['userInfo'],
      user: this.id,
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }

  submit() {
    console.log(this.myform.value);

    this.couchdbsvc
      .postDetails(this.myform.value, 'demo_database')
      .subscribe((data) => {
        console.log(data);
        console.log('Success');
        this.toast.success('Your Details are recorded successfully!');
      });
  }
}
