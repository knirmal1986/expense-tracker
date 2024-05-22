import { Component, Inject, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  emailID:string = ""
  password:string = ""
  private loginService:  LoginService;
     constructor(){ 
    this.loginService = inject(LoginService)
  }

  ngOnInit(): void {
    
  }

  emailLogin(userForm:NgForm){
    console.log(userForm.value)
    this.emailID  =userForm.value.email
    this.password = userForm.value.password
    console.log("Email ID: " +this.emailID+"and password :" + this.password)
    this.loginService.checkLogin(this.emailID).subscribe(
      (data:any) =>{
        console.log(data)
        if(this.password === data[0].password){
          console.log(this.emailID + " logged in")
          alert("Welcome to expense tracker")
        }
      },
      (error: any) =>{
        console.log("Failed to fetch data")
      },
      () =>{
        console.log("all data received")
      }
    )
  }
}