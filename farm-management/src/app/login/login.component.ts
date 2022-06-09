import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormServiceService } from '../form-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  previousDataObject: any;

  loginrecord: any = {
    username: '',
    Password: '',
    type: '',
  };

  loginform: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: FormServiceService,
    private toastr: ToastrService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((res) => {
      console.log('User Data', res);
      this.previousDataObject = res;
    });

    this.loginform = this.fb.group({
      username: [this.loginrecord.username],
      Password: [this.loginrecord.Password],
      type: [],
    });
  }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      type: ['user'],
    });
  }
  get username() {
    return this.loginform.get('username')!;
  }
  get Password() {
    return this.loginform.get('Password')!;
  }
  login(Formvalue: any) {
    console.log(Formvalue.username);
    this.api.test_get(Formvalue.username).subscribe((data) => {
      console.log('data returned from server', data);
      const loginData = { response: JSON.stringify(data.docs[0]) };
      localStorage.setItem('localS', JSON.stringify(data));

      if (data.docs.length <= 0) {
        this.toastr.error('Please Register');
      }
      if (data.docs[0].username === Formvalue.username) {
        if (data.docs[0].Password === Formvalue.Password) {
          this.router.navigate(['user'], {
            queryParams: loginData,
          });

          this.toastr.success('Login Successfully');
        } else {
          this.toastr.error('Enter Correct Password ');
        }
      }
    });
  }
}
