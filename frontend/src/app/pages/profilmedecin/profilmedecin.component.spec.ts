import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilmedecinComponent } from './profilmedecin.component';

describe('ProfilmedecinComponent', () => {
  let component: ProfilmedecinComponent;
  let fixture: ComponentFixture<ProfilmedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilmedecinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilmedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
