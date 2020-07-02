import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private socialAuthService: SocialAuthService) {
  }

  public errors: Object;
  public isChecked = false;
  public user: SocialUser;
  public loggedIn: boolean;

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
    this.socialAuthService.authState.subscribe((user) => {
    this.user = user;
    this.loggedIn = (user != null);
    console.log(this.user.name)
    console.log(this.user.email)
    console.log(this.user)
    });
  }
  

  async signIn(): Promise<void> {
    console.log(this.email);
    const body = {
      email: this.email,
      password: this.password
    };
    const tokenData = await this.authService.getJwt(body);
    if (tokenData.message.token) {
      const getDashboard = await this.authService.login2(tokenData);
      console.log(getDashboard);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
    console.log(tokenData);
  } 

  async signInWithGoogle(): Promise<void> {
    const googleData = await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    const body = {
      email: googleData.email,
      password: googleData.idToken
    };
  }
}