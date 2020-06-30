import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveFilterModalComponent } from 'src/app/modals/save-filter-modal/save-filter-modal.component';
import { LoadFilterModalComponent } from 'src/app/modals/load-filter-modal/load-filter-modal.component';
import { TestService } from '../../services/test.service';
import { FilterParamsModel } from '../../models/filter-params-model';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})

export class TestResultsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private testService: TestService,
    private dialog: MatDialog
  ) { }

  public tests: Test[];
  subscriptions$: Subscription[] = [];

  filterArray = [];
  currentURL = window.location.href;

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions$.push(this.route.data.subscribe((data) => {
      this.tests = data.tests;
    }));
  }

  fetchTestsByFilter(filters: FilterParamsModel) {
    this.subscriptions$.push(this.testService.fetchTests(filters).subscribe((data) => { this.tests = data; }));
  }

  openSaveDialog() {
    this.dialog.open(SaveFilterModalComponent);
  }

  openLoadDialog() {
    this.dialog.open(LoadFilterModalComponent);
  }

  saveFilter() {
    this.filterArray.push(this.currentURL);
    console.log(this.currentURL);
  }

  loadFilter() {
    return this.filterArray[0];
  }

}
