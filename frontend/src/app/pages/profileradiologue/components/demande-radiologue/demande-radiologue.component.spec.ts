import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRadiologueComponent } from './demande-radiologue.component';

describe('DemandeRadiologueComponent', () => {
  let component: DemandeRadiologueComponent;
  let fixture: ComponentFixture<DemandeRadiologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeRadiologueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeRadiologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
