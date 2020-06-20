import { Injectable } from '@angular/core';
import { User, UserRole } from '../models/user-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  public headers: Headers;
  public usersArray: User[] = [
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

  public deleteUser (id: string): Observable<User> {
    return this.http.delete<User>(environment.baseUrl + `user/${id}`)
    .pipe(
      tap(
        () => this.fetchUsers()
      )
    )
  }

  public fetchOtherUsers(id: string) {
    this.http.get<Array<User>>(environment.baseUrl + 'user');
  }

  public fetchUsers = async () => {
    await this.http.get<Array<User>>(environment.baseUrl + 'user')
    .subscribe((users) => {
      this.users$.next(users);
    },
    (error) => {
      console.log(error);
    });
  }

  get users(): Observable<User[]> {
    return this.users$;
  }
}
