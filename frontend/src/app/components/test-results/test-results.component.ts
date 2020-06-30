import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveFilterModalComponent } from 'src/app/modals/save-filter-modal/save-filter-modal.component';
import { LoadFilterModalComponent } from 'src/app/modals/load-filter-modal/load-filter-modal.component';


@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})

export class TestResultsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService, private dialog: MatDialog) {
  }

  public user;

  public tests: Test[];
  subscriptions$: Subscription[] = [];

  filterArray = [];
  currentURL = window.location.href;

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.tests = data.tests;
    }),
      this.authService.getCurrentUser().subscribe((data) => { this.user = data; });
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