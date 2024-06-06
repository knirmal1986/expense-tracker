import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { SignUpComponent } from './sign-up/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'dashboard',loadChildren:() =>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path:'home', loadChildren: () => import('./home/home.module').then( m => m.HomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }