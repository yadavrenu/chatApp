import { UserDataTransferService } from '../user-data-transfer.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-start-chat',
  templateUrl: './start-chat.component.html',
  styleUrls: ['./start-chat.component.css']
})
export class StartChatComponent implements OnInit {

  myData;
  channelDetails: any;
  channelName: string;
  messageBody: string;
  channelList: any = [];
  searchChannelName: string;
  channelFound: any = [];
  searchList: any = [];
  bool: boolean;
  identity: string;
  messageList: Array<any> = [];
  currentChannel = "general";
  showOrNot: boolean = false;
  intervalId;
  messageCount = 0;


  constructor(private data: UserDataTransferService, private route: Router) { }

  viewChannelList() {
    this.channelList.length = 0;
    this.channelList.push("general");
    let sub = this.data.viewChannels();//array of all existing channels within the service
    sub.subscribe(Data => {
      console.log(Data);
      Data.channels.forEach(element => {
        let uniqueName = element.unique_name;
        let channelData = this.data.allMembers(uniqueName);
        channelData.subscribe(data => {
          console.log(data);
          data.members.forEach(elem => {
            if (element.unique_name != "general") {
              if (elem.identity == this.identity) {    //we only want the channels in which we are members
                this.channelList.push(element.unique_name);
                console.log("This is the list", this.channelList);
              }
            }
          })
        })

      });
    });
  }

  joinChannel(name) {
    var flag;
    for(let channel of this.channelList) {
      if(channel==name)
      {
      flag=false;
      break;
      }
      else
      flag=true;
      
    }
    if(flag){
    let sub = this.data.addMember(this.identity, name);
    sub.subscribe(Data => console.log(Data), err => { console.log(err) });
    alert("Joined channel : "+name);
    this.showOrNot=false;
    this.searchChannelName="";
    this.viewChannelList(); //refresh the channel list
    }
    else{
      alert("You already are a member of this channel");
      this.showOrNot=false;
      this.searchChannelName="";
    }
}

  create(name) {
    if (name) {
      let sub = this.data.createChannel(name);
      sub.subscribe(Data => {
        console.log(Data);
        this.joinChannel(name); //auto-join the channel you have created
      }, err => {
        alert("A channel with this name already exist");
      });
      this.channelName = "";
    }


  }

  Search() {

    let sub = this.data.viewChannels();
    this.showOrNot=true;
    this.channelFound.length = 0; //clears the channel list
    var re = new RegExp(this.searchChannelName, 'i');
    if (this.searchChannelName.length >= 3) {
      sub.subscribe(Data => {
        console.log(Data);
        this.bool = false;
        for (let index = 0; index < Data.channels.length; index++) {
          this.searchList.push(Data.channels[index].unique_name)
        }
        for (let index = 0, i = 0; index < Data.channels.length; index++) {
          // if(this.searchList[index]==this.searchChannelName)
          if (re.test(this.searchList[index])) {
            // console.log("Channel Found");
            this.channelFound[i++] = this.searchList[index];
            // this.channelFound=this.searchChannelName;
            this.bool = true;
          }

        }
      });
    }
    else {
      this.channelFound.length = 0;
    }
  }


  sendMessage() {
    if (this.messageBody) {
      let sub = this.data.sendMess(this.messageBody, this.myData.name, this.currentChannel);
      sub.subscribe(Data => console.log(Data), err => { console.log(err) });
      this.messageBody = "";
    }

  }

  createUser() {
    let sub = this.data.newUser(this.identity);
  }
  checkUser() {
    let sub = this.data.allUsers();
    sub.subscribe(Data => {
      Data.users.forEach(element => {
        if (element.identity == this.identity) {
          return true
        }
      })
      return false;

    });
  }

  recieveMessage(channel) {
    this.currentChannel = channel;
    // this.showOrNot = true;
    this.messageList.length = 0;
    let sub = this.data.recMess(channel);
    var index = 0;
    sub.subscribe(Data => {
      console.log(Data);
      Data.messages.forEach(message => {
        this.messageList[index++] = message;
      })
      this.messageCount = index; //store message count to checking if new messages have arrived
    }, err => { console.log(err) });

  }

  selfOrNot(message) { //check if the message is from self or someone else
    if (message.from == this.identity)
      return true;
    return false;

  }

  logOut() {
    this.myData = null;
    this.route.navigate(['']);
    localStorage.clear();
  }

  // delChannel(){
  //   let sub=this.data.deleteChannel();
  //   sub.subscribe(Data=>console.log(Data));
  // }

  ngOnInit() {
    this.myData = JSON.parse(localStorage.getItem("userData"));
    console.log(this.myData.name, this.myData.id);
    // this.joinChannel("general");
    this.identity = this.myData.name;
    this.recieveMessage("general");
    this.viewChannelList();
    this.intervalId = setInterval(() => {
      let msg = this.data.getChannelDetails(this.currentChannel);
      msg.subscribe(next => {
        // console.log("next",next);
        if (next.messages_count > this.messageCount) {
          this.recieveMessage(this.currentChannel);
        }
      })
    }, 2000)

    if (!this.checkUser()) {
      this.createUser();
    }

  }
  ngOnDestroy() {

    clearInterval(this.intervalId);
  }

}
