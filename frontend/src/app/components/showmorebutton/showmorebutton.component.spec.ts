import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowmorebuttonComponent } from './showmorebutton.component';

describe('ShowmorebuttonComponent', () => {
  let component: ShowmorebuttonComponent;
  let fixture: ComponentFixture<ShowmorebuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowmorebuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowmorebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
