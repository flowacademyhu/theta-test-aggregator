import { Component, OnInit, ViewChild } from '@angular/core';
import { Test } from 'src/app/models/test.model';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { FilterParamsModel } from "../../models/filter-params-model";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FiltersComponent } from "../filters/filters.component";

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})

export class TestResultsComponent implements OnInit {

  constructor( private route: ActivatedRoute, private testService: TestService) {
  }

  subscriptions$: Subscription[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(FiltersComponent) filter: FiltersComponent;
  public tests$: BehaviorSubject< Test[] > = new BehaviorSubject< Test[] >( null )
  obs: Observable<Test[]>;
  dataSource: MatTableDataSource<Test> = new MatTableDataSource<Test>(null);
  public count: number;
  private currentFilters: FilterParamsModel;

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  ngOnInit(): void {
    this.currentFilters = {};
    this.fetchTests({ limit: 5, offset: 0 });
  }

  fetchTests(filters: FilterParamsModel) {
    this.subscriptions$.push(this.testService.fetchTests(filters).subscribe((data) => {
      this.count = data.count;
      this.getDataSource(data.results);
    }));
  }

  onSearch(filters: FilterParamsModel) {
    this.currentFilters = filters;
    filters.limit = this.getLimit();
    filters.offset = 0;
    this.paginator.firstPage();
    this.fetchTests(filters);
  }

  getDataSource(tests: Test[]) {
    this.tests$.next(tests);
    this.dataSource= new MatTableDataSource<Test>(this.tests$.getValue());
    this.obs = this.dataSource.connect();
  }

  getLimit(): number {
    return this.paginator.pageSize;
  }

  getOffset(): number {
    return this.paginator.pageSize * this.paginator.pageIndex;
  }

  pageEvent() {
    const filters = this.currentFilters;
    filters.limit = this.getLimit();
    filters.offset = this.getOffset();
    this.fetchTests(filters);
    window.scroll(0, 0);
  }
}
