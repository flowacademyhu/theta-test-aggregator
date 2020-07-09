import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
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
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ChartsModule } from 'ng2-charts';
import { ApiKeyResolver } from './resolvers/apiKeys.resolver';
import { FiltersComponent } from './components/filters/filters.component';
import { TestDetailsComponent } from './components/test-details/test-details.component';
import { TestResolver } from './resolvers/test.resolver';
import { AddApikeyModalComponent } from './modals/add-apikey-modal/add-apikey-modal.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { ConfirmInvalidateModalComponent } from './modals/confirm-invalidate-modal/confirm-invalidate-modal.component';
import { PayloadTextPrettifyPipe } from './pipes/payload-text-prettify.pipe';
import { BackButtonDirective } from './directives/back-button.directive';
import { RouteReuseService } from './services/route-reuse.service';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent, resolve: { users: UsersResolver }, canActivate: [AuthGuard] },
  { path: 'profile', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'api-key-manager', component: ApiKeyManagerComponent, resolve: {apikeys: ApiKeyResolver}, canActivate: [AuthGuard]},
  { path: 'index', component: TestResultsComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'index', component: TestResultsComponent, canActivate: [AuthGuard] },
  { path: 'test/:id', component: TestDetailsComponent, resolve: { test: TestResolver }, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'index', pathMatch: 'full' }
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
    ApiKeyManagerComponent,
    AddUserComponent,
    UpdateUserComponent,
    ProfileUpdateModalComponent,
    TestResultsComponent,
    TestStatusDirective,
    StatisticsComponent,
    TestDetailsComponent,
    AddApikeyModalComponent,
    FiltersComponent,
    TestDetailsComponent,
    ConfirmInvalidateModalComponent,
    PayloadTextPrettifyPipe,
    BackButtonDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ChartsModule,
    SocialLoginModule,
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue:
        {
          autoLogin: false,
          providers:
            [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(environment.GoogleLoginProvider)
              },
            ],
        } as SocialAuthServiceConfig,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReuseService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
