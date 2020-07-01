import { Component, OnInit, OnChanges } from '@angular/core';
import { Statistic } from 'src/app/models/statistic.model';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { TypeScriptEmitter } from '@angular/compiler';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private statisticsService: StatisticsService) { }
  
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    {data: [], label: 'Runtime in nanosec'}
  ]

  public statistics: Statistic[];

  public method: string;
  public endpoint: string;

  public showStatistics() {
    this.barChartLabels = [];
    this.barChartData[0].data = [];
    this.statistics = this.statisticsService.fetchStatistics(this.endpoint, this.method)
    .sort((a, b) => a.timeStamp < b.timeStamp ? -1 : a.timeStamp > b.timeStamp ? 1 : 0);
    for(let i = 0; i < this.statistics.length; i++) {
      this.barChartLabels.push(new Date(this.statistics[i].timeStamp/1000000).toLocaleString());
      console.log(this.barChartLabels);
      this.barChartData[0].data.push(this.statistics[i].measurement);
      console.log(this.barChartData[0].data)
    }
  }

  ngOnInit(): void {
    this.statistics = this.statisticsService.fetchStatistics("api/transaction/brpld145t7lvfjg4oomg/refund", "PUT")
    .sort((a, b) => a.timeStamp < b.timeStamp ? -1 : a.timeStamp > b.timeStamp ? 1 : 0);
    for(let i = 0; i < this.statistics.length; i++) {
      this.barChartLabels.push(new Date(this.statistics[i].timeStamp/1000000).toLocaleString());
      console.log(this.barChartLabels);
      this.barChartData[0].data.push(this.statistics[i].measurement);
      console.log(this.barChartData[0].data)
    }
  }

}
