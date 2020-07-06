import { Component, OnInit } from '@angular/core';
import { Statistic } from 'src/app/models/statistic.model';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private statisticsService: StatisticsService, private router: Router) { }
  
  public barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
          let tooltip = datasetLabel + ': ' + tooltipItem.yLabel + ' nanosec\n';
          return  tooltip;
        }
      }
    }
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [{data: [], label: 'Average runtime: '}];
  public barChartColors: Color[] =[{ backgroundColor: '#00aaef'}];

  public method: string;
  public endpoint: string;
  public statistics: Statistic[];
  public testIDs: String[] = [];

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
      if (stat.length > this.barChartData.length) {
        this.barChartData.push({data: [], label: 'nanosec'});
      }
      for (let k = 0; k < stat.length; k++) {
        this.barChartData[k].data[i] = stat[k].measurement;
      }
    }
  };

  public calcMeasurementAvg() {
    this.barChartData[0].data = [];
    for (let i = 0; i < this.barChartLabels.length; i++) {
      let sum = 0;
      let counter = 0;
      for (let j = 0; j < this.statistics.length; j++) {
        if (this.convertUnixDate(this.statistics[j]) === this.barChartLabels[i]) {
          sum += this.statistics[j].measurement;
          counter++;
        }
      }
      this.barChartData[0].data.push(sum/counter);
    }
  };

  public sortStatistics(statistics: Statistic[]) {
    this.statistics = [];
    this.statistics = statistics.sort((a, b) => 
      a.start_timestamp < b.start_timestamp ? -1 : a.start_timestamp > b.start_timestamp ? 1 : 0)
  }

  public clickChart(event) {
    this.router.navigate([`/test/${this.testIDs[event.active[0]._index]}`])
  }

  public storeTestIDs() {
    this.statistics.forEach(s => {
      if (!this.testIDs.includes(s.simulation_result_id)) {
        this.testIDs.push(s.simulation_result_id);
      }
    })
  }

  public showStatistics() {
    this.statisticsService.fetchStatisticsByEndPointAndMethod(`${this.endpoint}`, `${this.method}`)
    .subscribe((data) => {
      this.sortStatistics(data);
      //this.filterLastTenStatistic(data);
      this.createChartLabels();
      //this.createChartData();
      this.calcMeasurementAvg();
      this.storeTestIDs();
    })
  };

  ngOnInit(): void {
  }

}
