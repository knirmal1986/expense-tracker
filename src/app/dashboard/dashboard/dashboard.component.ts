import { Component, OnInit, inject } from '@angular/core';
import { DatabaseService } from 'src/services/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  setUser:any
  private dbService:DatabaseService
  constructor(){
    this.dbService=inject(DatabaseService)

  }
  ngOnInit(): void {
    this.setUser = this.dbService.getUserDetailsById("GbN4TvyrjfRdwGXCn38URDLBAoE2")
    console.log(this.setUser)

  }

}
