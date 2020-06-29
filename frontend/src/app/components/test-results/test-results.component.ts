import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Test } from 'src/app/models/test.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TestsResolver } from 'src/app/resolvers/tests.resolver';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})

export class TestResultsComponent implements OnInit, AfterViewInit {


  constructor( private route: ActivatedRoute, private authService: AuthService, private testService: TestService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
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
    this.getUnitData();
/*     this.dataSource.paginator;
    this.dataSource.sort; */
    this.authService.getCurrentUser().subscribe((data) => {this.user = data});
  }

  getUnitData() {
    this.testService.fetchTests().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource)

      },
      (error) => {
        console.log("Error: "+error)
      });
    }
    applyFilter(filterValue: string){
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if(this.dataSource.paginator)
      {
        this.dataSource.paginator.firstPage();
      }
    }

}