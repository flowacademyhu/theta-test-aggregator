import { Component, OnInit} from '@angular/core';
import { Test } from 'src/app/models/test.model';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { FilterParamsModel } from "../../models/filter-params-model";

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})

export class TestResultsComponent implements OnInit {

  public tests$: BehaviorSubject< Test[] > = new BehaviorSubject< Test[] >( null )

  constructor( private route: ActivatedRoute, private testService: TestService) {
  }

  public filters = null;
  public fragment: string;
  subscriptions$: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.testService.fetchTests(null).subscribe((tests) => {
      this.tests$.next(tests);
    });
  }

  fetchTestsByFilter(filters: FilterParamsModel) {
    this.subscriptions$.push(this.testService.fetchTests(null).subscribe((tests) => {
      this.tests$.next(tests);
    }));
  }
}