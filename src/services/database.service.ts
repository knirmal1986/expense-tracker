import { Injectable,inject } from '@angular/core';
import { Observable,map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { getFirestore,doc,setDoc} from 'firebase/firestore'
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

 private dbPath = '/users';
 private collectionName = "users"
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
          console.log(res.docs)
        });
        
    }

}
