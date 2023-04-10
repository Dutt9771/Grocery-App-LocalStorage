import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profilenav',
  templateUrl: './profilenav.component.html',
  styleUrls: ['./profilenav.component.css'],
})
export class ProfilenavComponent {
  Login_User: any;
  Title: string = 'Edit Profile';
  Register_User: any;
  currentPath: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {
    // this.currentPath = this.router.url;
    this.CheckPath();
  }

  CheckPath() {
    this.router.events.subscribe((res: any) => {
      if (res.url) {
        // console.log('Res URL', res.url);
        this.currentPath = res.url;
        if (this.currentPath == '/front/user/user-profile/manageaddress') {
          this.Title = 'Manage Address';
        } else if (this.currentPath == '/front/user/user-profile/orders') {
          this.Title = 'Orders';
        } else if (
          this.currentPath == '/front/user/user-profile/changepassword'
        ) {
          this.Title = 'Change Password';
        } else if (this.currentPath == '/front/user/user-profile/addaddress') {
          this.Title = 'Add Address';
        } else {
          this.Title = 'Edit Profile';
        }
      }
    });
  }
  ngOnInit() {
    window.scrollTo(0, 0);

    this.Login_User = JSON.parse(sessionStorage.getItem('Login_User'));
    this.Register_User = JSON.parse(sessionStorage.getItem('Register_User'));
  }
  logout() {
    if (this.Login_User) {
      sessionStorage.removeItem('User');
      sessionStorage.removeItem('Login_User');
      sessionStorage.removeItem('Register_User');
      sessionStorage.removeItem('User_Details');

      // localStorage.removeItem('User_login_Token')
      this.cookieService.delete('User_Login_Token');
      this.router.navigate(['front/user/login']);
      // console.log(this.email)
      this.toastr.success('Logout Successfully');
    }
  }
}
