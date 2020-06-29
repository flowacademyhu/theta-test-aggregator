import { Component, OnInit, OnChanges } from '@angular/core';
import { Statistic } from 'src/app/models/statistic.model';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private statisticsService: StatisticsService) { }
  
  public statistics: Statistic[];

  public myData = [];
  public chartColumns: String[] = ['Timestamp', 'Measurements (ms)'];
  public height: number = 400;
  public width: number = 550;
  public method: string;
  public endpoint: string;
  public stats = [];

  public logStatistics() {
    console.log(this.statistics);
    console.log(this.myData);
  }

  public showStatistics() {
    console.log(this.endpoint, this.method);
    this.statistics = this.statisticsService.fetchStatistics(this.endpoint, this.method)
    .sort((a, b) => a.timeStamp < b.timeStamp ? -1 : a.timeStamp > b.timeStamp ? 1 : 0);
    this.myData = [];
    for(let i = 0; i < this.statistics.length; i++) {
      this.myData.push([new Date(this.statistics[i].timeStamp/1000000).toLocaleString(), this.statistics[i].measurement]);
    }
    console.log(this.myData);
  }

  ngOnInit(): void {
    this.statistics = this.statisticsService.fetchStatistics("api/transaction/brpld145t7lvfjg4oomg/refund", "PUT")
    .sort((a, b) => a.timeStamp < b.timeStamp ? -1 : a.timeStamp > b.timeStamp ? 1 : 0);
    for(let i = 0; i < this.statistics.length; i++) {
      this.myData.push([new Date(this.statistics[i].timeStamp/1000000).toLocaleString(), this.statistics[i].measurement]);
    }

    for (let i = 0; i < Object.values(this.statisticsService.simulation).length; i++) {
      for (let j = 0; j < Object.values(this.statisticsService.simulation)[i].length; j++) {
        if (Object.values(this.statisticsService.simulation)[i][j].measurement !== '') {
          const string = Object.values(this.statisticsService.simulation)[i][j].endpoint.split(" ");
          const method = string[0];
          const string2 = string[1].split("/api")
          const endpoint = "/api" + string2[1];
          const measurement = parseFloat(Object.values(this.statisticsService.simulation)[i][j].measurement.slice(0, -2));
          const stat = {
            method: method,
            endpoint: endpoint,
            measurement: measurement
          }
          this.stats.push(stat);
        }
      }
    }
    //console.log(Object.values(this.statisticsService.simulation)[0][0].endpoint)
    console.log(this.stats);
    console.log(Object.values(this.statisticsService.simulation)[0].length)
  }

}
