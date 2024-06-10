import { Component,OnInit,OnChanges, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-monthly-summary-bar',
  templateUrl: './monthly-summary-bar.component.html',
  styleUrls: ['./monthly-summary-bar.component.css']
})
export class MonthlySummaryBarComponent {
  private _data: any = [];
  public get data(): any {
    return this._data;
  }
  
  @Input()
  public set data(value: any) {
    this._data = value;
    console.log(value);
   this.chartOptions =  {...this.chartOptions, series: this._data};
  }
  barChart=new Chart()

chartOptions = 
{
  chart: {
    type: 'column'
  },
  title: {
    text: 'Monthly Summary'
  },
  plotOptions: {
    column: {
        stacking: 'normal',
        dataLabels: {
            enabled: true
        }
    }
},
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yAxis: {
    title: {
      text: 'Total Monthly Expenses amount'
    }
  },
  series: []
}
  ngOnInit() {
      this.barChart = new Chart(this.chartOptions as any)
  }
  
}