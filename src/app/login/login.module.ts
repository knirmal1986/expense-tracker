import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginJsonService } from 'src/services/login-json.service';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[LoginJsonService],
  exports : [
    CommonModule,
    FormsModule
  ]
})
export class LoginModule { }