import { Component, OnInit } from '@angular/core';

enum AuthMode {
  LOGIN = 'login',
  REGISTER = 'register'
}

@Component({
  selector: 'ps-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public mode: AuthMode = AuthMode.LOGIN;
  constructor() { }

  ngOnInit(): void {
  }

  get isLoginMode(): boolean{
    return this.mode === AuthMode.LOGIN;
  }

  get isRegisterMode(): boolean{
    return this.mode === AuthMode.REGISTER;
  }

  public toLoginMode(): void{
    this.mode = AuthMode.LOGIN
  }

  public toRegisterMode(): void{
    this.mode = AuthMode.REGISTER;
  }

}
