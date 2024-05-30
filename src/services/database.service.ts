import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {getFirestore,doc,setDoc} from 'firebase/firestore'

import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

 private dbPath = '/users';
 afs:AngularFirestore
  usersRef :AngularFirestoreCollection<any>
  constructor( private db:AngularFirestore) { 
    this.usersRef=db.collection(this.dbPath)
    this.afs = inject(AngularFirestore)
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

    getUserDetailsById(uid:string){
      console.log("uid==", uid)
        return this.afs.collection('users').doc(uid)
    }

    
    getAllCategories(){
      // return this.categoryRef
    }
 
 
    // updatePublished(status: boolean): void {
    //   if (this.currentTutorial.id) {
    //     this.tutorialService.update(this.currentTutorial.id, { published: status })
    //     .then(() => {
    //       this.currentTutorial.published = status;
    //       this.message = 'The status was updated successfully!';
    //     })
    //     .catch(err => console.log(err));
    //   }
    // }

    async saveNewCategory(category:string): Promise<any> {
    //   return this.categoryRef.add(category).then(() =>{
    //     console.log("Category added successfully");
    // }).catch((error) =>{
    //   console.log(error)
    // })
  }

}
