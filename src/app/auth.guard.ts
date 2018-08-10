import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataTransferService } from './user-data-transfer.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  data=null;

  constructor(private auth:UserDataTransferService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

   this.data= this.auth.getData();
   if(this.data===null)  
    return false;

    return true;
  }
}
