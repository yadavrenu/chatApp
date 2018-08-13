import { UserDataTransferService } from '../user-data-transfer.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
// import { setInterval } from 'timers';


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
  channelFound:any=[];
  searchList:any=[];
  bool:boolean;
  identity:string;
  messageList:Array<any>=[];
  currentChannel;
  showOrNot:boolean=false;
  intervalId;
  
  
  constructor( private data: UserDataTransferService,private route:Router) { }
  

  create(name){
    if(name){
      let sub=this.data.createChannel(name);
      sub.subscribe(Data=>console.log(Data),err=>{
        alert("A channel with this name already exist");
        console.log(err)});
      this.channelName="";
      this.joinChannel(name);
    }
    
                      
  }

  // viewChannelList(){
  //   let sub=this.data.viewChannels();
  //   sub.subscribe(Data=>{this.channelList=Data;
  //      console.log(this.channelList)});
  // }

  viewChannelList(){
    this.channelList.push("general");
    let sub=this.data.viewChannels();//array of all existing channels within the service
    sub.subscribe(Data=>{
      console.log(Data);
      Data.channels.forEach(element => {
        let uniqueName=element.unique_name;
        let channelData=this.data.allMembers(uniqueName); 
        channelData.subscribe(data=>{
          console.log(data);
          data.members.forEach(elem=>{
            if(element.unique_name!="general"){
            if(elem.identity==this.identity){    //we only want the channels in which we are members
              this.channelList.push(element.unique_name);
              console.log("This is the list",this.channelList);
            }
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
    this.channelFound.length=0;
    var re = new RegExp(this.searchChannelName,'i');
    if(this.searchChannelName.length>=3){
    // this.channelFound.length=0;
    sub.subscribe(Data=>{console.log(Data);
                this.bool=false;
                 for(let index=0;index<Data.channels.length;index++){
                   this.searchList.push(Data.channels[index].unique_name)
                 }
                 for(let index=0,i=0;index<Data.channels.length;index++)
                { 
                  // if(this.searchList[index]==this.searchChannelName)
                  if(re.test(this.searchList[index]))
                  {
                    // console.log("Channel Found");
                    this.channelFound[i++]=this.searchList[index];
                    // this.channelFound=this.searchChannelName;
                    this.bool=true;
                  }

                }});
              }
              else{
                this.channelFound.length=0;
              }
  }

  joinChannel(name){

    let sub=this.data.addMember(this.identity,name);
    sub.subscribe(Data=>console.log(Data),err=>{console.log(err)});
  }

  sendMessage(){
    if(this.messageBody){
      let sub=this.data.sendMess(this.messageBody,this.myData.name,this.currentChannel);
      sub.subscribe(Data=>console.log(Data),err=>{console.log(err)});
      // setTimeout(this.recieveMessage(this.currentChannel),5000);
      this.messageBody="";
    }
    
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

  // thisChannelEvents(channel){
  // this.currentChannel=channel;


  // }

  recieveMessage(channel){
  this.currentChannel=channel;
    this.showOrNot=true;
    this.messageList.length=0;
    let sub=this.data.recMess(channel);
    var index=0;
    var messageCount;
    sub.subscribe(Data=>{
      console.log(Data);
      messageCount=Data.messageCount;
      Data.messages.forEach(message=>{
      this.messageList[index++]=message;
      })
    },err=>{console.log(err)});

    let newMessage=new Observable(message=>{
      setInterval(()=>{
        let msg=this.data.recMess(channel);
        msg.subscribe(next=>{
       
          if(next.messageCount>messageCount){
            let subMsg=this.data.recMess(channel);
            subMsg.subscribe(data=>{
              for(let i=messageCount;i<next.messageCount;i++)
              {
                this.messageList[index++]=data;
              }
            }
            )
            this.recieveMessage(channel);
          }

        })
        
      },5000)
    })

  }


  selfOrNot(message){
    if(message.from==this.identity)
    return true;
    return false;

  }

  logOut(){
    this.myData=null;
    this.route.navigate(['']);
    localStorage.clear();
  }

  // delChannel(){
  //   let sub=this.data.deleteChannel();
  //   sub.subscribe(Data=>console.log(Data));
  // }

  ngOnInit() {
    // this.myData=this.data.getData();
    this.myData=JSON.parse(localStorage.getItem("userData"));
    console.log(this.myData.name,this.myData.id); 
    this.identity=this.myData.name; 
    this.recieveMessage("general");
    this.viewChannelList();
    // this.intervalId=setInterval(()=>{
    //   this.recieveMessage(this.currentChannel);
    // },5000);
    if(!this.checkUser()){
      this.createUser();
    }
    
  }

  ngOnDestroy(){
  
    clearInterval(this.intervalId);
  }

}
