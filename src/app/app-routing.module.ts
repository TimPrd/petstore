import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './helpers/guards/auth.guard';
import { PetStoreComponent } from './pet-store/pet-store.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: 'signup',
    component: AuthComponent
  }, {
    path: 'signin',
    component: AuthComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'store/:id',
    component: PetStoreComponent,
    outlet: 'side',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
