import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AuthonticationComponent } from './authontication/authontication.component';
import { LoginComponent } from './authontication/login/login.component';
import { RegisterComponent } from './authontication/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainUserScreenComponent } from './main-user-screen/main-user-screen.component';
import { AddComponent } from './main-user-screen/money-table/add/add.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LoadingComponent } from './generalComponents/loading/loading.component';
import { AModule } from './aMaterial.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoneyTableComponent } from './main-user-screen/money-table/money-table.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    AuthonticationComponent,
    LoginComponent,
    RegisterComponent,
    MainUserScreenComponent,
    AddComponent,
    NavBarComponent,
    LoadingComponent,
    MoneyTableComponent
  ],
  imports: [
    NgbModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        whitelistedDomains: ['localhost:44318/'],
        authScheme: 'JWT'
      }
    }),
    BrowserAnimationsModule,
    AModule,
    AngularFontAwesomeModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
