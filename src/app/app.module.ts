import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../core/header/header.component';
import { FooterComponent } from '../core/footer/footer.component';
import { NgxBootstrapIconsModule, codeSlash, github } from 'ngx-bootstrap-icons';
import { alarm, alarmFill, alignBottom,list,linkedin } from 'ngx-bootstrap-icons';


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
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,   
    NgxBootstrapIconsModule.pick(icons)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
