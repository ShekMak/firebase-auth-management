import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AngularFireAuthGuard],
        data: {
          authGuardPipe: redirectLoggedInToHome
        }
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AngularFireAuthGuard],
        data: {
          authGuardPipe: redirectUnauthorizedToLogin
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
