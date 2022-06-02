import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormServiceService } from '../form-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  adminForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: FormServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      userid: ['', Validators.required],
      pwd: ['', Validators.required],
      type: ['admin'],
    });
  }
  get userid() {
    return this.adminForm.get('userid');
  }
  get pwd() {
    return this.adminForm.get('pwd');
  }

  submit(Formvalue: any) {
    console.log('from form', Formvalue);
    this.api.storeData(Formvalue).subscribe((data) => {
      if (data.docs[0].userid === Formvalue.userid) {
        if (data.docs[0].pwd === Formvalue.pwd) {
          this.router.navigate(['addproduct'], {});
          this.toastr.success('Login successfully');
        }
      } else {
        this.toastr.error('enter valid username and password');
      }
      console.log('data returned from server', data);
    });
  }
}
