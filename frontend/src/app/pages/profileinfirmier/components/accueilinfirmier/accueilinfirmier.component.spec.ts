import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilinfirmierComponent } from './accueilinfirmier.component';

describe('AccueilinfirmierComponent', () => {
  let component: AccueilinfirmierComponent;
  let fixture: ComponentFixture<AccueilinfirmierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilinfirmierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilinfirmierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
