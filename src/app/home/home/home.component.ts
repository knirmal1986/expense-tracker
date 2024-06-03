import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { database } from 'ngx-bootstrap-icons';
import { Observable,expand,map } from 'rxjs';
import { AuthFirebaseService } from 'src/services/auth-firebase.service';
import { DatabaseService } from 'src/services/database.service';
import { LoginService } from 'src/services/login.service';
import { NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';



export interface Expense{
    name:string,
    amount:number,
    date:string,
    category:string,
    paymentType:string,
    comments:string
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  expense:Expense ={
    name:"",
    amount:45,
    date:"",
    category:"",
    paymentType:"",
    comments:""
  }

  loadingUserInformation:boolean= true
  loggedInUserDetails:any
  category:string =""
  private authService:AuthFirebaseService
  private dbService:DatabaseService
  private loginService:LoginService
  private checkExpenseForm:boolean =  true
  setUser:any
  constructor(private router:Router){
    this.authService = inject(AuthFirebaseService)
    this.dbService=inject(DatabaseService)
    this.loginService = inject(LoginService)
  }
  
  ngOnInit(): void {
    if(!this.loginService.checkIfLoggedIn()){
      alert("Please login")
      this.router.navigate(['/login'])
    }else{
      this.setUser = this.dbService.getUserDetailsById("anything")
      console.log(this.setUser)
    }
  }

  selectCategory(category:string){
    this.category = category
  }

  addNewCategory(){
    this.setUser.categories.push(this.category)
    console.log(this.setUser)
  }

  removeCategory(){
    const index = this.setUser.categories.indexOf(this.category)
    this.setUser.categories.splice(index,1)
  }

  addExpense(expenseForm:NgForm){
    if(expenseForm.form.status !== "VALID"){
      console.log("INVALID")
      
    } else{
      const newExpense = {
        name:expenseForm.value.expenseName,
        amount:expenseForm.value.expenseAmount,
        date:expenseForm.value.expenseDate,
        category:expenseForm.value.expenseCategory,
        paymentType:expenseForm.value.expensePaymentType,
        comments:expenseForm.value.expenseComments
      }
      if(this.setUser.expenses){
      this.setUser.expenses.push(newExpense)
      }
      else{
        this.setUser.expenses = []
        this.setUser.expenses.push(newExpense)
      }
      console.log(this.setUser)
    }
    
  }

}