import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileinfirmierComponent } from './profileinfirmier.component';

describe('ProfileinfirmierComponent', () => {
  let component: ProfileinfirmierComponent;
  let fixture: ComponentFixture<ProfileinfirmierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileinfirmierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileinfirmierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
