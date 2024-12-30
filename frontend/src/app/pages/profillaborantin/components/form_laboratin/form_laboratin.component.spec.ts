import { ComponentFixture, TestBed } from '@angular/core/testing';

import { form_laboratinComponent } from './form_laboratin.component'; // Correct path for profillaborantinComponent

describe('profillaborantinComponent', () => {
  let component: form_laboratinComponent;
  let fixture: ComponentFixture<form_laboratinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [form_laboratinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(form_laboratinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
