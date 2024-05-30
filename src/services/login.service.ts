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
  // private userId: string;
  // private categories: string[];
  // private userIdSet = new Subject<string>();

  constructor() { }

  setUser(data:User){
    this.currentUser = data
    console.log(this.currentUser)
  }
}