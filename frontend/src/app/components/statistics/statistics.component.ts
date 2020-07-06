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

  public statistics: Statistic[];
  public testIDs: string[] = [];
  public endpoints: string[] = [];
  public filteredEndpoints: Observable<string[]>;
  public endpointInputControl = new FormControl();
  public methodInputControl = new FormControl();

  public convertUnixDate(statistic: Statistic) {
    return new Date(statistic.start_timestamp/1000000).toLocaleString();
  };

  public createChartLabels() {
    this.barChartLabels = [];
    this.statistics.forEach(s => {
      if (!this.barChartLabels.includes(this.convertUnixDate(s))) {
        this.barChartLabels.push(this.convertUnixDate(s));
      }
    })
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
  };

  public storeTestIDs() {
    this.statistics.forEach(s => {
      if (!this.testIDs.includes(s.simulation_result_id)) {
        this.testIDs.push(s.simulation_result_id);
      }
    })
  };

  public clickChart(event) {
    this.router.navigate([`/test/${this.testIDs[event.active[0]._index]}`])
  };

  public storeEndpoints(statistics: Statistic[]) {
    statistics.forEach(s => {
      if (!this.endpoints.includes(s.endpoint)) {
        this.endpoints.push(s.endpoint);
      }
    })
  };

  public showStatistics() {
    this.statisticsService.fetchStatisticsByEndPointAndMethod(`${this.endpointInputControl.value}`, `${this.methodInputControl.value}`)
    .subscribe((data) => {
      this.sortStatistics(data);
      this.createChartLabels();
      this.calcMeasurementAvg();
      this.storeTestIDs();
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
