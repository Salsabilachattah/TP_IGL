import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedigerResumeComponent } from './rediger-resume.component';

describe('RedigerResumeComponent', () => {
  let component: RedigerResumeComponent;
  let fixture: ComponentFixture<RedigerResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedigerResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedigerResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
