import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { FilterParamsModel } from "../../models/filter-params-model";

@Component({
  selector: 'app-filters',
  template: `
  <form [formGroup]="filterForm" (ngSubmit)="onSearch()">
  <div>
    <mat-form-field>
      <input matInput formControlName="triggered_by">
      <mat-placeholder class="placeholder">Triggered_by</mat-placeholder>
    </mat-form-field>
    <mat-form-field>
      <input matInput formControlName="commit_hash">
      <mat-placeholder class="placeholder">Commit hash</mat-placeholder>
    </mat-form-field>
    <mat-form-field class="formField">
      <mat-label class="selectLabel">Results by status</mat-label>
      <mat-select formControlName="status">
        <mat-option value='' >All</mat-option>
        <mat-option value='SUCCESS'>Success</mat-option>
        <mat-option value='ERROR'>Error</mat-option>
        <mat-option value='FAILED'>Failed</mat-option>
        <mat-option value='UNKNOWN'>Unknown</mat-option>
      </mat-select>
    </mat-form-field>
  <button mat-raised-button type="submit" [disabled]="filterForm.pristine">Search</button>
  <button mat-raised-button color="warn" type="button" (click)="onReset()">Reset</button>
  `,
  styles: [`
    ::ng-deep .selectLabel{
      color:white;
    }
    
    ::ng-deep .placeholder {
      color: white;
    }
    
    ::ng-deep .mat-select-panel {
      border-radius:5px;
      font-size: 10px;
      background-color: #243441 ;
    }
    
    ::ng-deep .mat-option{
      color: whitesmoke; 
    }`
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
      status: new FormControl(null)
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
