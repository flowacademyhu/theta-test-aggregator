import {Injectable} from '@angular/core';
import {User, UserRole} from '../models/user.model';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private userService: UserService, private http: HttpClient) {
  }

  public users: User[] = this.userService.fetcUsers();

  public loggedInUser;
  public token;
  public users$;

  public login(email: string, password: string) {
    this.http.post<any>('http://localhost:3000/login', {email: email, password: password})
    .subscribe(data => {
      if (data.status !== 404) {
        this.token = data.token;
        this.loggedInUser = data.user;
      } else {
        console.log("unauthorized");
      }
    });
  }

  public logout() {
    this.loggedInUser = null;
  }

  public authenticate(): User {
    return this.loggedInUser;
  }

  public authenticateAsync(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedInUser);
      }, 100);
    });
  }
}
