import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }
  
  public errors;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  public login() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(() => {
        this.router.navigate(['logged-in']);
      }, (error: HttpErrorResponse) => {
        this.errors = error;
        console.log(this.errors);
      })
  }

  ngOnInit(): void {
  }
}
