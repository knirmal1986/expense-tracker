import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { database } from 'ngx-bootstrap-icons';
import { Observable,map } from 'rxjs';
import { AuthFirebaseService } from 'src/services/auth-firebase.service';
import { DatabaseService } from 'src/services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  loadingUserInformation:boolean= true
  loggedInUserDetails:any
  category:string =""
  private authService:AuthFirebaseService
  private dbService:DatabaseService
  constructor(private router:Router){
    this.authService = inject(AuthFirebaseService)
    this.dbService=inject(DatabaseService)
  }
  
  ngOnInit(): void {
    if(!this.authService.checkIfLoggedIn()){
      alert("Please login")
      this.router.navigate(['/login'])
    }else{
      this.dbService.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe(data =>{
        this.loggedInUserDetails = data.filter(function (record:any){
          return record.UID == window.localStorage.getItem("username")
        })
        this.loggedInUserDetails = this.loggedInUserDetails[0]
        console.log(this.loggedInUserDetails)
      })
    }
}


addNewCategory(){
  // this.dbService.saveNewCategory(this.category)
}

displayAllCategories(){
  
}

}
