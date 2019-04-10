import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCreatorAppModalPage } from './message-creator-app-modal.page';

describe('MessageCreatorAppModalPage', () => {
  let component: MessageCreatorAppModalPage;
  let fixture: ComponentFixture<MessageCreatorAppModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageCreatorAppModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCreatorAppModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
