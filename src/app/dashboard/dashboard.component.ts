import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as _ from 'lodash';
import { map } from 'rxjs/operators'
import { GroupChatService } from '../services/group-chat.service';

export interface Config {
  GroupChats: any[]
  
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [GroupChatService]
})

export class DashboardComponent implements OnInit {
  config: Config;
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

  showChats(){
   this.bool = true;
    // this.service.getChats()
    // .subscribe(resp => {
    //   this.config = {...resp.body};
    // });

    
    //   console.log(this.config)
    this.config = {
      GroupChats: ["No GroupChats to be Shown"]
    }
    this.service.getChats()
      .subscribe((data: Config) => this.config = {

        GroupChats: data['GroupChats']
      });

  }
  constructor(private breakpointObserver: BreakpointObserver, private service: GroupChatService) {}

  ngOnInit() {
    this.showChats()
  }
}
