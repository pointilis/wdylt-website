import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountButtonComponent } from './my-account-button.component';

describe('MyAccountButtonComponent', () => {
  let component: MyAccountButtonComponent;
  let fixture: ComponentFixture<MyAccountButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccountButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAccountButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
