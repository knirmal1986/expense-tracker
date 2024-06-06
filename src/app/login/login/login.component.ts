import { Component, Inject, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginJsonService} from 'src/services/login-json.service';
import { LoginService } from 'src/services/login.service';
import { AuthFirebaseService } from 'src/services/auth-firebase.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/services/database.service';
import { Firestore,deleteDoc,collectionData,collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username:string = "username"
  emailID:string = ""
  password:string = ""
  userDetailsFromAuth:any
  setUser:any
  
 
  private loginServiceJson:  LoginJsonService;
  private authService: AuthFirebaseService;
  private loginService:LoginService
  private databaseService:DatabaseService

  constructor(private router:Router){ 
    this.loginServiceJson = inject(LoginJsonService)
    this.authService = inject(AuthFirebaseService)
    this.loginService = inject(LoginService)
    this.databaseService = inject(DatabaseService)
  }

  ngOnInit(): void {
    if(this.loginService.checkIfLoggedIn()){
      this.router.navigate(['/home']);
      alert("You are already loggedin.")
    }
  }

  emailLogin(userForm:NgForm){
    // console.log(userForm.value)
    this.emailID  =userForm.value.email
    this.password = userForm.value.password
    console.log("Email ID: " +this.emailID+"and password :" + this.password)
    this.loginServiceJson.checkLogin(this.emailID).subscribe(
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
  }

  async loginWithEmailAndPassword(userForm:NgForm){
    this.emailID  =userForm.value.email
    this.password = userForm.value.password
    this.authService.logIn(this.emailID,this.password).then(async (result: any) =>{
      const  {createdAt , lastLoginAt} = result.user.multiFactor.user.metadata
      this.setUser ={
        username:result.user.multiFactor.user.uid,
        createdAt:createdAt,
        lastLoginAt:lastLoginAt
      } 
      localStorage.setItem("username",result.user.multiFactor.user.uid,)
      console.log(this.setUser)
      this.loginService.setUser(this.setUser)
      this.router.navigate(['/home']);
    }).catch((error)=>{
      alert(error)
    })
  }

  googleLogin(){
    this.userDetailsFromAuth = this.authService.signInWithGoogle().then(
      console.log(this.userDetailsFromAuth)
    )
    this.router.navigate(['/home']);
  }

  logOut(){
    this.setUser = {}
    localStorage.removeItem("username")
  }
}

