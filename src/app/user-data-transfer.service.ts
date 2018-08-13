import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from '../../node_modules/rxjs'
import { HttpHeaders } from '../../node_modules/@angular/common/http';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataTransferService {

  data=null;
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

  addMember(memberName,channelName){
    return this.http.post(this.url+this.SID+"/Channels/"+channelName+"/Members/","Identity="+memberName,this.options);
  }

  allChannels(userName):Observable<any>{

    return this.http.get(this.url+this.SID+"/Users/"+userName+"/Channels",this.options)
  }

  sendMess(message,name,CSID){
    
    let new_url=this.url+this.SID+"/Channels/"+CSID+"/Messages/";
    return this.http.post(new_url,"&Body="+message+"&From="+name,this.options);
  }

  allMembers(CSID):Observable<any>{
    // let CSID="CH73e740a984cb4b809b896c998be80b59";
    return this.http.get(this.url+this.SID+"/Channels/"+CSID+"/Members",this.options);
  }

  newUser(Identity){
    return this.http.post(this.url+this.SID+"/Users","Identity="+Identity,this.options);
  }

  recMess(channel):Observable<any>{
    return this.http.get(this.url+this.SID+"/Channels/"+channel+"/Messages",this.options);
  }

  // setData(userData){
  //   this.data=userData;
  // }

  allUsers():Observable<any>{
    return this.http.get(this.url+this.SID+"/Users",this.options);
  }

  // getData(){
  //   return this.data;
  // }

}
