import { UserDataTransferService } from '../user-data-transfer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-chat',
  templateUrl: './start-chat.component.html',
  styleUrls: ['./start-chat.component.css']
})
export class StartChatComponent implements OnInit {

  identity:string='111584940250339239598';

  myData;
  channelDetails:any;
  channelName:string;
  messageBody:string;
  channelList:any=[];
  searchChannelName:string;
  channelFound:string;
  
  constructor( private data: UserDataTransferService) { }


  create(){
    let sub=this.data.createChannel(this.channelName);
    sub.subscribe(Data=>console.log(Data),err=>{console.log(err)});
                      
  }

  viewChannelList(){
    let sub=this.data.viewChannels();
    sub.subscribe(Data=>{this.channelList=Data;
       console.log(this.channelList)});
  }

  Search(){
    let sub=this.data.viewChannels();
    sub.subscribe(Data=>{console.log(Data)
                 for(let index=0;index<Data.channels.length;index++){
                   this.channelList.push(Data.channels[index].unique_name)
                 }
                 for(let index=0;index<Data.channels.length;index++)
                { if(this.channelList[index]==this.searchChannelName)
                  {
                    console.log("Channel Found");
                    this.channelFound=this.searchChannelName;

                  }

                }});
  }

  joinChannel(){
    let sub=this.data.addMember();
    sub.subscribe(Data=>console.log(Data),err=>{console.log(err)});
  }

  sendMessage(){
    let sub=this.data.sendMess(this.messageBody);
    sub.subscribe(Data=>console.log(Data),err=>{console.log(err)});
    this.messageBody="";
  }

  // recieveMessage(){
  //   let sub=this.data.recMess();
  //   sub.subscribe(Data=>console.log(Data),err=>{console.log(err)});
  // }

  // delChannel(){
  //   let sub=this.data.deleteChannel();
  //   sub.subscribe(Data=>console.log(Data));
  // }

  ngOnInit() {
    this.myData=this.data.getData();
    console.log(this.myData.name);  
  }

}
