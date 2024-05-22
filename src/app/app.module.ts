import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../core/header/header.component';
import { FooterComponent } from '../core/footer/footer.component';
import { NgxBootstrapIconsModule, codeSlash, github } from 'ngx-bootstrap-icons';
import { alarm, alarmFill, alignBottom,list,linkedin } from 'ngx-bootstrap-icons';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { SharedModule } from './shared/shared.module';


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
   // FormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    LoginModule,
    SignUpModule,
    // SharedModule,
    NgxBootstrapIconsModule.pick(icons),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
