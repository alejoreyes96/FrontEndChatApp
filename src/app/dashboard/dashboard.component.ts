import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as _ from 'lodash';
import { map } from 'rxjs/operators'
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
  }
  messageConfig: MessageConfig = {
    Messages: ["No Messages to be Shown"]
  }
  userConfig: UserConfig  = {
    Users: ["No Users to be Shown"]
  }
  hashConfig: HashConfig  = {
    Stats: ["No Hashtags to be Shown"]
  }
  test: any;
  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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

  getHashStats(){
    (async () => { 

    this.stats.getHashStats()
    .subscribe((data: HashConfig) => this.hashConfig = {
      Stats: data['Stats']
      
    });
    await this.delay(50);
  })();

  }
  
  getGid(gid){
    this.data.changeGid(gid-1);
    console.log(gid)
  }
  constructor(private stats: StatisticsService, private data: DataService, private breakpointObserver: BreakpointObserver, private service: GroupChatService, private messageService: MessagesService, private userService: UsersService) {
  }

  ngOnInit() {
    this.getHashStats();
    this.showChats();
    this.data.currentMessage.subscribe(message => this.gid = message)

  }
}
