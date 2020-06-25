import { Component, OnInit} from '@angular/core';
import { TestService } from '../../services/test.service';
import { Test } from 'src/app/models/test.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit {

  constructor(private testService: TestService, private route: ActivatedRoute, private authService: AuthService) {
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
    this.subscriptions$.push(this.testService.tests$.subscribe(tests => {
      this.tests = tests;
    }));
  }
  
  removeFilter() {
    this.testService.fetchTests();
  }
}