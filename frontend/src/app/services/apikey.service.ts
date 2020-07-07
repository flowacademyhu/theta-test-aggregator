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

  public addApiKey(infinite: string): Observable<string> {
    return this.http.post<string>(environment.baseUrl + 'apikey', {} , { params:
    {
      infinite: `${infinite}`
    }
    });
  }

  public updateApiKey(apikey: ApiKey): Observable<string> {
    const httpOptions: object = {responseType: 'text'};
    return this.http.put<string>(environment.baseUrl + `apiKey/${apikey.id}`, apikey, httpOptions);
  }

  public deleteApiKey(id: number): Observable<ApiKey> {
    return this.http.delete<ApiKey>(environment.baseUrl + `apiKey/${id}`).pipe(tap(() => this.fetchApiKeys()));
  }
}
