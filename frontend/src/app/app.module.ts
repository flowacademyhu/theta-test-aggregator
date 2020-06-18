import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ApiKeyManagerComponent } from './components/api-key-manager/api-key-manager.component',
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "profile", component: UserComponent },
  { path: "settings", component: SettingsComponent },
  { path: "api-key-manager", component: ApiKeyManagerComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    UserComponent,
    SettingsComponent,
    ApiKeyManagerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
