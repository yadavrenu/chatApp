import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from '../../node_modules/rxjs'
import { HttpHeaders } from '../../node_modules/@angular/common/http';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataTransferService {

  data;
  url="https://chat.twilio.com/v2/Services/";
  SID="IS58779b4f777a454e99bba4781cd7e6cb";


  constructor(private http:HttpClient) { }

  options={
    headers : new HttpHeaders({ 
     'Content-Type' :'application/x-www-form-urlencoded',
     "Authorization" : "Basic QUNlMjliMTg3YjNjMjNhMzRjODk4MTRmZmMyZjE0NTQyMzo5ZDkxYzJkMThlMmE3MjE0ZWU1NDExODhlZjk4MWQwYQ=="
   })}


  createChannel(channelName):Observable<any>{
    return this.http.post(this.url+this.SID+"/Channels","FriendlyName=firstService&UniqueName="+channelName,this.options);
  }
 
 viewChannels():Observable<any>{
   return this.http.get(this.url+this.SID+"/Channels",this.options);
  }

  // deleteChannel(){
  //   return this.http.delete(this.url+this.SID+"/Channels/id",this.options);
  // }

  addMember(){
    return this.http.post(this.url+this.SID+"/Channels/CHd5c006a3efe341f3aa289c96e059d195/Members/","Identity=Renu",this.options);
  }

  sendMess(message){
    let CSID="CH320e11f132624bf7b6d79783e6ab90c8";
    let new_url=this.url+this.SID+"/Channels/"+CSID+"/Messages/";
    return this.http.post(new_url,"&Body="+message,this.options);
  }

  // recMess(){

  // }

  setData(userData){
    this.data=userData;
  }

  getData(){
    return this.data;
  }

}
