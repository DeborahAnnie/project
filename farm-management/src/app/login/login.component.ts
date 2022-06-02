import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormServiceService } from '../form-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
      username: [''],
      Password: ['', [Validators.minLength(8)]],
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
      if (data.docs.length <= 0) {
        this.toastr.error('Please Register');
      }
      if (data.docs[0].username === Formvalue.username) {
        if (data.docs[0].Password === Formvalue.Password) {
          // localStorage.setItem('usrData', JSON.stringify(data.docs[0]));
          this.router.navigate(['user'], {
            queryParams: loginData,
          });

          this.toastr.success('Login Successfully');
        } else {
          this.toastr.error('Enter Correct Password ');
        }
      } else {
        this.toastr.error('Please Register');
      }

      let datas = {
        fullname: data['docs'][0].name,
        username: data['docs'][0].username,
        emailId: data['docs'][0].email,
        Password: data['docs'][0].Password,
        confirmPassword: data['docs'][0].confirmPassword,
        id: data['docs'][0]._id,
      };
      localStorage.setItem('localS', JSON.stringify(data));
    });
  }
}
