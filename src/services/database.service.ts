import { Injectable,inject } from '@angular/core';
import { Observable} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,QueryDocumentSnapshot, QuerySnapshot,
  DocumentReference } from '@angular/fire/compat/firestore';
import { collection,getFirestore,doc,setDoc} from 'firebase/firestore'
// import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

 private dbPath = '/users';
 private collectionName = "users"
 private cities:any
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

    getUserDetailsById(uid:string){
      console.log("uid==", uid)
        this.afs.collection(this.collectionName, ref => ref.where('UID', '==', uid))
        .get().subscribe((res) =>{
          console.log(res)
        })
       const setCurrentUser = {
          "lastName":"like",
          "emailID": "like@like.com",
          "firstName":"like",
          "categories": [
                  "Groceries",
                  "Transportation",
                  "Entertainment",
                  "Dining out",
                  "Unassigned"
              ],
          "UID": "GbN4TvyrjfRdwGXCn38URDLBAoE2"
          }
          return setCurrentUser
    }
}
