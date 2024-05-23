import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from '../sign-up/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from 'src/services/login.service';



@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[LoginService],
  exports:[
    CommonModule,
    FormsModule
  ]
})
export class SignUpModule { }
