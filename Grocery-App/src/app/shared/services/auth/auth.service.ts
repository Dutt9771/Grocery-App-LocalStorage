import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User_Login_Model } from '../../Models/user_login_model';
import { User_Register_Model } from '../../Models/user_register_model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }
baseUrl=environment.baseUrl
user_register=environment.customers_routes.user_register
user_login=environment.customers_routes.user_login

  User_Login(data:User_Login_Model){
    try {
      // return sessionStorage.setItem("Login_User",JSON.stringify(data))
      return this.http.post<User_Login_Model>(this.baseUrl+this.user_login,data)
    } catch (error:any) {
      return throwError(() => new Error(error))
    }

 }


User_Register(data:User_Register_Model){
  try {
    return this.http.post<User_Register_Model>(this.baseUrl+this.user_register,data)
    // .pipe(
    //   catchError(this.handleError)
    // );
  } catch (error:any) {
    return throwError(() => new Error(error))
  }
}
}
