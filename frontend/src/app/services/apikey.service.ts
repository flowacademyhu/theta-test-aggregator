import { Injectable } from '@angular/core';
import { ApiKey } from '../models/apiKey-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public addApiKey(infinite: string): Observable<ApiKey> {
    return this.http.post<ApiKey>(environment.baseUrl + 'apiKey', {
      params: {
        infinite: `${infinite}`
      }
    }).pipe(tap(() => this.fetchApiKeys()));
  }

  public updateApiKey(id: number): Observable<ApiKey> {
    // const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<ApiKey>(environment.baseUrl + `apiKey/${id}`, {});
  }

  public deleteApiKey(id: number): Observable<ApiKey> {
    return this.http.delete<ApiKey>(environment.baseUrl + `apiKey/${id}`).pipe(tap(() => this.fetchApiKeys()));
  }
}
