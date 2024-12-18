import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletebuttonComponent } from './deletebutton.component';

describe('DeletebuttonComponent', () => {
  let component: DeletebuttonComponent;
  let fixture: ComponentFixture<DeletebuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletebuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
