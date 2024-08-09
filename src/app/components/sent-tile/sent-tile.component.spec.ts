import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentTileComponent } from './sent-tile.component';

describe('SentTileComponent', () => {
  let component: SentTileComponent;
  let fixture: ComponentFixture<SentTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SentTileComponent]
    });
    fixture = TestBed.createComponent(SentTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
