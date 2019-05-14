import { Component, OnInit, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as _ from 'lodash';
import { GroupChatService } from '../services/group-chat.service';
import { UsersService } from '../services/users.service';
import { MessagesService } from '../services/messages.service';
import { DataService } from '../services/data.service';
import { StatisticsService } from '../services/statistics.service';

export interface Config {
  GroupChats: any[]
  
}
export interface MessageConfig {
  Messages: any[]
  
}
export interface UserConfig {
  Users: any[]
}
export interface HashConfig {
  Stats: any[]
}

declare var $: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [GroupChatService, UsersService, MessagesService, StatisticsService]
})


export class DashboardComponent implements OnInit {
  public gid: number;
  config: Config = {
    GroupChats: ["No GroupChats to be Shown"]
  };
  messageConfig: MessageConfig = {
    Messages: ["No Messages to be Shown"]
  };
  userConfig: UserConfig  = {
    Users: ["No Users to be Shown"]
  };
  hashConfig: HashConfig  = {
    Stats: ["No Hashtags to be Shown"]
  };
  test: any;
  GroupChat: any[] = [

  ];

  dataset: any[] = new Array();
  
  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

getUsers() {
  (async () => {
    // Do something before delay


    this.userService.getUsers()
      .subscribe((data: UserConfig) => this.userConfig = {

        Users: data['Users']
      });
    await this.delay(50);
  })();

}
  showChats(){
  
    (async () => { 
      // Do something before delay
      
 
  
  
      this.service.getAllChats()
      .subscribe((data: Config) => this.config = {

        GroupChats: data['GroupChats']
      });

      await this.delay(50);
     
  })();
    
  }

  createChat(name){
    (async () => { 
      // Do something before delay
      
 
      this.service.createGroupChat(this.userConfig.Users[6].uid, JSON.parse(JSON.stringify({ gname: name, gpicture_id: 'id.jpg' })))
      .subscribe(chat => this.GroupChat.push(chat))  

      await this.delay(50);
      this.showChats();


  })();
  }
  
  showModal(): void {
    $("#myModal").modal('show');
  }
  sendModal(name): void {
    console.log(name.value);
    this.createChat(name.value);
    this.hideModal();
  }
  hideModal(): void {
    document.getElementById('close-modal').click();
  }

  getHashStats(){
    (async () => { 

    this.stats.getHashStats()
    .subscribe((data: HashConfig) => this.hashConfig = {
      Stats: data['Stats']
      
    });
    await this.delay(50);
    for(var i =0; i<this.hashConfig.Stats.length;i++){
      
        this.dataset.push([this.hashConfig.Stats[i].Hashtag, this.hashConfig.Stats[i].Times_Used]);
    }
  })();

  } 
  
  refresh(): void {
    window.location.reload();
}
  getGid(gid){
    this.data.changeGid(gid);
    console.log(gid)
  }
  constructor(private stats: StatisticsService, private data: DataService, private breakpointObserver: BreakpointObserver, private service: GroupChatService, private messageService: MessagesService, private userService: UsersService) {
  }

  ngOnInit() {
    // this.refresh();
    this.getUsers();
    this.getHashStats();
    this.showChats();
    this.data.currentMessage.subscribe(message => this.gid = message)

  }
}
