import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFilterModalComponent } from './load-filter-modal.component';

describe('LoadFilterModalComponent', () => {
  let component: LoadFilterModalComponent;
  let fixture: ComponentFixture<LoadFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
