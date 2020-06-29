import { Injectable } from '@angular/core';
import { ApiKey } from '../models/apiKey-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApikeyService {

  constructor(private http: HttpClient) { }

  public fetchApiKeys(): Observable<ApiKey[]>{
    return this.http.get<ApiKey[]>(environment.baseUrl + 'apiKey');
  }

  public fetchApiKey(id: number): Observable<ApiKey> {
    return this.http.get<ApiKey>(environment.baseUrl + `apiKey/${id}`);
  }

  public addApiKey(apikey: ApiKey): Observable<ApiKey> {
    return this.http.post<ApiKey>(environment.baseUrl + 'apiKey', apikey).pipe(tap(() => this.fetchApiKeys()));
  }

  public updateApiKey(id: number): Observable<ApiKey> {
    return this.http.put<ApiKey>(environment.baseUrl + `apiKey/${id}`, {});
  }

  public deleteApiKey(id: number): Observable<ApiKey> {
    return this.http.delete<ApiKey>(environment.baseUrl + `apiKey/${id}`).pipe(tap(() => this.fetchApiKeys()));
  }
}