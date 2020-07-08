import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterParamsModel } from '../../models/filter-params-model';
import * as moment from 'moment';
import { CustomFilterService } from 'src/app/services/custom-filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Output() filters: EventEmitter<FilterParamsModel> = new EventEmitter<FilterParamsModel>();
  public filterForm: FormGroup;

  constructor(private customFilterService: CustomFilterService) { }

  public customFilters = [
    {
      name: 'own success',
      triggered_by: 'ehumphery48',
      commit_hash: null,
      started_after: new Date('Wed Jul 01 2020 00:00:00 GMT+0200 (Central European Summer Time)'),
      started_before: new Date('Sat Jun 06 2020 00:00:00 GMT+0200 (Central European Summer Time)'),
      status: 'SUCCESS'
    },
    {
      name: 'greenFAILED',
      triggered_by: 'tgreenhalfcg',
      commit_hash: null,
      started_after: null,
      started_before: null,
      status: 'FAILED'
    }
  ];

  public customFilters2: Array<any>;

  public customFilterControl = new FormControl();

  public onSelectCustomFilter(name: string) {
    const filter = this.customFilters2.find(f => f.name === name);
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

  ngOnInit(): void {
    this.customFilterService.fetchCustomFilters().subscribe((data) => {
      this.customFilters2 = data;
      console.log(data);
      this.customFilters2.forEach(f => this.convertUnixDate(f));
      console.log(this.customFilters2);
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
