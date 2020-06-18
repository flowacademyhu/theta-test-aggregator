import {Injectable} from '@angular/core';
import {User, UserRole} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() {
  }

  public users: User[] = [
    {
      id: 'user1',
      password: 'user1234',
      email: 'user1@email.com',
      git_user: 'Mate',
      role: UserRole.USER,
      notification: true
    },
    {
      id: 'admin1',
      password: 'admin1234',
      email: 'admin1@email.com',
      git_user: 'Feri',
      role: UserRole.ADMIN,
      notification: false
    },
    {
      id: 'user2',
      password: 'user1234',
      email: 'user2@email.com',
      git_user: 'Imi',
      role: UserRole.USER,
      notification: false
    },
    {
      id: 'admin2',
      password: 'admin1234',
      email: 'admin2@email.com',
      git_user: 'Tamas',
      role: UserRole.ADMIN,
      notification: true
    }
  ];

  private loggedInUser: User;

  public login(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          resolve(true);
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
