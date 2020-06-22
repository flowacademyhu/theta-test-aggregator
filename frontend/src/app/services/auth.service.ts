import {Injectable} from '@angular/core';
import {User, UserRole} from '../models/user.model';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/auth-response.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private userService: UserService, private http: HttpClient, private router: Router) {
  }

  public users: User[] = this.userService.fetcUsers();

  public loggedInUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  public login(email: string, password: string) {
    return this.http
    .post<AuthResponse>(environment.baseUrl + 'login', {email: email, password: password});
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

  getCurrentUser(): BehaviorSubject<User>{
    if(this.loggedInUser$.getValue() === null) {
       this.userService.fetchUser(localStorage.getItem('id'))
      .subscribe((data) => {
        this.loggedInUser$.next(data);
        return this.loggedInUser$;
      })
    }
    return this.loggedInUser$;
  }

}
