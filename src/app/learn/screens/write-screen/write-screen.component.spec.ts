import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteScreenComponent } from './write-screen.component';

describe('WriteScreenComponent', () => {
  let component: WriteScreenComponent;
  let fixture: ComponentFixture<WriteScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
