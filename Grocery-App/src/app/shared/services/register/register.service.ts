import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User_Login_Model } from '../../Models/user_login_model';
import { User_Register_Model } from '../../Models/user_register_model';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient,private router:Router) { }
baseUrl=environment.baseUrl
user_register=environment.customers_routes.user_register
user_login=environment.customers_routes.user_login

  // get_Register_data(data:any){
  //   try {
  //     return this.http.post(this.baseurl+this.register,data,{observe:"response"}).subscribe(data=>{
  //       sessionStorage.setItem("Register_User",JSON.stringify(data.body))
  //     this.router.navigate(['/front/user/login'])
  //      })
  //   } catch (error:any) {
  //     return throwError(() => new Error(error))
  //   }

  // }
  User_Login(data:User_Login_Model){
    try {
      // return sessionStorage.setItem("Login_User",JSON.stringify(data))
      return this.http.post<User_Login_Model>(this.baseUrl+this.user_login,data)
    } catch (error:any) {
      return throwError(() => new Error(error))
    }

 }

  Login_Logout_msg=new Subject<string>()
//   Change_btn(data: string){
//     if(data=="Login"){
//       data=""
//             return data;
//  }else{
//   data="Login"
//   return data
//  }
// }

User_Register(data:User_Register_Model){
  try {
    return this.http.post<User_Register_Model>(this.baseUrl+this.user_register,data)
  } catch (error:any) {
    return throwError(() => new Error(error))
  }
}
}
