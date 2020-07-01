import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { FilterParamsModel } from "../../models/filter-params-model";



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
        <mat-form-field>
          <mat-label>Starting date</mat-label>
            <input matInput [matDatepicker]="picker1" formControlName="started_after">
          <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
          <mat-datepicker #picker1></mat-datepicker>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Ending date</mat-label>
            <input matInput [matDatepicker]="picker2" formControlName="started_before">
          <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
          <mat-datepicker #picker2></mat-datepicker>
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
      commit_hash: new FormControl(null),
      started_after: new FormControl(null),
      started_before: new FormControl(null)
    });
  }

  onSearch(): void {
    this.filters.emit(this.filterForm.value);
  }

  onReset(): void {
    this.filterForm.reset();
    this.filters.emit(this.filterForm.value);
  }
}
