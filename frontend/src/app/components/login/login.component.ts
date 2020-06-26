import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  public errors: Object;
  public isChecked = false;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  public login() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password, this.isChecked)
      .subscribe(() => {
        this.router.navigate(['index']);
      }, (error: HttpErrorResponse) => {
        this.errors = error;
        console.log(this.errors);
      });
  }

  rememberMe() {
    this.isChecked = !this.isChecked;
  }

  ngOnInit(): void {
  }
}