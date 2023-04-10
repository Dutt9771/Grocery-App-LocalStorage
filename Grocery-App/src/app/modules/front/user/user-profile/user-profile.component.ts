import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Edit_user_detail } from 'src/app/shared/Models/edituserdetail';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  public user: any;
  RegisterData: any;
  errorMessage: string;
  User_login_Token: any;
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this.Get_User_Details();
    this.Edit_Profile();
  }
  Profile: any;
  User_Profile_Obj: any;
  Edit_Profile() {
    this.Profile = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      alternateemail: new FormControl('', [
        //  Validators.required,
        //  Validators.email,
        //  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      // password:new FormControl('',[Validators.required,Validators.minLength(8)]),
      alternatecontact: new FormControl('', [
        // Validators.required,
        // Validators.pattern('[- +()0-9]{13}'),
      ]),
      dob: new FormControl('', [Validators.required]),
    });
  }
  Get_User_Details() {
    this._userService.Get_User_Details().subscribe({
      next: (User_details_res: any) => {
        if (User_details_res) {
          if (User_details_res.data) {
            console.log('User_Details', User_details_res.data);
            this.User_Profile_Obj = User_details_res.data;
            console.log('User_Profile_Obj', this.User_Profile_Obj);

            this.Profile.patchValue({
              firstname: this.User_Profile_Obj.first_name,
              lastname: this.User_Profile_Obj.last_name,
              alternateemail: this.User_Profile_Obj.secondary_email,
              alternatecontact: this.User_Profile_Obj.secondary_mobile_number,
              dob: this.User_Profile_Obj.date_of_birth,
            });

            // this.Profile.get('firstName').setValue("this.User_Profile_Obj.first_name");
            // this.Profile.get('lastName').setValue(this.User_Profile_Obj.last_name);
          }
        }
      },
      error: (User_details_error) => {
        console.log('Getuserdetail_error', User_details_error);
      },
    });
  }

  get get_Profile() {
    return this.Profile.controls;
  }

  Save_Profile() {
    if (this.Profile.valid) {
      console.log(this.Profile.value);
    }
  }

  User_Profile_Edit() {
    if (this.Profile.valid) {
      let userData = this.Profile.value;
      console.log('user data', userData);

      let Edit_User_Details_body: Edit_user_detail = {
        first_name: userData.firstname,
        last_name: userData.lastname,
        password: userData.password,
        date_of_birth: userData.dob,
        secondary_mobile_number: userData.alternatecontact,
        secondary_email: userData.alternateemail,
      };
      console.log('Edit User Details body', Edit_User_Details_body);
      if (this.Profile.valid) {
        this.User_login_Token = JSON.parse(
          localStorage.getItem('User_login_Token')
        );
        this._userService.Edit_user_details(Edit_User_Details_body).subscribe({
          next: (Edit_User_res: any) => {
            if (Edit_User_res) {
              console.log('Edit_User_res', Edit_User_res);
              this.errorMessage = 'User Details Successfully Edited';
              this.route.navigate(['/home']);
              this.toastr.success('Edit Profile Successfully');
            }
          },
          error: (Edit_User_error) => {
            console.log('Edit_User_error status', Edit_User_error.status);
            console.log('Edit_User_error', Edit_User_error);
            if (Edit_User_error.status) {
              if (Edit_User_error.error.message == 'Internal server error') {
                this.toastr.error(
                  Edit_User_error.error.error.errors[0].message
                );
              } else {
                this.toastr.error(Edit_User_error.error.message);
                this.errorMessage = Edit_User_error.error.message;
                console.log('Profile value', this.Profile.value);
              }
            }
          },
        });
      }
    } else {
      this.toastr.error('All Fields Required');
    }
  }
}
