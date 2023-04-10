import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { EncryptionService } from 'src/app/shared/services/encryption/encryption.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private route:Router,private _cartService: CartService,private _userService:UserService,private _encryptionservice:EncryptionService,private toastr:ToastrService){
  this.Radio_Address_Form()
}
  address_user=[]
  
  cartTotal: number;
  data:any
  username:any
  Customer_Id:number
  User_Details:any
      ngOnInit(){ 
        window.scrollTo(0,0)
      this.User_Details=JSON.parse(sessionStorage.getItem('User_Details'))
      this.username=this.User_Details.username
      this.Customer_Id=this.User_Details.id
      console.log("Customer_Id",this.Customer_Id)
      
      this.Get_User_Details()
      
      // this.data=this._cartService.Cartdata
      this.data=JSON.parse(localStorage.getItem('Cart_Data'))
    this.cartTotal = this.data.total_amount;
    // console.log("address_user",this.address_user)
    //   this._cartService.cartTotal$.subscribe(total => {
    //     this.cartTotal = total;
    //   });
      console.log("data",this.data)
      
      
  }

address: any;
Login_User:any
Cancel_Checkout(){
this.route.navigate(['/front/cart/cart'])
}
User_details_Obj:any
User_details_Obj_addresses:any=[]
Get_User_Details(){
  this._userService.Get_User_Details().subscribe({next:(User_details_res)=>{
    if(User_details_res){

      console.log("User_Details",User_details_res.data)
      this.User_details_Obj=User_details_res.data
      this.User_details_Obj_addresses=this.User_details_Obj.addresses
      
      console.log("USER_DEtails",this.User_details_Obj)
      console.log("USER_DEtails",this.User_details_Obj_addresses)
      if(this.User_details_Obj.addresses.length==0){
        this.toastr.error(this.username+","+"Please Add Address")
        setTimeout(() => {
          this.route.navigate(['/front/user/user-profile/addaddress'])
        }, 2500);
        
      } 
      
    }
    },error:(User_details_error)=>{
      console.log("Getuserdetail_error",User_details_error)
  }})
}
Encyption_Data
encryption(id){
  this._encryptionservice.Encryption(id).subscribe({next:(encryption_res)=>{
    if(encryption_res){
      console.log("encryption_res",encryption_res.data)
      this.Encyption_Data=encryption_res.data
      return this.Encyption_Data
    }
  },error:(encryption_error)=>{
    console.log("encryption_error",encryption_error)
  }})
}

payment_status:any="W4YV_pkH7OAkvZO4P1gbzA==";
order_status:any="Nn9l9xhHYQsvNB503C4EAQ==";
delivery_address_id:any
billing_address_id:any
Add_Order_Response_Data:any
Encryptdata:any
// selected:any
selectAdd(addressSelect){
  // selected=true
  console.log("addressSelect",addressSelect)
  this._encryptionservice.Encryption(addressSelect).subscribe({next:(encryption_res)=>{
    if(encryption_res){

      console.log("encryption_res",encryption_res.data)
      this.delivery_address_id=encryption_res.data
      this.billing_address_id=encryption_res.data
      console.log("delivery_address_id",this.delivery_address_id)
      console.log("billing_address_id",this.billing_address_id)
      // return this.Encyption_Data
    }
  },error:(encryption_error)=>{
    console.log("encryption_error",encryption_error)
  }})
  // this.delivery_address_id=this.encryption(addressSelect)
  console.log("billing_address_id",this.Encryptdata)
}

status="2"


Address:any
Radio_Address_Form(){
  this.Address=new FormGroup({
    address_radio:new FormControl('',[Validators.required])
  })
}
get get_Address_Form(){
  return this.Address.controls
}
cart:any
Find_Customer_Cart:any
Showcart(){
  const sampleData = {
    id: this.Customer_Id,
    items: [
    ]
  }
     
      let FindCustomer=this.cart.find((item)=>item.id=== this.Customer_Id)
      // console.log("FindCustomer",FindCustomer)
        if(!FindCustomer){
  // console.log("NOt User")
          
                this._cartService.getItemCount()
                this._cartService.Subtotal()
        
          }
}


  

Place_Order(){
  // this.payment_status=this.encryption(this.status)
  if(this.billing_address_id){


  console.log("order_status",this.order_status)
  console.log("delivery_address_id",this.delivery_address_id)
      console.log("billing_address_id",this.billing_address_id)
  console.log("Add_Order_Response_Data",this.Add_Order_Response_Data)
console.log("payment_status",this.payment_status)
console.log("order_status",this.order_status)
console.log("delivery_address_id",this.delivery_address_id)
    console.log("billing_address_id",this.billing_address_id)
// console.log("Add_Order_Response_Data",this.Add_Order_Response_Data)
  this.Login_User= JSON.parse(sessionStorage.getItem('Login_User'))
if(this.Login_User){
  this._cartService.Add_Order(this.data,this.delivery_address_id,this.billing_address_id,this.payment_status,this.order_status).subscribe({next:(Add_Order_res)=>{
    if(Add_Order_res){

      console.log("Add_address_res",Add_Order_res)
      this.Add_Order_Response_Data=Add_Order_res.data.id
    console.log("Add_Order_Response_Data",this.Add_Order_Response_Data)


    this._encryptionservice.Encryption(JSON.stringify(this.Add_Order_Response_Data)).subscribe({next:(encryption_res)=>{
      if(encryption_res){

        console.log("encryption_res",encryption_res.data)
        this.Add_Order_Response_Data=encryption_res.data
        
        this._cartService.Get_Order_Detail_By_Id(this.Add_Order_Response_Data).subscribe({next:(Get_OrderById_res)=>{
          if(Get_OrderById_res){
            this._cartService.Delete_User_Cart_LocalStorage(this.User_Details.username)
            console.log("Get_OrderById_res",Get_OrderById_res) 

            this.route.navigate(['/front/cart/success'])
          }
        },error:(Get_Order_error)=>{
          console.log("Get_Order_error",Get_Order_error)
          this.toastr.error(Get_Order_error.error.message);
        }})
      }
    },error:(encryption_error)=>{
      console.log("encryption_error",encryption_error)
            this.toastr.error(encryption_error.error.message);
    }})
    }
    },error:(Add_Order_error)=>{
      console.log("Add_Order_error",Add_Order_error)
            this.toastr.error(Add_Order_error.error.message);
    }})
}
}
else{
  this.toastr.error("Please Select Address");
}
}

}
