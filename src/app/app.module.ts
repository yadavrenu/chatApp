import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from "angular-6-social-login";

import { AppComponent } from './app.component';
import {  Routes, RouterModule } from '@angular/router';
import { StartChatComponent } from './start-chat/start-chat.component';

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
    StartChatComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    RouterModule.forRoot([
      {
        path:'startChat',
        component: StartChatComponent
      }
    ])
  ],
  providers: [{ provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs}],
  bootstrap: [AppComponent]
})
export class AppModule { }
