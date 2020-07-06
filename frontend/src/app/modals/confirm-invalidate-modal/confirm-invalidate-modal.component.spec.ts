import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmInvalidateModalComponent } from './confirm-invalidate-modal.component';

describe('ConfirmInvalidateModalComponent', () => {
  let component: ConfirmInvalidateModalComponent;
  let fixture: ComponentFixture<ConfirmInvalidateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmInvalidateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmInvalidateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
