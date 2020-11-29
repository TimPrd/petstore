import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {JwtInterceptor} from './helpers/interceptors/jwt.interceptor';
import { PetStoreComponent } from './pet-store/pet-store.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateStoreComponent } from './pet-store/create/create-store.component';
import { CardComponent } from './pet/card/card.component';
import { SellerLayoutComponent } from './layouts/seller-layout/seller-layout.component';
import { BuyerLayoutComponent } from './layouts/buyer-layout/buyer-layout.component';
import { PetListComponent } from './pet/list/list.component';
import { HeaderComponent } from './header/header.component';
import { PetStoreListComponent } from './pet-store/list/list.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    PetStoreComponent,
    CreateStoreComponent,
    CardComponent,
    SellerLayoutComponent,
    BuyerLayoutComponent,
    PetListComponent,
    HeaderComponent,
    PetStoreListComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
