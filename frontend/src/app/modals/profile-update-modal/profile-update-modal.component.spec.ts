import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUpdateModalComponent } from './profile-update-modal.component';

describe('ProfileUpdateModalComponent', () => {
  let component: ProfileUpdateModalComponent;
  let fixture: ComponentFixture<ProfileUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
