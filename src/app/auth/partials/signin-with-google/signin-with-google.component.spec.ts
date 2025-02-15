import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninWithGoogleComponent } from './signin-with-google.component';

describe('SigninWithGoogleComponent', () => {
  let component: SigninWithGoogleComponent;
  let fixture: ComponentFixture<SigninWithGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninWithGoogleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninWithGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
