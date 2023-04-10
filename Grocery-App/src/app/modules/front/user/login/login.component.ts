import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { RegisterService } from 'src/app/shared/services/register/register.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Google Login
  user: any;
  loggedIn!: boolean;
  buttonval: any;
  errorMessage: string;
  user_login: any;
  constructor(
    private _cartservice: CartService,
    private _userService: UserService,
    private cookieService: CookieService,
    private authService: SocialAuthService,
    private toastr: ToastrService,
    private router: Router,
    private _RegisterService: RegisterService,
    private _authservice: AuthService
  ) {}
  RegisterData: any;
  Customer_Id: number;
  User_Details: any;
  ngOnInit() {
    window.scrollTo(0, 0);

    // this.toastr.success('Login Successfully');
    this.User_Login_Form();
    this.RegisterData = JSON.parse(sessionStorage.getItem('Register_User'));
    this.authService.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.loggedIn = user != null;

        localStorage.setItem('User', JSON.stringify(user));

        // navigate to the UserProfileComponent and pass the user data
        let navigationExtras: NavigationExtras = {
          state: {
            user: user,
          },
        };
        if (user) {
          this.router.navigate(['front/user/user-profile'], navigationExtras);
          this.buttonval = 'Logout';
        }
      }
    });
  }
  // Get_Customer_Id(){

  // }
  ShowcartArr: any = [];
  Showcart() {
    this.User_Details = JSON.parse(sessionStorage.getItem('User_Details'));
    this.Customer_Id = this.User_Details.id;
    console.log('Customer_Id', this.Customer_Id);
    const sampleData = {
      id: this.Customer_Id,
      items: [],
    };
    this._cartservice.ShowCart().subscribe((res) => {
      if (res) {
        this.ShowcartArr = res;
        console.log('ShowcartArr', this.ShowcartArr);
        let FindCustomer = this.ShowcartArr.find(
          (item) => item.id === this.Customer_Id
        );
        console.log('FindCustomer', FindCustomer);
        if (!FindCustomer) {
          // console.log("NOt User")
          this._cartservice.AddCart(sampleData).subscribe((res) => {
            if (res) {
              console.log(res);
              this._cartservice.getItemCount();
              this._cartservice.Subtotal();
            }
          });
        }

        // for(let i=0;i<this.ShowcartArr.length;i++) {

        //   console.log("ShowcartArr[i]",this.ShowcartArr[i].customer_id)

        // }
      }
    });
    // return this.ShowcartArr
  }
  // Get_User_Details(){
  //     this._userService.Get_User_Details().subscribe({next:(User_details_res)=>{
  //     console.log("User_Details",User_details_res.data)
  //     sessionStorage.setItem('User_Details',JSON.stringify(User_details_res.data))
  //     this.Showcart()
  //   },error:(User_details_error)=>{
  //     console.log("Getuserdetail_error",User_details_error)
  //   }})

  // }

  Get_User_Details() {
    return new Promise((resolve, reject) => {
      this._userService.Get_User_Details().subscribe({
        next: (User_details_res) => {
          if (User_details_res) {
            if (User_details_res.data) {
              console.log('User_Details', User_details_res.data);
              this._cartservice.User_Add_Cart(User_details_res.data.username)
              sessionStorage.setItem(
                'User_Details',
                JSON.stringify(User_details_res.data)
              );
              this.Showcart();
              resolve(User_details_res);
            }
          }
        },
        error: (User_details_error) => {
          console.log('Getuserdetail_error', User_details_error);
          reject(User_details_error);
        },
      });
    });
  }

  // Validation Form
  @Output() login_logout = new EventEmitter<any>();
  User_Login_Form() {
    this.user_login = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  get get_user_login() {
    return this.user_login.controls;
  }
  Login_Logout_msg: string;
  invalid: string;
  User_Login_Token: any;
  Save_User_Login() {
    if (this.user_login.valid) {
      // console.log("user_login Value",this.user_login.value)
      this._authservice.User_Login(this.user_login.value).subscribe({
        next: (User_Login_res:any) => {
          if (User_Login_res) {
            if (User_Login_res.data) {
              console.log('User_Login_res', User_Login_res);
              this.User_Login_Token = User_Login_res;
              console.log('User_Login_Token', this.User_Login_Token.data.token);
              // localStorage.setItem("User_login_Token",JSON.stringify(this.User_Login_Token.data))
              this.cookieService.set(
                'User_Login_Token',
                this.User_Login_Token.data.token,
                { expires: 1, sameSite: 'Lax' }
              );
              this.Get_User_Details();
              sessionStorage.setItem(
                'Login_User',
                JSON.stringify(this.user_login.value)
              );
              this.toastr.success('Login Successfully');
              this.router.navigate(['/home']);
              // this.Get_Customer_Id()
            }
          }
        },
        error: (Login_error) => {
          console.log('Register_error.status', Login_error.status);
          console.log('Register_error.status', Login_error);
          if (Login_error.status) {
            this.errorMessage = Login_error.error.message;
            // this.errorMessage="Incorrect Password"
            this.toastr.error(Login_error.error.message);
            // this.errorMessage = Login_error.error.error.errors[0].message;
            // console.log('error caught in component',Login_error.error.error.errors[0].message)
          }
        },
      });
    } else {
      this.toastr.error('All Fields Required');
    }
  }
}
