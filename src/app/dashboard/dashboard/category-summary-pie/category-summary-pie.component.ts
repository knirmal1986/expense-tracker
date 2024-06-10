import { Component,OnInit,OnChanges, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-category-summary-pie',
  templateUrl: './category-summary-pie.component.html',
  styleUrls: ['./category-summary-pie.component.css']
})
export class CategorySummaryPieComponent implements OnInit{
  private _data: any = [];
  public get data(): any {
    return this._data;
  }

  @Input()
  public set data(value: any) {
    this._data = value;
    console.log(value);
   this.pieChartOptions =  {...this.pieChartOptions, series: [
      {
        type: 'pie',
        data: this._data,
      },
    ] };
  }
  pieChartOptions = {
    chart: {
      type: 'pie',
      plotShadow: false,
    },
  
    plotOptions: {
      pie: {
        slicedOffset: 10,
        dataLabels: {
          connectorWidth: 0,
        },
      },
    },
  
    title: {
      text: 'Category Summary',
    },
  
    legend: {
      enabled: false,
    },
  
    series: [
      {
        type: 'pie',
        data: [],
      },
    ],
  }
  pieChart=new Chart()


  ngOnInit() {
      this.pieChart = new Chart(this.pieChartOptions as any)
  }
}
