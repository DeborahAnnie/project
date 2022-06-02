// import { Component, OnInit } from '@angular/core';
// import {
//   FormControl,
//   FormGroup,
//   FormBuilder,
//   Validators,
//   AbstractControl,
// } from '@angular/forms';
// import { FormServiceService } from '../form-service.service';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import Validation from '../../../validator';
// import { type } from 'os';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css'],
// })
// export class SignupComponent implements OnInit {
//   signform: FormGroup;
//   submitted = false;
//   constructor(
//     private formBuilder: FormBuilder,
//     private api: FormServiceService,
//     private http: HttpClient,
//     private router: Router
//   ) {}
//   ngOnInit(): void {
//     this.form = this.formBuilder.group(
//       {
//         fullname: ['', Validators.required],
//         username: [
//           '',
//           [
//             Validators.required,
//             Validators.minLength(6),
//             Validators.maxLength(20),
//           ],
//         ],
//         email: ['', [Validators.required, Validators.email]],
//         password: [
//           '',
//           [
//             Validators.required,
//             Validators.minLength(6),
//             Validators.maxLength(40),
//           ],
//         ],
//         confirmPassword: ['', Validators.required],
//       },
//       {
//         validators: [Validation.match('password', 'confirmPassword')],
//       }
//     );
//   }
//   get f(): { [key: string]: AbstractControl } {
//     return this.form.controls;
//   }
//   form = new FormGroup({
//     fullname: new FormControl(),
//     username: new FormControl(),
//     email: new FormControl(),
//     password: new FormControl(),
//     confirmPassword: new FormControl(),
//   });
//   onSubmit(Formvalue: any): void {
//     console.log(Formvalue);
//     this.api.storedata(Formvalue).subscribe((data: any) => {
//       console.log('data returned from server', data);
//     });
//     this.submitted = true;
//     if (this.form.valid) {
//       this.router.navigate(['login'], {});
//       return null;
//     }
//     console.log(JSON.stringify(this.form.value, null, 2));
//   }
//   onReset(): void {
//     this.submitted = false;
//     this.form.reset();
//   }
// }

import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import Validation from '../../../validator';
import { FormServiceService } from '../form-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private router: Router
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
        validators: [Validation.match('password', 'confirmPassword')],
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
}
