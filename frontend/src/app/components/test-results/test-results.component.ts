import { Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { Test } from 'src/app/models/test.model';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { FilterParamsModel } from "../../models/filter-params-model";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})

export class TestResultsComponent implements OnInit {

  constructor( private route: ActivatedRoute, private testService: TestService, private changeDetectorRef: ChangeDetectorRef) {
  }

  subscriptions$: Subscription[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public tests$: BehaviorSubject< Test[] > = new BehaviorSubject< Test[] >( null )
  obs: Observable<any>;
  dataSource: MatTableDataSource<Test> = new MatTableDataSource<Test>(null);

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  ngOnInit(): void {
    this.subscriptions$.push(this.testService.fetchTests(null).subscribe((tests) => {
      this.getDataSource(tests);
    }));
  }

  fetchTestsByFilter(filters: FilterParamsModel) {
    this.subscriptions$.push(this.testService.fetchTests(filters).subscribe((tests) => {
      this.getDataSource(tests);
    }));
  }

  getDataSource(tests: any) {
    this.changeDetectorRef.detectChanges();
    this.tests$.next(tests);
     this.dataSource= new MatTableDataSource<Test>(this.tests$.getValue());
     this.dataSource.paginator= this.paginator;
    this.obs = this.dataSource.connect();
  }
}