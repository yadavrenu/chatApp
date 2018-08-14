import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard'
import { FormsModule } from '@angular/forms'
import { LoadingModule } from 'ngx-loading';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from "angular-6-social-login";

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StartChatComponent } from './start-chat/start-chat.component';
import { LoginComponent } from './login/login.component';
import { DoesnotexistComponent } from './doesnotexist/doesnotexist.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("957247841881-m38e7uvoqv9pvmdogg856tcb06ekg5so.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    StartChatComponent,
    LoginComponent,
    DoesnotexistComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpModule,
    HttpClientModule,
    LoadingModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:'',
        component: LoginComponent
      },
      {
        path:'startChat',
        component: StartChatComponent,
        canActivate:[AuthGuard]
      },
      {
        path: '**',
        component: DoesnotexistComponent
      }
    ])
  ],
  providers: [{ provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs},AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
