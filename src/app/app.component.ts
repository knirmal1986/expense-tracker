import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat';
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, User } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ExpenseTracker';

  constructor(private afAuth: AngularFireAuth){}
  
  // signInWithGoogle(){
  //  this.afAuth.signInWithPopup(new GoogleAuthProvider()).then((result) => {
  //  alert('You have been successfully logged in!');
  // }).catch((error) => {
  //     alert(error)
  // })
  // }
}
