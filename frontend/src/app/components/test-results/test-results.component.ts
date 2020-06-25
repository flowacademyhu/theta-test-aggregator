import { Component, OnInit, DoCheck, OnDestroy, ViewChild, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { TestService } from '../../services/test.service';
import { Test } from 'src/app/models/test.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit {

  constructor(private changeDetectorRef: ChangeDetectorRef, private testService: TestService, private dialog: MatDialog,  private router: Router) {
  }

  public tests: Test[];
  subscriptions$: Subscription[] = [];

  pageEvent: PageEvent;

  pickedDate: Date;

  searchFor() {
    console.log(this.pickedDate.toString());
    };

  ngDoCheck(): void {
    this.testService.tests$.subscribe((data)=> {
      this.tests = data
    })
  }
  
  ngOnChanges(): void {
    this.testService.tests$.subscribe((data) => {
      this.tests = data
    })
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  testResult(test) {
    console.log(this.tests.find(t => t.id === test.id).id);
    this.router.navigate(['test/:id']);
    localStorage.setItem('testID', this.tests.find(t => t.id === test.id).id);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Test> = new MatTableDataSource<Test>(this.testService.tests$.getValue());


  ngOnInit(): void {
    this.testService.fetchTests();
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    console.log()
    this.subscriptions$.push(this.testService.tests$.subscribe(tests => {
      this.tests = tests;
    }));
    console.log(this.testService.tests$.getValue()[0].triggered_by)
    console.log(this.tests)
  }

  filterByStatus(status: string) {
    this.testService.filterByStatus(status)
    console.log(status);
    this.tests=this.testService.tests$.getValue();
    console.log(this.tests)
    }
  
    removeFilter() {
      this.testService.fetchTests();
    }
  }