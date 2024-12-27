import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandebioComponent } from './demandebio.component';

describe('DemandebioComponent', () => {
  let component: DemandebioComponent;
  let fixture: ComponentFixture<DemandebioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandebioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandebioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
