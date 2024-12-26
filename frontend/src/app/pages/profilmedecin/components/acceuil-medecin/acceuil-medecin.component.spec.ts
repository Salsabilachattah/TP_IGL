import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilMedecinComponent } from './acceuil-medecin.component';

describe('AcceuilMedecinComponent', () => {
  let component: AcceuilMedecinComponent;
  let fixture: ComponentFixture<AcceuilMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceuilMedecinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceuilMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
