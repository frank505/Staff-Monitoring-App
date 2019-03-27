import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserPage } from './view-user.page';

describe('ViewUserPage', () => {
  let component: ViewUserPage;
  let fixture: ComponentFixture<ViewUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
