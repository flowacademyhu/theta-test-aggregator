import { Component, OnInit} from '@angular/core';
import { TestService } from '../../services/test.service';
import { Test } from 'src/app/models/test.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit {

  constructor(private testService: TestService) {
  }

  public tests: Test[];
  subscriptions$: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.testService.fetchTests();
    this.subscriptions$.push(this.testService.tests$.subscribe(tests => {
      this.tests = tests;
    }));
  }
  
  removeFilter() {
    this.testService.fetchTests();
  }
}