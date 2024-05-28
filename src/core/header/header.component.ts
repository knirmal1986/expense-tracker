import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/services/auth-firebase.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn :boolean = false
  navbarText = "Log in"

  private authService: AuthFirebaseService
  
  constructor(private router:Router ){
    this.authService = inject(AuthFirebaseService)
  }


  ngOnInit(): void {
    if(this.authService.checkIfLoggedIn()){
      this.isLoggedIn=true
    }
    else{
      this.isLoggedIn=false
    }
  }

  logOut(){
    this.authService.signOut().then((data) =>{
      console.log(data)
      window.localStorage.removeItem("username"); 
      alert("Logged out successfully")
      this.router.navigate(['/login'])
    }).catch((error) =>{
      alert(error)
    })
  }

  login(){
    this.router.navigate(["/login"])
  }
}
