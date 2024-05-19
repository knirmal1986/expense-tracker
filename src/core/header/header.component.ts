import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn :boolean = false
  navbarText = "Log in"

  ngOnInit(): void {
    if(this.isLoggedIn){
      this.navbarText = "Log out"
    }
  }


}
