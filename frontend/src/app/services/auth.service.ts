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

  private loggedInUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

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
        this.loginLogic(isChecked, resp);
        localStorage.setItem('signedInViaGoogle', "false");
        return this.loggedInUser$;
      })
    );
  }

  public logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('id');
    localStorage.removeItem('signedInViaGoogle');
    sessionStorage.clear();
    if (localStorage.getItem('signedInViaGoogle') === "true") {
      this.socialAuthService.signOut();
    }
    this.loggedInUser$.next(null);
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

  loginWithGoogle(token: string,  isChecked: boolean) {
    return this.http.post<AuthResponse>(environment.baseUrl + 'login/google', {token})
    .pipe(
      switchMap((resp) => {
        this.loginLogic(isChecked, resp);
        localStorage.setItem('signedInViaGoogle', "true")
        return this.loggedInUser$;
      })
    );
  }

  loginLogic(isChecked: boolean, resp: AuthResponse) {
    localStorage.clear();
    sessionStorage.clear();
    if (isChecked) {
      localStorage.setItem('accessToken', resp.token);
    } else {
      sessionStorage.setItem('accessToken', resp.token);
    }
    sessionStorage.setItem('id', resp.user.id)
     this.loggedInUser$.next(resp.user)
  }
}
