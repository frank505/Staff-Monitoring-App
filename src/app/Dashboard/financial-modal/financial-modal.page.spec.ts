import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialModalPage } from './financial-modal.page';

describe('FinancialModalPage', () => {
  let component: FinancialModalPage;
  let fixture: ComponentFixture<FinancialModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
