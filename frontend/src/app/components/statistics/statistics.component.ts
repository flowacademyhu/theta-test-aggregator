import { Component, OnInit, OnChanges } from '@angular/core';
import { Statistic } from 'src/app/models/statistic.model';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

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
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [{data: []}];
  public barChartResponsive = true;

  public method: string;
  public endpoint: string;
  public statistics: Statistic[];

  public convertUnixDate(statistic: Statistic) {
    return new Date(statistic.start_timestamp/1000000).toLocaleString();
  };

  public filterLastTenStatistic(statistics: Statistic[]) {
    if (statistics.length > 10) {
      this.statistics = statistics.sort((a, b) => 
      a.start_timestamp < b.start_timestamp ? -1 : a.start_timestamp > b.start_timestamp ? 1 : 0)
      .slice(Math.max(statistics.length - 10, 1));
    } else {
      this.statistics = statistics.sort((a, b) => 
      a.start_timestamp < b.start_timestamp ? -1 : a.start_timestamp > b.start_timestamp ? 1 : 0);
    }
  };

  public createChartLabels() {
    this.barChartLabels = [];
    this.statistics.forEach(s => {
      if (!this.barChartLabels.includes(this.convertUnixDate(s))) {
        this.barChartLabels.push(this.convertUnixDate(s));
      }
    })
  };

  public createChartData() {
    this.barChartData = [];
    for (let i = 0; i < this.barChartLabels.length; i++) {
      const stat = this.statistics
      .filter(s => this.convertUnixDate(s) === this.barChartLabels[i]);
      while (stat.length > this.barChartData.length) {
        this.barChartData.push({data: [], label: 'nanosec'});
      }
      for (let k = 0; k < stat.length; k++) {
        this.barChartData[k].data[i] = stat[k].measurement;
      }
    }
  };

  public showStatistics() {
    this.statisticsService.fetchStatisticsByEndPointAndMethod(`${this.endpoint}`, `${this.method}`)
    .subscribe((data) => {
      this.filterLastTenStatistic(data);
      this.createChartLabels();
      this.createChartData();
    })
  }

  ngOnInit(): void {
  }

}
