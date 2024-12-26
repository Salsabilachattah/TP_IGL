import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationPersoComponent } from './information-perso.component';

describe('InformationPersoComponent', () => {
  let component: InformationPersoComponent;
  let fixture: ComponentFixture<InformationPersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationPersoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
