import { Component, OnInit, inject } from '@angular/core';
import { DatabaseService } from 'src/services/database.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
  setUser:any
  userDetailsForUI:any
  pieChartData:any ={}
  barChartData:any = {}
  private dbService:DatabaseService
  colors = ["#11ee00","#0e14a6","#a08efe","#314c72","#b20915",
  "#a9285c","#66d1f5","#00c889","#7f1651","#d4d1ec"]
  constructor(){
    this.dbService=inject(DatabaseService)

  }
  ngOnInit(): void {
    const UID = localStorage.getItem("username")
    UID !== null ? this.dbService.getUserDetailsById(UID).then( (data) => {
      this.setUser = data
      this.setUserDetailsForUI(data)
    }):{}
    
  }
  setUserDetailsForUI(data:any){
    const numberOfExpenses = data.expenses.length
    const dateArray = data.expenses.map(function (el:any) { return Date.parse(el.date); });
    const amountArray = data.expenses.map(function (el:any) { return el.amount });
    let firstExpenseDate = new Date(Math.min.apply(null, dateArray));
    let lastExpenseDate = new Date(Math.max.apply(null, dateArray));
    const totalExpense= amountArray.reduce((partialSum:number, a:number) => partialSum + a, 0)
    this.userDetailsForUI = {
      numberOfExpenses : numberOfExpenses,
      firstExpenseDate:firstExpenseDate,
      lastExpenseDate:lastExpenseDate,
      totalExpense:totalExpense
    }

    this.pieChartData = data.expenses.map((expense:any, index:number) => ({
      name: expense.category,
      y: expense.amount,
      color: this.colors[index % this.colors.length]
  }));

  // this.barChartData = data.expenses.map()

  this.barChartData =[{
    name: 'BPL',
    color: "#11ee00",
    data: [3, 5, 1, 13]
}, {
    name: 'FA Cup',
    color: "#0e14a6",
    data: [14, 8, 8, 12]
}, {
    name: 'CL',
    data: [0, 2, 6, 3]
},{
  name: 'Self care',
  data: [4, 2, 5, 1]
}]
  }


  getBarChartOptions(){
    //   map(expenses => {
    //     const groupedData = expenses.reduce((acc, expense) => {
    //       const month = expense.date.slice(0, 7); // Extract the 'YYYY-MM' part of the date
    //       if (!acc[month]) {
    //         acc[month] = {};
    //       }
    //       if (!acc[month][expense.category]) {
    //         acc[month][expense.category] = 0;
    //       }
    //       acc[month][expense.category] += expense.amount;
    //       return acc;
    //     }, {});

    //     // Convert grouped data to an array of objects
    //     return Object.entries(groupedData).map(([month, categories]) => ({
    //       month,
    //       categories: Object.entries(categories).map(([category, amount]) => ({
    //         category,
    //         amount
    //       }))
    //     }));
    //   })
    // );

}
  
}