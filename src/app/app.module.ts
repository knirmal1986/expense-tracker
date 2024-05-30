import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../core/header/header.component';
import { FooterComponent } from '../core/footer/footer.component';
import { ColorTheme, NgxBootstrapIconsModule, codeSlash, github, personCircle } from 'ngx-bootstrap-icons';
import { alarm, alarmFill, alignBottom,list,linkedin } from 'ngx-bootstrap-icons';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDvPFvPb2jeTOXqow6ToTGgdbfzR1wtYng",
  authDomain: "expensetracker-9feec.firebaseapp.com",
  projectId: "expensetracker-9feec",
  storageBucket: "expensetracker-9feec.appspot.com",
  messagingSenderId: "918664489535",
  appId: "1:918664489535:web:c20b48f0faecbb45f1668a"
};



const icons = {
  alarm,
  alarmFill,
  alignBottom,
  list,
  linkedin,
  github,
  codeSlash,
  personCircle
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
    SharedModule,
    NgxBootstrapIconsModule.pick(icons, { 
      width: '2em', 
      height: '2em', 
      theme: ColorTheme.Info,
  }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
