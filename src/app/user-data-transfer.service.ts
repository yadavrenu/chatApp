import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataTransferService {

  data;

  constructor() { }

  setData(userData){
    this.data=userData;
  }

  getData(){
    return this.data;
  }

}
