import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcvdTileComponent } from './rcvd-tile.component';

describe('RcvdTileComponent', () => {
  let component: RcvdTileComponent;
  let fixture: ComponentFixture<RcvdTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RcvdTileComponent]
    });
    fixture = TestBed.createComponent(RcvdTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
