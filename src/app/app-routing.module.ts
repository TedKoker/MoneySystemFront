import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './authontication/register/register.component';
import { LoginComponent } from './authontication/login/login.component';
import { AddComponent } from './main-user-screen/money-table/add/add.component';
import { AuthGuard } from './Guards/authGuard';
import { MainUserScreenComponent } from './main-user-screen/main-user-screen.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'addNew',
    component: AddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'moneyPerMonth',
    component: MainUserScreenComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
