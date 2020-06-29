import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/models/test.model';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})

export class TestResultsComponent implements OnInit {


  constructor( private route: ActivatedRoute, private authService: AuthService, private testService: TestService) {
  }
  public tests: Test[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Test>(this.tests);
  public user;

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  subscriptions$: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.tests=data.tests;
      this.dataSource.data=this.tests;
      console.log(this.dataSource)
    });
    this.authService.getCurrentUser().subscribe((data) => {this.user = data});
    this.dataSource.paginator=this.paginator;
    console.log(this.tests)
    console.log(this.dataSource)
  }
}