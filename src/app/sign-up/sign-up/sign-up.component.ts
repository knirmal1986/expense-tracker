import { Component, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginJsonService,User } from 'src/services/login-json.service';
import { AuthFirebaseService } from 'src/services/auth-firebase.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/services/database.service';

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
user1:User ={} as any
userDetails:any
userDB:any
categories = ["Groceries","Transportation","Entertainment","Dining out","Unassigned"]

private loginJsonService :LoginJsonService;
private authService: AuthFirebaseService;
private databaseService: DatabaseService;

  constructor(private router:Router){
    this.loginJsonService= inject(LoginJsonService)
    this.authService = inject(AuthFirebaseService)
    this.databaseService = inject(DatabaseService)
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
    this.firstName =  singupForm.value.firstName
    this.lastName = singupForm.value.lastName
    this.authService.signUp(this.emailID,this.password).then((result)=>{
      this.userDetails = result.user
      let userDB = {
        UID:this.userDetails.uid,
        firstName:this.firstName,
        lastName:this.lastName,
        emailID:this.emailID,
        categories:this.categories
      }
      this.databaseService.newUserToFirestore(userDB)
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
    
    this.loginJsonService.newUserSignUp(newUser).subscribe(
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
