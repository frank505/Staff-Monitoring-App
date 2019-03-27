import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskPage } from './view-task.page';

describe('ViewTaskPage', () => {
  let component: ViewTaskPage;
  let fixture: ComponentFixture<ViewTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
