import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './components/login/login.component';
import {AngularMaterialModule} from './angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoggedInComponent} from './components/logged-in/logged-in.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {UserRole} from './models/user.model';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'logged-in',
    canActivate: [AuthGuard],
    data: { role: [UserRole.USER] [UserRole.ADMIN] },
    component: LoggedInComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoggedInComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
