import { Injectable } from '@angular/core';
import { User, UserRole } from '../models/user-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

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

  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);

  
  public deleteUser (id: string) {
    const index: number = this.users.findIndex(u => u.id === id);
    this.users.splice(index, 1);
    this.users$.next([...this.users]);
  }

  public fetchOtherUsers(id: string): User[] {
    return [...this.users].filter(u => u.id !== id);
  }

  public fetcUsers(): User[] {
    return [...this.users];
  }

  public fetchUser(id: string): Observable<User> {
    return this.http.get<User>(environment.baseUrl + `user/${id}`);
  }

  public addUser(user: User) {
    this.users.push(user);
    this.users$.next([...this.users]);
  }

  public updateUser(id: string, user: User) {
    const index = this.users.findIndex(u => u.id === id);
    this.users[index] = user;
    this.users$.next([...this.users]);
  }

}
