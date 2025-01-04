import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrDisplayComponent } from './qr-display.component';

describe('QrDisplayComponent', () => {
  let component: QrDisplayComponent;
  let fixture: ComponentFixture<QrDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
