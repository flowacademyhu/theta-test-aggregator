import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomFilterService {

  constructor(private http: HttpClient) { }

  public fetchCustomFilters(): Observable<Array<any>> {
    return this.http.get<Array<any>>(environment.baseUrl + 'customFilter');
  }
}
