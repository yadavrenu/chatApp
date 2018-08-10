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
  messageList:Array<any>=[];
  
  
  constructor( private data: UserDataTransferService) { }
  

  create(){
    let sub=this.data.createChannel(this.channelName);
    sub.subscribe(Data=>console.log(Data),err=>{console.log(err)});
    this.channelName="";
                      
  }

  // viewChannelList(){
  //   let sub=this.data.viewChannels();
  //   sub.subscribe(Data=>{this.channelList=Data;
  //      console.log(this.channelList)});
  // }

  viewChannelList(){
    let sub=this.data.viewChannels();//array of all existing channels within the service
    sub.subscribe(Data=>{
      console.log(Data);
      Data.channels.forEach(element => {
        let uniqueName=element.unique_name;
        let channelData=this.data.allMembers(uniqueName); 
        channelData.subscribe(data=>{
          console.log(data);
          data.members.forEach(elem=>{
            if(elem.identity==this.identity){    //we only want the channels in which we are members
              this.channelList.push(element.unique_name);
              console.log("This is the list",this.channelList);
            }
          })
        })
        
      });
    });
  }

  // viewChannelList(){
  //   let sub=this.data.allChannels(this.identity);
  //   sub.subscribe(data=>{

  //     data.channels.forEach(element=>{
  //       this.channelList.push(element.name);
  //     })

  //   })
  // }

  Search(){
    let sub=this.data.viewChannels();
    sub.subscribe(Data=>{console.log(Data);
                this.bool=false;
                 for(let index=0;index<Data.channels.length;index++){
                   this.searchList.push(Data.channels[index].unique_name)
                 }
                 for(let index=0;index<Data.channels.length;index++)
                { if(this.searchList[index]==this.searchChannelName)
                  {
                    console.log("Channel Found");
                    this.channelFound=this.searchChannelName;
                    this.bool=true;
                  }

                }});
  }

  joinChannel(){
    let sub=this.data.addMember(this.identity,this.channelFound);
    sub.subscribe(Data=>console.log(Data),err=>{console.log(err)});
  }

  sendMessage(){
    let sub=this.data.sendMess(this.messageBody,this.myData.name);
    sub.subscribe(Data=>console.log(Data),err=>{console.log(err)});
    this.messageBody="";
  }

  createUser(){
    let sub=this.data.newUser(this.identity);
    console.log("user created")

  }
  checkUser(){
    let sub=this.data.allUsers();
    sub.subscribe(Data=>{
      Data.users.forEach(element=>{
        if(element.identity==this.identity)
        {
          console.log("this user exists");
          return true
        }
      })
      console.log("this user doesn't exist");
      return false;
      
    });
  }

  recieveMessage(channel){
    let sub=this.data.recMess(channel);
    var index=0;
    sub.subscribe(Data=>{
      console.log(Data);
      Data.messages.forEach(message=>{
      this.messageList[index++]=message;
      // this.messageList[index++].from=message.from;
      })
    },err=>{console.log(err)});
  }

  // delChannel(){
  //   let sub=this.data.deleteChannel();
  //   sub.subscribe(Data=>console.log(Data));
  // }

  ngOnInit() {
    this.myData=this.data.getData();
    console.log(this.myData.name,this.myData.id); 
    this.identity=this.myData.name; 
    if(!this.checkUser()){
      this.createUser();
    }
    
  }

}
