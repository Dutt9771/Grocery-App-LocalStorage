import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EncryptionService } from 'src/app/shared/services/encryption/encryption.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  panelOpenState = false;
  loading = true;
  constructor(
    private _userService: UserService,
    private _encryptionservice: EncryptionService,
    private toastr: ToastrService
  ) {}
  PastOrderArr = [];
  encryption_order_id: any;
  username: any;
  ngOnInit() {
    window.scrollTo(0, 0);
    this._userService.Get_Customer_All_Orders().subscribe({
      next: (User_all_Order_res: any) => {
        if (User_all_Order_res) {
          if (User_all_Order_res.data) {
            console.log('User_all_Order_res', User_all_Order_res.data.orders);
            this.PastOrderArr = User_all_Order_res.data.orders;
            this.username = User_all_Order_res.data.username;
            setTimeout(() => {
              this.loading = false;
            }, 1000);
            // console.log("this.PastOrderArr[0].id",this.PastOrderArr[0].id)
            // this.id=this.PastOrderArr[18].id
            // encryption(id)

            for (let i = 0; i < this.PastOrderArr.length; i++) {
              this.encryption(this.PastOrderArr[i].id);
            }
          }
        }
      },
      error: (User_all_Order_error) => {
        console.log('User_all_Order_error', User_all_Order_error);
      },
    });
    // JSON.stringify(this.Add_Order_Response_Data)
  }

  Open_Panel(id: any) {
    console.log('Clickecd ', id);
  }
  Order_data: any = [];
  filter_Order: any;
  encryption(id: any) {
    this._encryptionservice.Encryption(JSON.stringify(id)).subscribe({
      next: (encryption_res: any) => {
        if (encryption_res) {
          if (encryption_res.data) {
            // console.log("encryption_res",encryption_res.data)
            this.encryption_order_id = encryption_res.data;

            this._userService
              .Get_Order_Detail_By_Id(this.encryption_order_id)
              .subscribe({
                next: (Get_OrderById_res: any) => {
                  if (Get_OrderById_res) {
                    if (Get_OrderById_res.data) {
                      console.log('Get_OrderById_res', Get_OrderById_res.data);
                      this.Order_data.push(Get_OrderById_res.data);
                    }
                  }
                },
                error: (Get_Order_error) => {
                  console.log('Get_Order_error', Get_Order_error);
                  this.toastr.error(Get_Order_error.error.message);
                },
              });
          }
        }
      },
      error: (encryption_error) => {
        console.log('encryption_error', encryption_error);
        this.toastr.error(encryption_error.error.message);
      },
    });
    console.log('Order_data', this.Order_data);
  }
  filterOrder(id) {
    this.filter_Order = this.Order_data.find((item_id) => item_id.id === id);
    console.log('filter_Order', this.filter_Order);
    for (let i = 0; i <= this.PastOrderArr.length; i++) {
      if (this.filter_Order.id == this.PastOrderArr[i].id) {
        this.PastOrderArr[i].push(this.filter_Order.order_items);
      }
    }
    console.log('PasOrderArr', this.PastOrderArr);
  }
}
