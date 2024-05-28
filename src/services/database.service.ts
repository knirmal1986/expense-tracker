import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

 private dbPath = '/users';
 user= {
    "id": "f87f",
    "firstName": "something",
    "lastName": "lol",
    "emailID": "something@example.com",
    "password": "something"
  }
  usersRef :AngularFirestoreCollection<any>

  constructor( private db:AngularFirestore) { 
    this.usersRef=db.collection(this.dbPath)  
    }

    uploadDocumentToFirestore(){
      this.usersRef.add({...this.user}).then(() =>{
        console.log("added successfully")
      }).catch((error) =>{
        console.log(error)
      })
    }

    newUserToFirestore(){
      this.usersRef.add({...this.user}).then(() =>{
        console.log("added successfully")
      }).catch((error) =>{
        console.log(error)
      })
    }
}
