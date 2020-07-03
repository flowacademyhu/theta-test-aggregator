import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ApiKeyManagerComponent } from './components/api-key-manager/api-key-manager.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './components/user-list/user-list.component';
import { NotificationsPipe } from './pipes/notifications.pipe';
import { ConfirmDeleteModalComponent } from './modals/confirm-delete-modal/confirm-delete-modal.component';
import { AuthGuard } from './auth.guard';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ProfileUpdateModalComponent } from './modals/profile-update-modal/profile-update-modal.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { UsersResolver } from './resolvers/users.resolver';
import { TestResultsComponent } from './components/test-results/test-results.component';
import { TestStatusDirective } from './directives/test-status.directive';
import { FiltersComponent } from './components/filters/filters.component';
import { TestDetailsComponent } from './components/test-details/test-details.component';
import { TestResolver } from './resolvers/test.resolver'
import { ConfirmInvalidateModalComponent } from "./modals/confirm-invalidate-modal/confirm-invalidate-modal.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent, resolve: {users: UsersResolver}, canActivate: [AuthGuard] },
  { path: 'profile', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'api-key-manager', component: ApiKeyManagerComponent, canActivate: [AuthGuard]},
  { path: 'index', component: TestResultsComponent, canActivate: [AuthGuard] },
  { path: 'test/:id', component: TestDetailsComponent, resolve: {test: TestResolver} },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    NotificationsPipe,
    UserListComponent,
    ConfirmDeleteModalComponent,
    HeaderComponent,
    UserComponent,
    SettingsComponent,
    ApiKeyManagerComponent,
    AddUserComponent,
    UpdateUserComponent,
    ProfileUpdateModalComponent,
    TestResultsComponent,
    TestStatusDirective,
    FiltersComponent,
    TestDetailsComponent,
    ConfirmInvalidateModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
