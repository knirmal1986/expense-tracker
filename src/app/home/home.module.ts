import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module'


// const icons = {
//   alarm,
//   alarmFill,
//   alignBottom,
//   list,
//   linkedin,
//   personCircle,
//   starFill
// };

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class HomeModule { }
