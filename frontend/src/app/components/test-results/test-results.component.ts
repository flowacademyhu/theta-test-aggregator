import { Component, OnInit} from '@angular/core';
import { Test } from 'src/app/models/test.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TestService } from "../../services/test.service";
import { FilterParamsModel } from "../../models/filter-params-model";

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})

export class TestResultsComponent implements OnInit {

  constructor( private route: ActivatedRoute, private testService: TestService) {
  }

  public tests: Test[];
  subscriptions$: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions$.push(this.route.data.subscribe((data) => {
      this.tests=data.tests;
    }));
  }

  fetchTestsByFilter(filters: FilterParamsModel) {
    this.subscriptions$.push(this.testService.fetchTests(filters).subscribe((data) =>  {this.tests = data}));
  }
}
