import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminPage } from './view-admin.page';

describe('ViewAdminPage', () => {
  let component: ViewAdminPage;
  let fixture: ComponentFixture<ViewAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAdminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
