import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapIconsModule, codeSlash, github } from 'ngx-bootstrap-icons';
import { alarm, alarmFill, alignBottom,list,linkedin } from 'ngx-bootstrap-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



const icons = {
  alarm,
  alarmFill,
  alignBottom,
  list,
  linkedin,
  github,
  codeSlash
};


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    NgxBootstrapIconsModule,
  ],
  exports:[
    CommonModule,
    NgxBootstrapIconsModule,
  ]
})
export class SharedModule { }
