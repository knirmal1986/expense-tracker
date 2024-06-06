import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySummaryPieComponent } from './category-summary-pie.component';

describe('CategorySummaryPieComponent', () => {
  let component: CategorySummaryPieComponent;
  let fixture: ComponentFixture<CategorySummaryPieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorySummaryPieComponent]
    });
    fixture = TestBed.createComponent(CategorySummaryPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
