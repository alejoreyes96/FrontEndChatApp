import { Component, OnInit } from '@angular/core';
import { GroupChatService } from '../services/group-chat.service';
import { MessagesService } from '../services/messages.service';
import { UsersService } from '../services/users.service';
import { DataService } from '../services/data.service';

export interface Config {
  GroupChats: any[]

}
export interface MessageConfig {
  Messages: any[]

}
export interface UserConfig {
  Users: any[]
}
export interface User {
  User: any
}

export interface OwnerConfig {
  Owner: any

}
declare var $: any;

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})

export class GroupChatComponent implements OnInit {

  constructor(private data: DataService, private service: GroupChatService, private messageService: MessagesService, private userService: UsersService) { }
  gid: number;
  gindex: number;
  ownerConfig: OwnerConfig = {
    Owner: 'No owner found'
  }
  config: Config = {
    GroupChats: ["No GroupChats to be Shown"]
  }
  messageConfig: MessageConfig = {
    Messages: ["No Messages to be Shown"]
  }
  userConfig: UserConfig = {
    Users: ["No Users to be Shown"]
  }
  usersInChatConfig: UserConfig = {
    Users: ["No Users to be Shown"]
  }
  userC: User = {
    User: ""
  }
  file: any[] = [{
    url: '',
    type: '',
    icon: '',
  }]
  addedUser: any[] = [{
   
  }]
  addMessage: any[] = [{

  }]

  ngOnInit() {
    this.getUsers();
    this.getGroupChats();
    this.data.currentMessage.subscribe(message => this.gid = message)
    this.getMessages();
    this.getUsersInChat();

  }
  showModal(): void {
    $("#myModal").modal('show');
  }
  sendModal(username): void {
    console.log(username.value)
    this.addUserToChat(username.value);
    this.hideModal();
  }
  hideModal(): void {
    document.getElementById('close-modal').click();
  }

  messages: any[] = [{
    text: "Welcome to the chat !!",
    date: new Date(),
    reply: false,
    type: 'text',
    files: null,
    user: {
      name: 'Bot',
      avatar: 'https://i.gifer.com/no.gif'
    }
  }];
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  getUsers() {
    (async () => {
      // Do something before delay


      this.userService.getUsers()
        .subscribe((data: UserConfig) => this.userConfig = {

        Users: data['Users']
      });
      await this.delay(1000);

    })();
  }
  getGroupChats() {
    (async () => {
      // Do something before delay
      this.service.getAllChats()
        .subscribe((data: Config) => this.config = {

          GroupChats: data['GroupChats']
        });
      await this.delay(250);
      this.getGIndex();

    })();
  }
  getGIndex(){
    for(var i=0; i<this.config.GroupChats.length;i++){
      if(this.gid == this.config.GroupChats[i].gid){
        console.log(i);
        this.gindex = i;
      }
    }
    console.log(this.gindex);
    console.log(this.gid)
  }

  getUsersInChat() {
    (async () => {
      this.userService.getUsersInChat(this.gid)
        .subscribe((data: UserConfig) => this.usersInChatConfig = {

          Users: data['Users']
        });
      await this.delay(250);

      this.userService.getOwner(this.gid)
        .subscribe((data: OwnerConfig) => this.ownerConfig = {

          Owner: data['Owner']
        });
      await this.delay(250);

    })();
  }
  addUserToChat(username) {
    var uid2: number;
    console.log(this.userConfig);

    (async () => {
      await this.delay(250);

      for (var i = 0; i < this.userConfig.Users.length; i++) {
        if (this.userConfig.Users[i].uname == username)
          uid2 = this.userConfig.Users[i].uid;
      }
      console.log(this.userConfig);
      this.service.addUserToChat(this.userConfig.Users[6].uid, this.gid, JSON.parse(JSON.stringify({ uid: uid2 })))
        .subscribe(user => this.addedUser.push(user))
      await this.delay(250);
      this.getUsersInChat();

    })();


  }
  getMessages() {
    // this.service.getChats()
    // .subscribe(resp => {
    //   this.config = {...resp.body};
    // });
    (async () => {
      // Do something before delay
      await this.delay(350);
      this.messages[0].text = "Welcome to " + this.config.GroupChats[this.gindex].gname + "!!";


        this.messageService.getMessages(this.userConfig.Users[6].uid, this.config.GroupChats[this.gindex].gid)
          .subscribe((data: MessageConfig) => this.messageConfig = {

            Messages: data['Messages']
          });
      
      await this.delay(50);
      console.log(this.messageConfig)

      for (var i = 0; i < this.messageConfig.Messages.length; i++) {
        for (var k = 0; k < this.userConfig.Users.length; k++) {

          if (this.messageConfig.Messages[i].uid == this.userConfig.Users[k].uid) {
            this.loadMessage(this.messageConfig.Messages[i], this.userConfig.Users[k]);

          }

        }
      }


    })();

  }
  loadMessage(event: any, event2: any) {
    let mtype = 'text';
    if (event.mpath != undefined && event.mpath != '' && event.mpath != null && event.mpath != 'NULL' && event.mpath != 'null') {
      mtype = 'file'
    }
    const files = [{

      url: event.mpath,
      type: event.mtype,
      icon: '',
    }];
    if(event2 == this.userConfig.Users[6]){
      this.messages.push({
        text: event.mmessage,
        date: event.mupload_date,
        reply: true,
        type: mtype,
        files: files,
        user: {
          name: event2.uname,
          avatar: event2.profile_picture,
        },
      });
    }
    else{
      this.messages.push({
        text: event.mmessage,
        date: event.mupload_date,
        reply: false,
        type: mtype,
        files: files,
        user: {
          name: event2.uname,
          avatar: event2.profile_picture,
        },
      });
    }
   
  }
  sendMessage(event: any) {
    
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: '',
      };
    });
    var hashtag = '';
    if(event.message.match(/#\w+/g)){

      hashtag = event.message.match(/#\w+/g);
      console.log(hashtag);
    }
    (async () => {
      this.service.addMessage(this.userConfig.Users[6].uid, this.gid, JSON.parse(JSON.stringify({mmessage: event.message, mupload_date: new Date(), msize: 10, mlength: 5, mtype:"", mpath: "", mhashtag: hashtag })))
        .subscribe(message => this.addMessage.push(message))
      await this.delay(250);
    })();
    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: this.userConfig.Users[6].uname,
        avatar: this.userConfig.Users[6].profile_picture,
      },
    });
  }

}
