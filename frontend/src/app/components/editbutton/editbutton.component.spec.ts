import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbuttonComponent } from './editbutton.component';

describe('EditbuttonComponent', () => {
  let component: EditbuttonComponent;
  let fixture: ComponentFixture<EditbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditbuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
