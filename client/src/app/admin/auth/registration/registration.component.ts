import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { categoryI } from 'src/interfaces/categoryI';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { confirmationPasswordValidator } from './password-confirmation.validator';
import { mergeMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ps-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'confirmPassword': new FormControl('', Validators.required)
  },{
    validators: confirmationPasswordValidator
  });
  typesOfProducts: categoryI[] = [];
  hide: boolean = true;
  confirmHide: boolean = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: MatSnackBar
    ) {
    
   }

  ngOnInit(): void {
    
  }

  complite(): void{
    const { email, password } = this.registrationForm.value;

    this.authService
      .register({ email, password})
      .pipe(
        mergeMap(() => this.authService.login({email, password}))
      )
      .subscribe(
        (res) => this.router.navigate(['/admin/main/products']),
        (err) => this.notification.open(err.error, 'X', {duration: 3000})
        );
  }
}
