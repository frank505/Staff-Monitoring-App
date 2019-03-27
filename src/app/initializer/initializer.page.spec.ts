import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitializerPage } from './initializer.page';

describe('InitializerPage', () => {
  let component: InitializerPage;
  let fixture: ComponentFixture<InitializerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitializerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitializerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
