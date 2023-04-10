import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart/cart.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  Customer_Id:number
  User_Details:any
  constructor(private route:Router,private _cartservice:CartService){
    this.User_Details=JSON.parse(sessionStorage.getItem('User_Details'))
    this.Customer_Id=this.User_Details.id
    console.log("Customer_Id",this.Customer_Id)
  }
     ngOnInit(){ window.scrollTo(0,0)
      this._cartservice.Delete_User_Cart_LocalStorage(this.User_Details.username)

      this._cartservice.getItemCount()
      this._cartservice.Subtotal()
      setTimeout(()=>{
      this._cartservice.getItemCount()
      this._cartservice.Subtotal()
      this.route.navigate(['/home'])
    },6000);
  }
}
