import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { RegisterService } from 'src/app/shared/services/register/register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  User_Register: any;
  constructor(
    private _RegisterService: RegisterService,
    private toastr: ToastrService,
    private _authservice: AuthService,
    private router: Router
  ) {
    this.User_Register_Form();
  }

  ngDoCheck() {
    sessionStorage.getItem('User_Login_Token');
  }
  User_Register_Form() {
    this.User_Register = new FormGroup({
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      primary_mobile_number: new FormControl('', [
        Validators.required,
        Validators.pattern('[()0-9]{10}'),
      ]),
      primary_email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  get get_User_Register() {
    return this.User_Register.controls;
  }
  loading = true;
  errorMessage = '';
  Save_User_Register() {
    if (this.User_Register.valid) {
      console.log(this.User_Register.value);
      this._authservice.User_Register(this.User_Register.value).subscribe({
        next: (User_Register_res: any) => {
          if (User_Register_res) {
            console.log('User_Register_res', User_Register_res);
            this.errorMessage = '';
            sessionStorage.setItem(
              'Register_User',
              JSON.stringify(this.User_Register.value)
            );
            this.toastr.success('Register Successfully');
            this.router.navigate(['/front/user/login']);
          }
        },
        error: (Register_error) => {
          console.log('Register_error.status', Register_error.status);
          if (Register_error.status == 400) {
            this.errorMessage = 'User Already Exists';
            this.toastr.error('User Already Exists', '', {
              positionClass: 'toast-bottom-center',
            });
          } else {
            this.errorMessage = Register_error.error.error.errors[0].message;
            this.loading = false;
            this.toastr.error(Register_error.error.error.errors[0].message);
            console.log(
              'error caught in component',
              Register_error.error.error.errors[0].message
            );
          }
        },
      });
    } else {
      this.toastr.error('All Fields Required');
    }
  }
}
