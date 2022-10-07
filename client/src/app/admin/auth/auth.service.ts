import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap, of, delay } from 'rxjs';
import { SessionPopupComponent } from 'src/app/session-popup/session-popup.component';

interface TokenSession {
  token: string,
  session: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth(): boolean {
    return !!localStorage.getItem('token');
  }

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
    ) { }

  public login(body: {email: 'string', password: 'string'}): Observable<TokenSession>{
    return this.http.post<TokenSession>('http://localhost:5000/api/auth/login', body).pipe(
      tap((res: TokenSession) => localStorage.setItem('token', JSON.stringify(res.token))),
      tap(
        (res: TokenSession) => {
        setTimeout(() => 
          this.dialog.open(SessionPopupComponent, {
            width: '300px'
          }), res.session * 1000);
      }
      )
    );
  }

  public register (body: {email: 'string', password: 'string'}): Observable<any>{
    return this.http.post('http://localhost:5000/api/auth/register', body);
  }

  public logout(): Observable<any>{
    try{
      localStorage.removeItem('token');
    } catch(e) {
    }
    return of({});
  }

  public getToken(): string{
    return JSON.parse(localStorage.getItem('token') as string); 
  }


}
