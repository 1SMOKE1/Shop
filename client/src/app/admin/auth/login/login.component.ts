import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { categoryI } from 'src/interfaces/categoryI';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ps-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  })
  typesOfProducts: categoryI[] = [];
  hide: boolean = true;
  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    
   }

  ngOnInit(): void {
    
  }

  complite(): void{
    this.authService
      .login(this.loginForm.value)
      .subscribe(() => this.router.navigate(['/admin/main/products']))
  }

}
