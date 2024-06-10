import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import {DashboardRoutingModule} from './dashboard-routing.module'
import { AgChartsAngular } from 'ag-charts-angular';
import { Chart, ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { CategorySummaryPieComponent } from './dashboard/category-summary-pie/category-summary-pie.component';
import { MonthlySummaryBarComponent } from './dashboard/monthly-summary-bar/monthly-summary-bar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CategorySummaryPieComponent,
    MonthlySummaryBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DashboardRoutingModule,
    AgChartsAngular,
    ChartModule,
    HighchartsChartModule
  ]
})
export class DashboardModule { }
