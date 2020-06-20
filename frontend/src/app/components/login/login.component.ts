import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }

  public errors: string[];

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  public login() {
    console.log("Hello")
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((resp) => {
        console.log(resp.token);
        localStorage.setItem('accessToken', resp.token);
        this.authService.loggedInUser$.next(resp.user);
        this.router.navigate(['/logged-in']);
      },
      (error: HttpErrorResponse) => {
        this.errors = error.error.message;
        console.log(this.errors)
      });
  }

  ngOnInit(): void {
  }
}
