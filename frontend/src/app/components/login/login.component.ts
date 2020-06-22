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

  public errors: string[];

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  public login() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((resp) => {
        localStorage.setItem('accessToken', resp.token);
        localStorage.setItem('id', resp.user.id);
        this.authService.loggedInUser$.next(resp.user);
        this.router.navigate(['/logged-in']);
      }, (error: HttpErrorResponse) => {this.errors = error.error.message});
  }

  ngOnInit(): void {
  }
}
