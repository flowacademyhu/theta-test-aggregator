import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
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
          this.loggedInUser = user;
          if (isChecked) {
            localStorage.setItem('accessToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1OTMwMDEwNzQsImV4cCI6MTYyNDUzNzA3NCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.Z086LSrCVTuPvs3Ttjkiyt9NAMLPuD6xM1SHE2pkOZk');
            resolve(true);
          } else {
            sessionStorage.setItem('accessToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1OTMwMDEwNzQsImV4cCI6MTYyNDUzNzA3NCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.Z086LSrCVTuPvs3Ttjkiyt9NAMLPuD6xM1SHE2pkOZk');
            resolve(true);
          }
        }
        reject(false);
      }, 128);
    });
  }

  public isLoggedIn() {
    if (localStorage.getItem('user') || sessionStorage.getItem('user')) {
      console.log('van storageban user');
      return true;
    } else {
      console.log('nincs storageban user');
      return false;
    }
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
