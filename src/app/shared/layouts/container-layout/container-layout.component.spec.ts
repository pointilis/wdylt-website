import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerLayoutComponent } from './container-layout.component';

describe('ContainerLayoutComponent', () => {
  let component: ContainerLayoutComponent;
  let fixture: ComponentFixture<ContainerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
