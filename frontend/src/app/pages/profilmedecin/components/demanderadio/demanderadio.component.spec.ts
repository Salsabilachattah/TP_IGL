import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemanderadioComponent } from './demanderadio.component';

describe('DemanderadioComponent', () => {
  let component: DemanderadioComponent;
  let fixture: ComponentFixture<DemanderadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemanderadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemanderadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
