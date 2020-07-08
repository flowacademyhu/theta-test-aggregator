import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterParamsModel } from '../../models/filter-params-model';
import * as moment from 'moment';
import { CustomFilterService } from 'src/app/services/custom-filter.service';
import { CustomFilter } from 'src/app/models/custom-filter.model';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Output() filters: EventEmitter<FilterParamsModel> = new EventEmitter<FilterParamsModel>();
  public filterForm: FormGroup;

  constructor(private customFilterService: CustomFilterService) { }

  public customFilters: CustomFilter[];

  public customFilterControl = new FormControl();

  public onSelectCustomFilter(name: string) {
    const filter = this.customFilters.find(f => f.name === name);
    this.filterForm.patchValue(
      {
        triggered_by: filter.triggered_by,
        commit_hash: filter.commit_hash,
        started_after: filter.started_after,
        started_before: filter.started_before,
        status: filter.status
      }
    )
    console.log(this.filterForm.value);
  }

  public convertUnixDate(data) {
    if (data.started_before === 0 && data.started_after === 0) {
      data.started_before = null;
      data.started_after = null;
    } else if(data.started_after === 0) {
      data.started_after = null;
    } else if (data.started_before === 0) {
      data.started_before = null
    } else {
    data.start_before = new Date(data.start_before/1000000).toLocaleString();
    data.start_after = new Date(data.start_after/1000000).toLocaleString();
    }
  }

  public saveFilter() {
    const customFilter: CustomFilter = {
      name: 'custom filter',
      triggered_by: this.filterForm.value.triggered_by,
      commit_hash: this.filterForm.value.commit_hash,
      status: this.filterForm.value.status,
      started_after: this.filterForm.value.started_after,
      started_before: this.filterForm.value.started_before
    }
    console.log(customFilter);
    this.customFilterService.addCustomFilter(customFilter).pipe( catchError((error: HttpErrorResponse) => {
      return throwError(error.error.message);
    })).subscribe((data) => {}, (error) => {console.log(error)});
    this.customFilterService.fetchCustomFilters().subscribe((data) => {
      data.forEach(f => this.convertUnixDate(f));
      this.customFilters = data;
    });
  }

  ngOnInit(): void {
    this.customFilterService.fetchCustomFilters().subscribe((data) => {
      console.log(data);
      data.forEach(f => this.convertUnixDate(f));
      this.customFilters = data;
    });
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
    console.log(this.filterForm.value);
    this.filters.emit(this.filterForm.value);
  }

  onReset(): void {
    this.filterForm.reset();
    this.customFilterControl.reset();
    this.filters.emit(this.filterForm.value);
  }
}
