import {Injectable} from '@angular/core';
import {User, UserRole} from '../models/user.model';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response.model';
import { switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private userService: UserService, private http: HttpClient, private router: Router) {
  }
  public loggedInUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  /* public login1(email: string, password: string) {
    this.http.post<any>('http://localhost:3000/login', {email: email, password: password})
    .subscribe(data => {
      if (data.status !== 404) {
        this.token = data.token;
        this.loggedInUser = data.user;
      } else {
        console.log("unauthorized");
      }
    });
  } */

  public login(email: string, password: string) {
    return this.http
    .post<AuthResponse>(environment.baseUrl +  'login', {email: email, password: password});
  }

  public logout() {
    this.loggedInUser$.next(null);
    localStorage.removeItem('accessToken');
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

}
