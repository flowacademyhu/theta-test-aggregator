import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomFilter } from '../models/custom-filter.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomFilterService {

  constructor(private http: HttpClient) { }

  public fetchCustomFilters(): Observable<CustomFilter[]> {
    return this.http.get<CustomFilter[]>(environment.baseUrl + 'customFilter');
  }

  public addCustomFilter(customFilter: CustomFilter): Observable<CustomFilter> {
    return this.http.post<CustomFilter>(environment.baseUrl + 'customFilter', customFilter).pipe(tap(() => this.fetchCustomFilters()));
  }
}
