import { Injectable } from '@angular/core';
import { User, UserRole } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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
  ]

  public deleteUser (id: string) {
    const index: number = this.users.findIndex(u => u.id === id);
    this.users.splice(index, 1);
  }

  public fetchOtherUsers(id: string): User[] {
    return [...this.users].filter(u => u.id !== id);
  }

  public fetcUsers(): User[] {
    return [...this.users];
  }

}
