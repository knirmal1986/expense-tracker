import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapIconsModule, codeSlash, github, personCircle } from 'ngx-bootstrap-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    NgbModule,
    NgxBootstrapIconsModule
  ],
  exports:[
    NgxBootstrapIconsModule,
  ]
})
export class SharedModule { }
