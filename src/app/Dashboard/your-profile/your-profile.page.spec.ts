import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourProfilePage } from './your-profile.page';

describe('YourProfilePage', () => {
  let component: YourProfilePage;
  let fixture: ComponentFixture<YourProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
