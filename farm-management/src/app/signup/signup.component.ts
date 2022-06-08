import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import Validation from '../../../validation';
import { FormServiceService } from '../form-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  checkout: FormGroup;
  submitted = true;
  userRecord: any = {
    fullName: '',
    aadhar: '',
    email: '',
    Password: '',
    Confirmpassword: '',
    type: '',
  };

  constructor(
    private fb: FormBuilder,
    public svc: FormServiceService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.checkout = this.fb.group({
      fullName: [this.userRecord.fullname],
      username: [this.userRecord.aadhar],
      email: [this.userRecord.emailId],
      Password: [this.userRecord.Password],
      Confirmpassword: [this.userRecord.Confirmpassword],
      type: [],
    });
  }

  ngOnInit(): void {
    this.checkout = this.fb.group(
      {
        fullname: ['', Validators.required],
        username: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        type: ['user'],
        Password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('Password', 'confirmPassword')],
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.checkout.controls;
  }

  onSubmit(Formvalue: any): void {
    console.log('from form', Formvalue);
    this.svc.storedata(Formvalue).subscribe((data: any) => {
      console.log('data returned from server', data);
    });
    this.submitted = true;
    if (this.checkout.valid) {
      this.router.navigate(['/login']);

      return;
    }

    console.log(JSON.stringify(this.checkout.value, null, 2));
  }

  validateEmail() {
    const emailValue = this.checkout.value['email'];
    const query = {
      email: emailValue,
      type: 'user',
    };
    this.svc.Validation(query).subscribe(
      (response: any) => {
        console.log(response);
        if (response.docs.length > 1) {
          this.toastr.error('email already exist');
          this.submitted = false;
        } else {
          this.submitted = true;
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
