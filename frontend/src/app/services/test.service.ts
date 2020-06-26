import { Injectable } from '@angular/core';
import { Test } from '../models/test.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  public fetchTests(){
    return this.http.get<Test[]>(environment.baseUrl + 'simulationResult')
  }

  public fetchTest(id: string): Observable<Test> {
    return this.http.get<Test>(environment.baseUrl + `simulationResult/${id}`);
  }
}