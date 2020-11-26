import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './helpers/guards/auth.guard';
import { PetStoreComponent } from './pet-store/pet-store.component';
const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  }, {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'store/:id',
    component: PetStoreComponent,
    outlet: 'side'
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
