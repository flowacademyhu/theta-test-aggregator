import { Injectable } from '@angular/core';
import { Statistic } from '../models/statistic.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  public fetchStatisticsByEndPointAndMethod(endpoint: string, method: string): Observable<Statistic[]> {
    return this.http.get<Statistic[]>(environment.baseUrl + `statistic?endpoint=${endpoint}&method=${method}`);
  };

  public fetchStatistics(): Observable<Statistic[]> {
    return this.http.get<Statistic[]>(environment.baseUrl + 'statistic');
  }

}
