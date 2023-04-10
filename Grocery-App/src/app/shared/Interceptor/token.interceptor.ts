import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  
    constructor(private cookieService: CookieService) {}
  
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const token = this.cookieService.get('User_Login_Token');
      // console.log("token",token)
      // const token = localStorage.getItem('User_login_Token');
      if (token) {
        request = request.clone({
          setHeaders: {
            token: token
          },
        });
      }
      // console.log("request",request);
  
  
      return next.handle(request);
  
  
    }
  }
