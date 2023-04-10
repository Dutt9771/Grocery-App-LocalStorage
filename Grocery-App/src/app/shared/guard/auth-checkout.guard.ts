import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckoutGuard implements CanActivate {
  Find_Customer_Cart:any
  Customer_Cart:any=[]
  Customer_Id:number
  User_Details:any
  cartLength:number
  cartc:any
  constructor(private _cartService:CartService,private toastr:ToastrService,private route:Router){
    // this.route.events.subscribe((Res:any)=>{
    //   if(Res.url){
    //     this.Check_User_cart()
    //   }
    // })
    
  }
// Check_User_cart(){
//   this.User_Details=JSON.parse(sessionStorage.getItem('User_Details'))
//     this.Customer_Id=this.User_Details.id
//     console.log("Customer_Id",this.Customer_Id)
//     this._cartService.ShowCart().subscribe((res)=>{
//       this.cartc=res
//       // console.log("cartc",this.cartc.length)
//       // this.cartcount.next(this.cartc.length);
//       // console.log("cartcount",this.cartcount)
//       this.Find_Customer_Cart=this.cartc.find((item)=>item.id=== this.Customer_Id)
//       console.log("Find_Customer_Cart",this.Find_Customer_Cart)
//       this.Customer_Cart=this.Find_Customer_Cart.items
//       console.log("Customer_Cart",this.Customer_Cart)
//       this.cartLength = this.Customer_Cart.length;
//     })
// }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    if(this.cartLength){
      return true;
    }else{
      this.toastr.error(this.User_Details.username+","+'Please Add Product in Cart');
      this.route.navigate(['/home'])
      return false;
    }
  } 
}
