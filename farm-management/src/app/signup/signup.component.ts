import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import Validation from '../../../validation';
import { FormServiceService } from '../form-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signIn: FormGroup;
  submitted = true;
  userRecord: any = {
    fullName: '',
    username: '',
    email: '',
    Password: '',
    Confirmpassword: '',
    type: '',
  };
  checkUsername: any;

  constructor(
    private fb: FormBuilder,
    public svc: FormServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.signIn = this.fb.group({
      fullName: [this.userRecord.fullname],
      username: [this.userRecord.username],
      email: [this.userRecord.email],
      Password: [this.userRecord.Password],
      Confirmpassword: [this.userRecord.Confirmpassword],
      type: [],
    });
  }

  ngOnInit(): void {
    this.signIn = this.fb.group(
      {
        fullname: ['', Validators.required],
        username: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        type: ['user'],
        Password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('Password', 'confirmPassword')],
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.signIn.controls;
  }

  onSubmit(Formvalue: any): void {
    console.log('from form', Formvalue);
    this.svc.storedata(Formvalue).subscribe(
      (data: any) => {
        console.log('data returned from server', data);
      },
      (err) => {
        console.log(err);
      }
    );
    if (this.signIn.valid) {
      this.submitted = true;
      this.router.navigate(['/login']);
      this.toastr.success('Registered Successfully');
    }
  }
  validation(event: any) {
    console.log(event.target.value);
    this.svc.uname(event.target.value).subscribe((data: any) => {
      console.log('Username verification data from database', data);
      if (data.docs[0].username == event.target.value) {
        this.toastr.error('Username Already exist try another username');
        this.signIn.controls['username'].setValue('');
      }
    });
  }
}
