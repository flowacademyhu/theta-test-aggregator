import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/models/test.model';
import { FilterParamsModel } from 'src/app/models/filter-params-model';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})

export class TestResultsComponent implements OnInit {

  constructor( private route: ActivatedRoute, private testService: TestService) {
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Test>();

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }

  public tests$: BehaviorSubject< Test[] > = new BehaviorSubject< Test[] >( null )
  subscriptions$: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions$.push(this.testService.fetchTests(null).subscribe((tests) => {
      this.tests$.next(tests);
      this.dataSource.data=this.tests$.getValue()
    }));
  }

  fetchTestsByFilter(filters: FilterParamsModel) {
    this.subscriptions$.push(this.testService.fetchTests(filters).subscribe((tests) => {
      this.tests$.next(tests);
    }));
  }
}