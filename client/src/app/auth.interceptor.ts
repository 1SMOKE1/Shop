import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable} from 'rxjs';

import { AuthService } from './admin/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = JSON.parse(localStorage.getItem('token') as string);
    if(userToken){
      req = req.clone({
        setHeaders: {
          Authorization: `${this.auth.getToken()}`
        }
      })
    }
    return next.handle(req)
  }
}