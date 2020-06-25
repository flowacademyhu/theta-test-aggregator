import { Injectable } from '@angular/core';
import { Test } from '../models/test.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  tests$: BehaviorSubject<Test[]> = new BehaviorSubject<Test[]>(null);

  public fetchTests(){
    this.http.get<Test[]>(environment.baseUrl + 'simulationResult')
    .subscribe((data) => {
      this.tests$.next(data)
    })
  }

  public fetchTest(id: string): Observable<Test> {
    return this.http.get<Test>(environment.baseUrl + `simulationResult/${id}`);
  }

  public filterByStatus(status: string) {
    this.fetchTests();
     this.tests$.subscribe((data) => {
       this.tests$.next(data.filter(t=>t.status === status))
     })
  }
}