import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AuthonticationComponent } from './authontication/authontication.component';
import { LoginComponent } from './authontication/login/login.component';
import { RegisterComponent } from './authontication/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthonticationComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
