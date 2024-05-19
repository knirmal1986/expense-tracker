import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../core/header/header.component';
import { FooterComponent } from '../core/footer/footer.component';
import { NgxBootstrapIconsModule, codeSlash, github } from 'ngx-bootstrap-icons';
import { alarm, alarmFill, alignBottom,list,linkedin } from 'ngx-bootstrap-icons';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { initializeApp } from 'firebase/app';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu-ENtKyuFDfKeDPfKwDNqcQgpvL233bE",
  authDomain: "expense-tracker-bf63f.firebaseapp.com",
  projectId: "expense-tracker-bf63f",
  storageBucket: "expense-tracker-bf63f.appspot.com",
  messagingSenderId: "906585800422",
  appId: "1:906585800422:web:c725e6016e7fb83c23c527"
};

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
    NgxBootstrapIconsModule.pick(icons),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
