import { Component, OnInit } from '@angular/core';
import { Statistic } from 'src/app/models/statistic.model';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

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
          return  `${datasetLabel}: ${tooltipItem.yLabel} nanosec`;
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

  public testIDs: string[] = [];
  public endpoints: string[] = [];
  public filteredEndpoints: Observable<string[]>;
  public endpointInputControl = new FormControl();
  public methodInputControl = new FormControl();

  private convertUnixDate(statistic: Statistic) {
    return new Date(statistic.start_timestamp/1000000).toLocaleString();
  };

  private createChartLabels(statistics: Statistic[]) {
    this.barChartLabels = [];
    statistics.forEach(s => {
      const date = this.convertUnixDate(s);
      if (!this.barChartLabels.includes(date)) {
        this.barChartLabels.push(date);
      }
    })
  };

  private calcMeasurementAvg(statistics: Statistic[]) {
    this.barChartData[0].data = [];
    this.barChartLabels.forEach(l => {
      const filteredStats = statistics.filter(s => this.convertUnixDate(s) === l);
      const sum = filteredStats.reduce((a, b) => a + b.measurement, 0);
      this.barChartData[0].data.push(sum / filteredStats.length);
    })
  }

  private sortStatistics(statistics: Statistic[]) {
    return statistics.sort((a, b) => 
      a.start_timestamp < b.start_timestamp ? -1 : a.start_timestamp > b.start_timestamp ? 1 : 0)
  };

  private storeTestIDs(statistics: Statistic[]) {
    this.testIDs = statistics.map(s => { return s.simulation_result_id })
    .reduce((unique, s) => unique.includes(s) ? unique : [...unique, s], []);
  }

  public clickChart(event) {
    this.router.navigate([`/test/${this.testIDs[event.active[0]._index]}`])
  };

  private storeEndpoints(statistics: Statistic[]) {
    statistics.forEach(s => {
      if (!this.endpoints.includes(s.endpoint)) {
        this.endpoints.push(s.endpoint);
      }
    })
  };

  public showStatistics() {
    this.statisticsService.fetchStatisticsByEndPointAndMethod(`${this.endpointInputControl.value}`, `${this.methodInputControl.value}`)
    .subscribe((data) => {
      const statistics = this.sortStatistics(data);
      this.createChartLabels(statistics);
      this.calcMeasurementAvg(statistics);
      this.storeTestIDs(statistics);
    })
  };

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.endpoints.filter(endpoint => endpoint.toLowerCase().indexOf(filterValue) === 0);
  };

  ngOnInit(): void {
    this.statisticsService.fetchStatistics().subscribe((data) => {
      this.storeEndpoints(data);
      this.filteredEndpoints = this.endpointInputControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filter(value))
      )
    })
  }

}
