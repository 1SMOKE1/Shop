import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notification: MatSnackBar
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(
        (error: HttpErrorResponse) => this.handleError(error) 
      )
    )
  }

  private handleError(error:  HttpErrorResponse): Observable<any>{
    switch(error.status){
      case 409: 
      case 404:
      case 500:
        this.notification.open(error.error, 'X', {duration: 3000})
        break;
      case 401: 
        this.notification.open(error.error, 'X', {duration: 3000})
        this.router.navigate(['/admin/auth'], {
          queryParams: {
            sessionFailed: true
          }
        });
        break;
    }
    return throwError(error)
  }
}