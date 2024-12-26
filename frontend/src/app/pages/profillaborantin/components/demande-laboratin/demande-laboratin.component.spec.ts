import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeLaboratinComponent } from './demande-laboratin.component';

describe('DemandeLaboratinComponent', () => {
  let component: DemandeLaboratinComponent;
  let fixture: ComponentFixture<DemandeLaboratinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeLaboratinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeLaboratinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
