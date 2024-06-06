import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { database } from 'ngx-bootstrap-icons';
import { Observable,expand,map } from 'rxjs';
import { AuthFirebaseService } from 'src/services/auth-firebase.service';
import { DatabaseService } from 'src/services/database.service';
import { LoginService } from 'src/services/login.service';
import { NgForm } from '@angular/forms';



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

export class HomeComponent implements OnInit,OnDestroy{

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

  private dbService:DatabaseService
  private loginService:LoginService
  private checkExpenseForm:boolean =  true
  setUser:any
  constructor(private router:Router){
    this.dbService=inject(DatabaseService)
    this.loginService = inject(LoginService)
  }
  
  ngOnInit(): void {
    if(!this.loginService.checkIfLoggedIn()){
      alert("Please login")
      this.router.navigate(['/login'])
    }else{
      const UID = localStorage.getItem("username")
      console.log(UID)
       UID !== null ? this.dbService.getUserDetailsById(UID).then( (data) => {
        console.log("user details =", data)
        const details = this.loginService.returnUser()
        this.setUser = data
        this.setUser.details = details
        console.log(this.setUser)
      }) : {}
      this.getUserUpdates();
    }
  }

  getUserUpdates(){
    const UID = localStorage.getItem("username")
      console.log(UID)
      const data =  UID !== null ? this.dbService.onValueChanges(UID):{}
      // this.setUser = data
  }

  selectCategory(category:string){
    this.category = category
  }

  addNewCategory(){
    const UID = localStorage.getItem("username") || ""
    this.dbService.addCategory(UID,this.category)
  }

  removeCategory(){
    const UID = localStorage.getItem("username") || ""
    this.dbService.removeCategory(UID,this.category)
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
      const UID = localStorage.getItem("username") || ""
      this.dbService.addExpense(UID,newExpense)
      console.log(this.setUser)
    }    
  }

  ngOnDestroy(): void{

  }
}