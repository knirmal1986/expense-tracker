import { Injectable,inject } from '@angular/core';
import { Observable} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,QueryDocumentSnapshot, QuerySnapshot,
  DocumentReference } from '@angular/fire/compat/firestore';
import { collection,getFirestore,doc,setDoc, query, where, getDocs, updateDoc,onSnapshot} from 'firebase/firestore'
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

    staticSetUser(){
      const user = {
            "lastName": "like",
            "emailID": "like@like.com",
            "firstName": "like",
            "categories": [
                "Groceries",
                "Transportation",
                "Entertainment",
                "Dining out",
                "Unassigned"
            ],
            "UID": "GbN4TvyrjfRdwGXCn38URDLBAoE2",
            "expenses": [
                {
                    "name": "phone",
                    "amount": 40000,
                    "date": "2024-06-05",
                    "category": "Entertainment",
                    "paymentType": "Credit card",
                    "comments": "once in 3 years"
                },
                {
                    "name": "gym",
                    "amount": 2000,
                    "date": "2024-05-12",
                    "category": "self care",
                    "paymentType": "Credit card",
                    "comments": "monthly subscription"
                },
                {
                    "name": "chair",
                    "amount": 1250,
                    "date": "2024-03-22",
                    "category": "Home",
                    "paymentType": "Credit card",
                    "comments": ""
                }
            ]
        }
      return user
    }

    async getUserDetailsById(uid:string) : Promise<any>{
       const q = query(collection(this.fireBasedb,'users'),where('UID', '==', uid))
       const querySnapshot = await getDocs(q);
       querySnapshot.forEach( (doc) => {
          const user = (doc.id, "===>", doc.data())
          this.setCurrentUser = user
       })
       console.log(this.setCurrentUser)
      return  new Promise( (resolve, reject) => {
           resolve(this.setCurrentUser)
       })
    }

   async addCategory(uid: string,category:string) {
      let id =""
      const q = query(collection(this.fireBasedb,'users'),where('UID', '==', uid))
       const querySnapshot = await getDocs(q);
       querySnapshot.forEach( (doc) => {
          this.setCurrentUser = (doc.id, "===>", doc.data())
          id = doc.id
       })
      this.setCurrentUser.categories.push(category)
      const docRef = doc(this.fireBasedb, this.collectionName, id);
      setDoc(docRef,this.setCurrentUser).then((data) =>{
        console.log("updated succesfully")
      })
    }

    async removeCategory(uid:string,category:string){
      let id =""
      const q = query(collection(this.fireBasedb,'users'),where('UID', '==', uid))
       const querySnapshot = await getDocs(q);
       querySnapshot.forEach( (doc) => {
          this.setCurrentUser = (doc.id, "===>", doc.data())
          id = doc.id
       })
      const index = this.setCurrentUser.categories.indexOf(category)
      this.setCurrentUser.categories.splice(index,1)
      const docRef = doc(this.fireBasedb, this.collectionName, id);
      setDoc(docRef,this.setCurrentUser).then((data) =>{
        console.log("Removed succesfully")
      })
    }

    async addExpense(uid:string,expense:Object){
      let id =""
      const q = query(collection(this.fireBasedb,'users'),where('UID', '==', uid))
       const querySnapshot = await getDocs(q);
       querySnapshot.forEach( (doc) => {
          this.setCurrentUser = (doc.id, "===>", doc.data())
          id = doc.id
       })

       if(this.setCurrentUser.expenses){
        this.setCurrentUser.expenses.push(expense)
        }
        else{
          this.setCurrentUser.expenses = []
          this.setCurrentUser.expenses.push(expense)
        }
       const docRef = doc(this.fireBasedb, this.collectionName, id);
       setDoc(docRef,this.setCurrentUser).then((data) =>{
         console.log("updated succesfully")
       })
    }

    async onValueChanges(uid:string):Promise<any>{
      let changedData:any
      const q = query(collection(this.fireBasedb, "users"), where("UID", "==", uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change)
          if (change.type === "added" || change.type === "modified" || change.type === "removed" ) {
              console.log("User details changed ", change.doc.data());
              console.log(change.type)
              changedData = change.doc.data()
          }
        });
      });
      return  new Promise( (resolve, reject) => {
        resolve(changedData)
        return changedData
    })
  }
    

}