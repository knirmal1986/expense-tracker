import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/services/auth-firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  private authService:AuthFirebaseService

  constructor(private router:Router){
    this.authService = inject(AuthFirebaseService)
  }
  
  ngOnInit(): void {
    if(!this.authService.checkIfLoggedIn()){
      alert("Please login")
      this.router.navigate(['/login'])
    }
}
}
