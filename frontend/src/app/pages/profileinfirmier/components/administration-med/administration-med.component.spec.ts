import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationMedComponent } from './administration-med.component';

describe('AdministrationMedComponent', () => {
  let component: AdministrationMedComponent;
  let fixture: ComponentFixture<AdministrationMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrationMedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
