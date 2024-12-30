import { ComponentFixture, TestBed } from '@angular/core/testing';
import { profillaborantinComponent } from './profillaborantin.component'; // Correct path for profillaborantinComponent

describe('profillaborantinComponent', () => {
  let component: profillaborantinComponent;
  let fixture: ComponentFixture<profillaborantinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [profillaborantinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(profillaborantinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
