import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user/user.service';
import { EncryptionService } from 'src/app/shared/services/encryption/encryption.service';

@Component({
  selector: 'app-manageaddress',
  templateUrl: './manageaddress.component.html',
  styleUrls: ['./manageaddress.component.css'],
})
export class ManageaddressComponent {
  showAdd: any = [];
  User_details_Obj_addresses = [];
  constructor(
    private _userService: UserService,
    private _encryptionservice: EncryptionService,
    private route: Router,
    private toastr: ToastrService
  ) {}
  User_details_Obj: any;
  ngOnInit() {
    window.scrollTo(0, 0);
    this.Show_Address();
    this.Get_User_Details();

    // .subscribe({next:(get_User_Address_res)=>{
    //   this.showAdd=get_User_Address_res
    //   console.log("get_User_Address_res",get_User_Address_res)
    // }})
  }
  Get_User_Details() {
    this._userService.Get_User_Details().subscribe({
      next: (User_details_res) => {
        if (User_details_res) {
          if (User_details_res.data) {
            console.log('User_Details', User_details_res.data);
            this.User_details_Obj = User_details_res.data;
            this.User_details_Obj_addresses = this.User_details_Obj.addresses;
          }
        }
      },
      error: (User_details_error) => {
        console.log('Getuserdetail_error', User_details_error);
      },
    });
  }
  LoginData: any;
  filteredUsers: any;
  Show_Address() {
    this.LoginData = JSON.parse(sessionStorage.getItem('Login_User'));
    // this.showAdd=this._edituserService.get_User_addresses()
    // this.showAdd=JSON.parse(localStorage.getItem("User_address"))
    // console.log("showAdd",this.showAdd)
    // Assume the given array is stored in a variable called 'users'

    // const targetUsername = this.LoginData.username

    //   this.filteredUsers = this.showAdd.filter(user => user.username === targetUsername);
    // for(let i=0;i<=filteredUsers.length;i++){

    //   filteredUsers[i].Address

    // }
    // console.log("filteredUsers Address",this.filteredUsers);
  }
  encryption_data: any;
  Delete_Address(i, id) {
    this.encryption(i, JSON.stringify(id));
  }

  Delete_Encryption(encryption: any, i: any) {
    this._userService.Delete_User_Address(encryption).subscribe({
      next: (Edit_address_res) => {
        if (Edit_address_res) {
          console.log('Edit_address_res', Edit_address_res);
          this.User_details_Obj_addresses.splice(i, 1);
          this.toastr.success('Address Successfully Deleted');
        }
      },
      error: (Edit_address_error) => {
        console.error('Edit_address_error', Edit_address_error);
      },
    });
  }

  encryption(i, id) {
    this._encryptionservice.Encryption(id).subscribe({
      next: (encryption_res) => {
        if (encryption_res) {
          if (encryption_res.data) {
            console.log('encryption_res', encryption_res);
            this.encryption_data = encryption_res.data;
            console.log('encryption_data', this.encryption_data);
            this.Delete_Encryption(this.encryption_data, i);
          }
        }
      },
      error: (encryption_error) => {
        console.log('encryption_error', encryption_error);
      },
    });
  }
}
