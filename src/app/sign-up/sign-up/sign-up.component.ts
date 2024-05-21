import { Component, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService,User } from 'src/services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
firstName:string = ""
lastName:string = ""
emailID:string=""
password:string=""
user:User ={} as any

private loginService :LoginService;

  constructor(){
    this.loginService= inject(LoginService)
  }
  ngOnInit(): void {
    
  }
  newUserSignup(singupForm:NgForm){
    const newUser = {
      firstName:singupForm.value.firstName,
      lastName: singupForm.value.lastName,
      emailID: singupForm.value.emailID,
      password:singupForm.value.password
    }

    this.loginService.newUserSignUp(newUser).subscribe(
      (data:any)=>{
        console.log(data)
      },
      (error:any) =>{
        console.log("Failed to register")
      },
      () =>{
        console.log("User signed up successfully")
      }
    )
  }
}
