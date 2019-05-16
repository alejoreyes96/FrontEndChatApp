import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public user: string;
  title = 'chatApp';
  logout(){
    sessionStorage.setItem('user','');
  }
  ngOnInit(){
    setInterval(()=>{this.user = sessionStorage.getItem('user') }, 250);

  }
 
}
