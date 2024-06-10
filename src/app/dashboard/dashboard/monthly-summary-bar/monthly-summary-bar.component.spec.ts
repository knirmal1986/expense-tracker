import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySummaryBarComponent } from './monthly-summary-bar.component';

describe('MonthlySummaryBarComponent', () => {
  let component: MonthlySummaryBarComponent;
  let fixture: ComponentFixture<MonthlySummaryBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlySummaryBarComponent]
    });
    fixture = TestBed.createComponent(MonthlySummaryBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
