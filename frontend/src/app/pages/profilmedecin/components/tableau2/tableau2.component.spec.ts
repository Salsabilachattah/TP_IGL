import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableau2Component } from './tableau2.component';

describe('Tableau2Component', () => {
  let component: Tableau2Component;
  let fixture: ComponentFixture<Tableau2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tableau2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tableau2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
