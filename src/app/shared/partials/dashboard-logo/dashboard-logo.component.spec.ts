import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLogoComponent } from './dashboard-logo.component';

describe('DashboardLogoComponent', () => {
  let component: DashboardLogoComponent;
  let fixture: ComponentFixture<DashboardLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
