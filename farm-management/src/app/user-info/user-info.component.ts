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
    emailid: '',
    aadhar: '',
    mobile: '',
    age: '',
    add: '',
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
      emailid: ['', [Validators.required, Validators.email]],
      aadhar: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
        ],
      ],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
        ],
      ],
      age: ['', Validators.required],
      add: ['', Validators.required],
      type: ['information'],
      user: this.id,
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }

  submit() {
    console.log(this.myform.value);

    const userInfo = {
      firstname: this.myform.value.firstname,
      lastname: this.myform.value.lastname,
      emailid: this.myform.value.emailid,
      aadhar: this.myform.value.aadhar,
      mobile: this.myform.value.mobile,
      age: this.myform.value.age,
      add: this.myform.value.add,
      type: 'information',
      user: this.id,
    };

    this.couchdbsvc
      .postDetails(this.myform.value, 'demo_database')
      .subscribe((data) => {
        console.log(data);
        console.log('Success');
      });
    this.toast.success('Your Details are recorded successfully!');
  }
}
