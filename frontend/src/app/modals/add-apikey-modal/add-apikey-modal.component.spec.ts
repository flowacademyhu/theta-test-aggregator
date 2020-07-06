import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApikeyModalComponent } from './add-apikey-modal.component';

describe('AddApikeyModalComponent', () => {
  let component: AddApikeyModalComponent;
  let fixture: ComponentFixture<AddApikeyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApikeyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApikeyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
