import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinsGComponent } from './soins-g.component';

describe('SoinsGComponent', () => {
  let component: SoinsGComponent;
  let fixture: ComponentFixture<SoinsGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoinsGComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoinsGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
