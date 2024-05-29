import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

 private dbPath = '/users';
  usersRef :AngularFirestoreCollection<any>

  constructor( private db:AngularFirestore) { 
    this.usersRef=db.collection(this.dbPath)
    console.log("this is from database service"+this.usersRef)
    }

    newUserToFirestore(user:any){
      this.usersRef.add({...user}).then(() =>{
        console.log("added successfully")
      }).catch((error) =>{
        console.log(error)
      })
    }

    getAll(): AngularFirestoreCollection<any> {
      return this.usersRef;
    }
}
