import { Injectable } from '@angular/core';
import { User } from '../models/user-model';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  public deleteUser (id: string): Observable<User> {
    return this.http.delete<User>(environment.baseUrl + `user/${id}`).pipe(tap(() => this.fetchUsers()));
  }

  public fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.baseUrl + 'user');
  }

  public fetchUser(id: string): Observable<User> {
    return this.http.get<User>(environment.baseUrl + `user/${id}`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(environment.baseUrl + 'user', user).pipe(tap(() => this.fetchUsers()));
  }

  public updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(environment.baseUrl + `user/${id}`, user);
  }

}
