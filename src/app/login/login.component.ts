import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { UserDataTransferService } from '../user-data-transfer.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService,
    private data: UserDataTransferService,
    private route:Router
) { }

public socialSignIn(socialPlatform: string) {
  let socialPlatformProvider;
  if (socialPlatform == "google") {
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  }
  this.socialAuthService.signIn(socialPlatformProvider).then(
    (userData) => {
      console.log(socialPlatform + " sign in data : ", userData);
      this.data.setData(userData);
      // localStorage.setItem("userData",JSON.stringify(userData));
      this.route.navigate(['/startChat']);
      // Now sign-in with userData
      // ...


    }
  );
}

  ngOnInit() {
  }

}
