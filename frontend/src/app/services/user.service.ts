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

  public deleteUser (id: string) {
    return this.http.delete(environment.baseUrl + `user/${id}`).pipe(tap(() => this.fetchUsers()));
  }

  public fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.baseUrl + 'user');
  }

  public fetchUser(id: string): Observable<User> {
    return this.http.get<User>(environment.baseUrl + `user/${id}`);
  }

  public addUser(user) {
    return this.http.post(environment.baseUrl + 'user', user)
    .pipe(
      tap(
        () => this.fetchUsers()
      )
    )
  }

  public updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(environment.baseUrl + `user/${id}`, user);
  }

  get users(): Observable<User[]> {
    return this.users$;
  }
}
