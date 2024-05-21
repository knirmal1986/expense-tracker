import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpParams } from '@angular/common/http';

export  interface User{
  firstName:string,
  lastName:string,
  emailID:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url ="http://localhost:3000/users"
  constructor(private http:HttpClient) {   }

  public  newUserSignUp(newUser:User):Observable<Object>{
    return this.http.post(this.url,newUser)
  }

  public checkLogin(email:string):Observable<Object>{
    return this.http.get(this.url, {
      params: {
        emailID: email
      }})
  }
}
