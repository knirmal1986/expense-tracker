import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpParams } from '@angular/common/http';
import { time } from 'ag-charts-community';

export  interface User{
  firstName:string,
  lastName:string,
  emailID:string,
  UID:string,
  createdDate:any,
  lastLogin:any
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private currentUser: User ={} as any;


  constructor() { }

  setUser(data:User){
    this.currentUser = data
    console.log(this.currentUser)
  }

  returnUser(){
    return this.currentUser
  }

  checkIfLoggedIn(){
    // console.log("check if loggedin"+ this.currentUser)
    const UID = localStorage.getItem("username")
    console.log(UID)
    if(UID) {
      console.log("you have already logged in")
      return true
    }
    else{
      console.log("Please login")
      return false
    }
  }

  logOut(){
    this.currentUser = {} as any
    localStorage.removeItem("username")
  }
}