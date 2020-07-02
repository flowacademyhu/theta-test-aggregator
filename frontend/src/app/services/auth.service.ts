import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';
import { SocialAuthService } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private userService: UserService, private http: HttpClient, private router: Router, private socialAuthService: SocialAuthService) {
  }

  public loggedInUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  public getCurrentUser(): BehaviorSubject<User> {
    if (this.loggedInUser$.getValue() === null) {
      this.userService.fetchUser('profile').subscribe((data) => {
        this.loggedInUser$.next(data);
        return this.loggedInUser$;
      });
    }
    return this.loggedInUser$;
  }

  public login(email: string, password: string, isChecked: boolean) {
    return this.http.post<AuthResponse>(environment.baseUrl + 'login', { email, password })
      .pipe(
        switchMap((resp) => {
          localStorage.clear();
          sessionStorage.clear();
          if (isChecked) {
            localStorage.setItem('accessToken', resp.token);
            localStorage.setItem('id', resp.user.id);
          } else {
            sessionStorage.setItem('accessToken', resp.token);
            sessionStorage.setItem('id', resp.user.id);
          }
          this.loggedInUser$.next(resp.user);
          return this.getCurrentUser();
        })
      );
  }

  public logout() {
    this.loggedInUser$.next(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('id');
    sessionStorage.clear();
    this.router.navigate(['login']);
    this.socialAuthService.signOut();
  }

  public authenticate(): User {
    return this.loggedInUser$.getValue();
  }

  public authenticateAsync(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedInUser$.getValue());
      }, 100);
    });
  }

  loginWithGoogle(token: string, isChecked: boolean) {
    return this.http.post<AuthResponse>(environment.baseUrl + 'login/google', {token})
    .pipe(
      switchMap((resp) => {
        localStorage.clear();
        sessionStorage.clear();
        if (isChecked) {
          localStorage.setItem('accessToken', resp.token);
          localStorage.setItem('id', resp.user.id)
        } else {
          sessionStorage.setItem('accessToken', resp.token);
          sessionStorage.setItem('id', resp.user.id)
        }
        this.loggedInUser$.next(resp.user)
        return this.getCurrentUser();
      })
    )
  }
  
  googleLogin(token) {
    console.log('IN login ==> ' + JSON.stringify(token));
    return fetch(`${environment.baseUrl}/dashboard`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer + ${token}`,
        'Content-Type': 'application/json'
      },
    }).then((response) => response.json());
  }

  getJwt(info) {
    console.log('IN services ==> ' + JSON.stringify(info));
    return fetch(`${environment.baseUrl}/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: 'Bearer 123',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    }).then((response) => response.json());
  } 
}
