import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as _ from 'lodash';
import { map } from 'rxjs/operators'
import { GroupChatService } from '../services/group-chat.service';
import { UsersService } from '../services/users.service';
import { MessagesService } from '../services/messages.service';

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [GroupChatService, UsersService, MessagesService]
})

export class DashboardComponent implements OnInit {
  config: Config = {
    GroupChats: ["No GroupChats to be Shown"]
  }
  messageConfig: MessageConfig = {
    Messages: ["No Messages to be Shown"]
  }
  userConfig: UserConfig  = {
    Users: ["No Users to be Shown"]
  }
  test: any;
  bool: boolean = false;
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
         
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },

      ];
    })
  );
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  showChats(){
   this.bool = true;
    // this.service.getChats()
    // .subscribe(resp => {
    //   this.config = {...resp.body};
    // });
    (async () => { 
      // Do something before delay
      
 
  
  
      this.service.getAllChats()
      .subscribe((data: Config) => this.config = {

        GroupChats: data['GroupChats']
      });

      await this.delay(50);
  


  })();
    
  }
  constructor(private breakpointObserver: BreakpointObserver, private service: GroupChatService, private messageService: MessagesService, private userService: UsersService) {
  }

  ngOnInit() {
    this.showChats()
  }
}
