import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageinfoComponent } from './affichageinfo.component';

describe('AffichageinfoComponent', () => {
  let component: AffichageinfoComponent;
  let fixture: ComponentFixture<AffichageinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichageinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichageinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
