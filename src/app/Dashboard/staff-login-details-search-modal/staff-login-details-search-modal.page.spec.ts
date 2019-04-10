import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLoginDetailsSearchModalPage } from './staff-login-details-search-modal.page';

describe('StaffLoginDetailsSearchModalPage', () => {
  let component: StaffLoginDetailsSearchModalPage;
  let fixture: ComponentFixture<StaffLoginDetailsSearchModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffLoginDetailsSearchModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffLoginDetailsSearchModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
