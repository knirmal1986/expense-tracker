import { Injectable,inject } from '@angular/core';
import { Observable} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,QueryDocumentSnapshot, QuerySnapshot,
  DocumentReference } from '@angular/fire/compat/firestore';
import { collection,getFirestore,doc,setDoc, query, where, getDocs} from 'firebase/firestore'
// import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { initializeApp } from 'firebase/app';
import { codeSlash } from 'ngx-bootstrap-icons';


@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

 private dbPath = '/users';
 private collectionName = "users"
 setCurrentUser:any
 private cities:any
 firebaseConfig = {
  apiKey: "AIzaSyDvPFvPb2jeTOXqow6ToTGgdbfzR1wtYng",
  authDomain: "expensetracker-9feec.firebaseapp.com",
  projectId: "expensetracker-9feec",
  storageBucket: "expensetracker-9feec.appspot.com",
  messagingSenderId: "918664489535",
  appId: "1:918664489535:web:c20b48f0faecbb45f1668a"
};
  fireBasedb = getFirestore(initializeApp(this.firebaseConfig))
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

    async getUserDetailsById(uid:string){
      //  let showloading:boolean = true
       const q = query(collection(this.fireBasedb,'users'),where('UID', '==', uid))
       const querySnapshot = await getDocs(q);
       querySnapshot.forEach( (doc) => {
          const user = (doc.id, "===>", doc.data())
          this.setCurrentUser = user
       })

       return await this.setCurrentUser
    }
}