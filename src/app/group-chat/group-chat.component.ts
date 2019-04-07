import { Component, OnInit } from '@angular/core';
import { GroupChatService } from '../services/group-chat.service';
import { MessagesService } from '../services/messages.service';
import { UsersService } from '../services/users.service';

export interface Config {
  GroupChats: any[]
  
}
export interface MessageConfig {
  Messages: any[]
  
}
export interface UserConfig {
  Users: any[]
}



@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {

  constructor(private service: GroupChatService, private messageService: MessagesService, private userService: UsersService) { }
  config: Config = {
    GroupChats: ["No GroupChats to be Shown"]
  }
  messageConfig: MessageConfig = {
    Messages: ["No Messages to be Shown"]
  }
  userConfig: UserConfig  = {
    Users: ["No Users to be Shown"]
  }
  file: any[] =[{
    url: '',
    type: '',
    icon: '',
  }]
  
  ngOnInit() {
    this.getMessages();

  }
  messages: any[] = [{
    text: "This is me",
    date: new Date(),
    reply: false,
    type: 'text',
    files: null,
    user:{
      name:'Bot',
      avatar:'https://i.gifer.com/no.gif'
    }
  }];
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  getMessages(){
     // this.service.getChats()
     // .subscribe(resp => {
     //   this.config = {...resp.body};
     // });
     (async () => { 
       // Do something before delay
       
       
       this.userService.getUsers()
         .subscribe((data: UserConfig) => this.userConfig = {
   
           Users: data['Users']
         });
      
       await this.delay(50);
   
   
    
       
       for(var j=0;j<this.userConfig.Users.length;j++){

       this.service.getChats(this.userConfig.Users[j].uid)
       .subscribe((data: Config) => this.config = {
 
         GroupChats: data['GroupChats']
       });
 
       await this.delay(50);
        this.messageService.getMessages(this.userConfig.Users[j].uid, this.config.GroupChats[0].gid)
        .subscribe((data: MessageConfig) => this.messageConfig = {
  
          Messages: data['Messages']
        });
        await this.delay(50);

        for(var i=0;i<this.messageConfig.Messages.length;i++){
         
          if(this.messageConfig.Messages[i].uid == this.userConfig.Users[j].uid){
            this.loadMessage(this.messageConfig.Messages[i],this.userConfig.Users[j]);
        }
        
        }
       } 
      
 
   })();
     
   }
   loadMessage(event: any, event2: any) {
     let mtype = 'text';
     if(event.mpath != undefined &&event.mpath !='' && event.mpath != null&&event.mpath !='NULL' &&event.mpath !='null' ){
      mtype = 'file'
     }
     const files =   [{
      
      url: event.mpath,
      type: event.mtype,
      icon: '',
    }]; 
 
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
  sendMessage(event: any) {
    
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: '',
      };
    });
    console.log(files)

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'Ale',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
}

}
