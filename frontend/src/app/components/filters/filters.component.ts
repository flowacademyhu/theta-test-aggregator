import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TestService} from "../../services/test.service";
import {FilterParamsModel} from "../../models/filter-params-model";

@Component({
  selector: 'app-filters',
  template: `
    <form [formGroup]="filterForm" (ngSubmit)="onSearch()">
      <div>
        <mat-form-field>
          <input matInput formControlName="triggered_by" placeholder="Triggered by">
        </mat-form-field>
        <mat-form-field>
          <input matInput formControlName="commit_hash" placeholder="Commit hash">
        </mat-form-field>
      </div>
      <button mat-raised-button type="submit" [disabled]="filterForm.pristine">Search</button>
      <button mat-raised-button color="warn" type="button" (click)="onReset()">Reset</button>
    </form>
  `,
  styles: [
  ]
})
export class FiltersComponent implements OnInit {
  @Output() filters: EventEmitter<FilterParamsModel> = new EventEmitter<FilterParamsModel>();

  public filterForm: FormGroup;
  constructor() { }
  ngOnInit(): void {
    this.filterForm = new FormGroup({
      triggered_by: new FormControl(null),
      commit_hash: new FormControl(null)
    })
  }

  onSearch() {
    console.log(this.filterForm.value);
    this.filters.emit(this.filterForm.value);
  }

  onReset() {
    this.filterForm.reset();
    this.filters.emit(this.filterForm.value);
  }
}
