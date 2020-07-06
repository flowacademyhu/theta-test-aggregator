import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterParamsModel } from '../../models/filter-params-model';
import * as moment from 'moment';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
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
      started_before: new FormControl(null),
      status: new FormControl(null)
    });
  }

  onWeekly(): void {
    this.filterForm.patchValue({
      started_after: moment().startOf('isoWeek').toDate(),
      started_before: moment().endOf('isoWeek').toDate(),
      status: 'FAILED',
      triggered_by: null,
      commit_hash: null
    });
    this.onSearch();
  }

  onSearch(): void {
    this.filters.emit(this.filterForm.value);
  }

  onReset(): void {
    this.filterForm.reset();
    this.filters.emit(this.filterForm.value);
  }
}
