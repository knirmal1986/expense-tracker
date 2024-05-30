import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from '../sign-up/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { LoginJsonService } from 'src/services/login-json.service';



@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[LoginJsonService],
  exports:[
    CommonModule,
    FormsModule
  ]
})
export class SignUpModule { }
