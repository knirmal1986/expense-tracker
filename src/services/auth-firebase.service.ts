import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, User } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {
username:string = "username"
userDetails= {} as any


  constructor(private afAuth:AngularFireAuth,private router:Router) {}

  signInWithGoogle(){
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then((result) =>{
      console.log(result)
      this.userDetails = result
      alert('you have been logged in successfully')
      window.localStorage.setItem("username", this.userDetails.uid); 
      this.router.navigate(['/home']);
    }).catch((error) =>{
      alert(error)
    })
    return this.userDetails;
  }

  signOut():Promise<void>{
    return this.afAuth.signOut()
   
  }


  signUp(email: string, pw: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, pw)
  }

  logIn(email: string, pw: string){
    return this.afAuth.signInWithEmailAndPassword(email, pw)
  }

  checkIfLoggedIn(){
    const getValue = window.localStorage.getItem(this.username) ?? "No value found"; 
    if(getValue === "No value found") return false
    else return true
  }
}