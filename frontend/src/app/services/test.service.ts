import { Injectable } from '@angular/core';
import { Test } from '../models/test.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http'
import { FilterParamsModel } from '../models/filter-params-model';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  public fetchTests(requestParams: FilterParamsModel): Observable<Test[]> {
    let params = new HttpParams();

    if (requestParams !== null) {
      Object.keys(requestParams).forEach(key => {
        const value = requestParams[key];
        if (value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }
    return this.http.get<Test[]>(environment.baseUrl + 'simulationResult', {
      params: params
    });
  }

  public fetchTest(id: string): Observable<Test> {
    return this.http.get<Test>(environment.baseUrl + `simulationResult/${id}`);
  }
}
