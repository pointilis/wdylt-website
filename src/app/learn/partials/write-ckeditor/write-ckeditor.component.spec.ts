import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteCkeditorComponent } from './write-ckeditor.component';

describe('WriteCkeditorComponent', () => {
  let component: WriteCkeditorComponent;
  let fixture: ComponentFixture<WriteCkeditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteCkeditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteCkeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
