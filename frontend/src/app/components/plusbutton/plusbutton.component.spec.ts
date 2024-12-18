import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusbuttonComponent } from './plusbutton.component';

describe('PlusbuttonComponent', () => {
  let component: PlusbuttonComponent;
  let fixture: ComponentFixture<PlusbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlusbuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlusbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
