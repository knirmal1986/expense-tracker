import { Component, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService,User } from 'src/services/login.service';
import { AuthFirebaseService } from 'src/services/auth-firebase.service';
import { Router } from '@angular/router';

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
userDetails:any

private loginService :LoginService;
private authService: AuthFirebaseService;

  constructor(private router:Router){
    this.loginService= inject(LoginService)
    this.authService = inject(AuthFirebaseService)
  }
  ngOnInit(): void {
    if(this.authService.checkIfLoggedIn()){
      this.router.navigate(['/home']);
      alert("You are already loggedin.")
    } 
  }

  signUpWithEmailAndPassword(singupForm:NgForm){
    this.emailID  =singupForm.value.emailID
    this.password = singupForm.value.password
    this.authService.signUp(this.emailID,this.password).then((result)=>{
      this.userDetails = result.user
      alert("You have been successfully registered")
      window.localStorage.setItem("username", this.userDetails.uid); 
      this.router.navigate(['/home']);
    }).catch((error) =>{
      alert(error)
    })
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
        console.log("User signed up successfully")
        this.router.navigate(['/home']);
      },
      (error:any) =>{
        console.log("Failed to register")
      },
      () =>{
     
      }
    )
  }


}
