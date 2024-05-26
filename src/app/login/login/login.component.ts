import { Component, Inject, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/services/login.service';
import { AuthFirebaseService } from 'src/services/auth-firebase.service';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username:string = "username"
  emailID:string = ""
  password:string = ""
  userDetails:any

  private loginService:  LoginService;
  private authService: AuthFirebaseService;

     constructor(private router:Router){ 
    this.loginService = inject(LoginService)
    this.authService = inject(AuthFirebaseService)
  }

  ngOnInit(): void {
    if(this.authService.checkIfLoggedIn()){
      this.router.navigate(['/home']);
      alert("You are already loggedin.")
    }
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

  signUpWithEmailAndPassword(userForm:NgForm){
    this.router.navigate(['/sign-up']);
    // this.emailID  =userForm.value.email
    // this.password = userForm.value.password
    // this.authService.signUp(this.emailID,this.password)
  }

  async loginWithEmailAndPassword(userForm:NgForm){
    this.emailID  =userForm.value.email
    this.password = userForm.value.password
    this.authService.logIn(this.emailID,this.password).then(async (result) =>{
      this.userDetails = result.user
      console.log(result)
      window.localStorage.setItem("username", this.userDetails.uid); 
      alert("you have been successfully logged in")
      await this.submitDbData()
      this.router.navigate(['/home']);
    }).catch((error)=>{
      alert(error)
    })
    

  }

  googleLogin(){
    this.userDetails = this.authService.signInWithGoogle().then(
      console.log(this.userDetails)
    )
    this.router.navigate(['/home']);
  }

  logOut(){
    this.authService.signOut().then((data) =>{
      console.log(data)
      window.localStorage.removeItem("username"); 
      alert("Logged out successfully")
      this.router.navigate(['/login'])
    }).catch((error) =>{
      alert(error)
    })
  }

  submitDbData(){
    console.log("submitted")
  }
}

