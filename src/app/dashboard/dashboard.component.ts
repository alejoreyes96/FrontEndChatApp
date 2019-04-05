import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as _ from 'lodash';
import { map } from 'rxjs/operators'
import { GroupChatService } from '../services/group-chat.service';

export interface Config {
  gcreation_date: string;
  gid: number;
  gname: string;
  gpicture_id: string;
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
  bool: boolean;
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  showChats(){
    this.bool = true;
    this.service.getChats()
    .subscribe(resp => {
      this.config = {...resp.body };
    });

    
      console.log(this.config)
 

  }
  constructor(private breakpointObserver: BreakpointObserver, private service: GroupChatService) {}

  ngOnInit() {
    this.service.yes();
    
  }
}
