import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { database } from 'ngx-bootstrap-icons';
import { Observable,map } from 'rxjs';
import { AuthFirebaseService } from 'src/services/auth-firebase.service';
import { DatabaseService } from 'src/services/database.service';
import { LoginService } from 'src/services/login.service';


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
  private loginService:LoginService
  constructor(private router:Router){
    this.authService = inject(AuthFirebaseService)
    this.dbService=inject(DatabaseService)
    this.loginService = inject(LoginService)
  }
  
  ngOnInit(): void {
    if(!this.loginService.checkIfLoggedIn()){
      alert("Please login")
      this.router.navigate(['/login'])
    }else{
      
    }
  }
}