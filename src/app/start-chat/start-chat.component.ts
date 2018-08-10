import { UserDataTransferService } from '../user-data-transfer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-chat',
  templateUrl: './start-chat.component.html',
  styleUrls: ['./start-chat.component.css']
})
export class StartChatComponent implements OnInit {



  myData;
  channelDetails:any;
  channelName:string;
  messageBody:string;
  channelList:any=[];
  searchChannelName:string;
  channelFound:string;
  searchList:any=[];
  bool:boolean;
  identity:string;
  
  
  constructor( private data: UserDataTransferService) { }
  

  create(){
    let sub=this.data.createChannel(this.channelName);
    sub.subscribe(Data=>console.log(Data),err=>{console.log(err)});
                      
  }

  // viewChannelList(){
  //   let sub=this.data.viewChannels();
  //   sub.subscribe(Data=>{this.channelList=Data;
  //      console.log(this.channelList)});
  // }

  viewChannelList(){
    let sub=this.data.viewChannels();//array of all existing channels within the service
    sub.subscribe(Data=>{
      Data.channels.forEach(element => {

        let channelData=this.data.allMembers(); //we only want the channels in which we are members
        channelData.subscribe(data=>{
          data.members.forEach(elem=>{
            if(elem.identity==this.identity){
              this.channelList.push(element.unique_name);
              console.log("This is the list",this.channelList);
            }
          })
        })
        
      });
    });
  }

  Search(){
    let sub=this.data.viewChannels();
    sub.subscribe(Data=>{console.log(Data);
      this.bool=false;
                 for(let index=0;index<Data.channels.length;index++){
                   this.searchList.push(Data.channels[index].unique_name)
                 }
                 for(let index=0;index<Data.channels.length;index++)
                { if(this.channelList[index]==this.searchChannelName)
                  {
                    console.log("Channel Found");
                    this.channelFound=this.searchChannelName;
                    this.bool=true;
                  }

                }});
  }

  joinChannel(){
    let sub=this.data.addMember(this.myData.id,this.channelFound);
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
    console.log(this.myData.name,this.myData.id); 
    this.identity=this.myData.id; 
  }

}
