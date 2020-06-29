import { Component, OnInit} from '@angular/core';
import { Test } from 'src/app/models/test.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})

export class TestResultsComponent implements OnInit {

  constructor( private route: ActivatedRoute, private authService: AuthService, private testService: TestService) {
  }

  public user;

  public tests: Test[];
  subscriptions$: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.tests=data.tests
    }),
    this.authService.getCurrentUser().subscribe((data) => {this.user = data});
  }
  fetchTestsByFilter(filter: string) {
    this.testService.fetchTestsByFilter(filter).subscribe((data) =>  {this.tests = data})
  }

  removeFilter() {
    this.route.data.subscribe((data) =>{
      this.tests=data.tests
    })
  }
  
}