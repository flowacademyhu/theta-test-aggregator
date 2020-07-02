import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { environment } from 'src/environments/environment';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private userService: UserService, private http: HttpClient, private router: Router) {
  }

  private loggedInUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  public getCurrentUser(): BehaviorSubject<User> {
    if (this.loggedInUser$.getValue() === null) {
      this.userService.fetchUser(localStorage.getItem('id')).subscribe((data) => {
        this.loggedInUser$.next(data);
        return this.loggedInUser$;
      });
    }
    return this.loggedInUser$;
  }

  public login(email: string, password: string, isChecked: boolean) {
    return this.http.post<AuthResponse>(environment.baseUrl + 'login', { email: email, password: password })
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

  loginWithGoogle(token: string) : void {
    this.http.post<AuthResponse>(environment.baseUrl + 'login',{token: token}
    ).subscribe(
      onSuccess => {
      //login was successful
      localStorage.setItem('accessToken', token); 
    }, onFail => {
      console.log("login was unsuccessful")
      localStorage.setItem('accessToken', token); 
      //show an error message
    });
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
