import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedContComponent } from './checked-cont.component';

describe('CheckedContComponent', () => {
  let component: CheckedContComponent;
  let fixture: ComponentFixture<CheckedContComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckedContComponent]
    });
    fixture = TestBed.createComponent(CheckedContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
