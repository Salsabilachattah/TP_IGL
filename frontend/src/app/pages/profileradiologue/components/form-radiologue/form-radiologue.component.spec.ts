import { ComponentFixture, TestBed } from '@angular/core/testing';

import { form_radiologueComponent } from './form-radiologue.component';

describe('FormRadiologueComponent', () => {
  let component: form_radiologueComponent;
  let fixture: ComponentFixture<form_radiologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [form_radiologueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(form_radiologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
