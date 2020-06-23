import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import { UserService } from './user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private userService: UserService, private http: HttpClient, private router: Router) {
  }

  public loggedInUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  public errors: string[];

  public login(email: string, password: string) {
    return this.http.post<AuthResponse>(environment.baseUrl + 'login', {email: email, password: password})
    .subscribe((resp) => {
      this.loggedInUser$.next(resp.user);
      localStorage.setItem('accessToken', resp.token);
      localStorage.setItem('id', resp.user.id);
      this.router.navigate(['/logged-in']);
    }, (error: HttpErrorResponse) => {
      this.errors = error.error.message;
      console.log(error);
    })
  }

  public logout() {
    this.loggedInUser$.next(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('id');
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

  public getCurrentUser(): BehaviorSubject<User> {
    if (this.loggedInUser$.getValue() === null) {
      this.userService.fetchUser(localStorage.getItem('id')).subscribe((data) => {
        this.loggedInUser$.next(data);
        return this.loggedInUser$;
      })
    }
  return this.loggedInUser$;
  }
}
