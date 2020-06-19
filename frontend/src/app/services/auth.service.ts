import { Injectable } from '@angular/core';
import { User, UserRole } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private userService: UserService) {
  }

  public users: User[] = this.userService.fetcUsers();

  private loggedInUser: User;

  public login(email: string, password: string, isChecked: boolean): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
          console.log('ischecked: ' + isChecked);
          this.loggedInUser = user;
          if (isChecked) {
            localStorage.setItem('user', JSON.stringify(user));
            resolve(true);
          } else {
            localStorage.setItem('user', JSON.stringify(user));
            resolve(true);
          }
        }
        reject(false);
      }, 128);
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
