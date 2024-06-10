import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { database } from 'ngx-bootstrap-icons';
import { Observable,expand,from,map, of } from 'rxjs';
import { AuthFirebaseService } from 'src/services/auth-firebase.service';
import { DatabaseService } from 'src/services/database.service';
import { LoginService } from 'src/services/login.service';
import { NgForm } from '@angular/forms';

export interface Person{
  firstName:string,
  lastName:string
}

export interface ExtendedPerson {
  fullName: string;
}

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
    amount:0,
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
  setUserUpdates$ : Observable<any> ={} as any
  UID = ""
  constructor(private router:Router, private _cdr: ChangeDetectorRef){
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
        this.setUserUpdates$ = of(data)
        console.log("user details =", data)
        const details = this.loginService.returnUser()
        this.setUser = data
        this.setUser.details = details
        of(data)
        .subscribe({
          next: value => this.setUserUpdates$ = data,
          error: err => console.log('error:', err),
          complete: () => console.log(this.setUserUpdates$),
        });
      }) : {}
    // this.getUserUpdates();
    this.dbService.userData$.subscribe(  (data) => {
      console.log("updated user data =", data)
      this.setUser = data
    })
    }
  }

  // getUserUpdates(){
  //   // const UID = localStorage.getItem("username")
  //     // console.log(UID)
  //     //  UID !== null ? this.dbService.getUserDetailsById(UID).then( (data) => {
  //     //   console.log("user details =", data)
  //     //   // const details = this.loginService.returnUser()
  //     //   this.setUserUpdates$ = data
  //     //   console.log(this.setUserUpdates$)
  //     //  }):{}
  //  this.UID = localStorage?.getItem("username") as any
  //     console.log(this.UID)
  //     this.dbService.onValueChanges(this.UID)
  //     // this.dbService.onValueChanges(this.UID).then ((data) => {
  //     //   console.log("value changed in home",data)
  //     //   this.setUser = data
  //     //  // this.setUserUpdates$ = of(data)
  //     //   console.log("updated from firebase")
  //     //   console.log(this.setUser)
  //     //  });
  // }

  selectCategory(category:string){
    this.category = category
  }

  printsomething(){
    console.log("something")
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

  getUpdatedUser(data:any){
    console.log(data)
    return this.setUser
  }

  public preston$: Observable<any> = of({
    firstName: 'Preston',
    lastName: 'Lamb',
  })

  getFullName(person: Person) {
    return person.firstName + ' ' + person.lastName
  }
}