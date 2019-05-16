import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  Stats: any[]

}
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  localUrl: string = "127.0.0.1:5000";
  ngrokUrl: string = "1c98dd52.ngrok.io";
chatUrl: string;
  getHashStats(){
    this.chatUrl = 'http://'+this.localUrl+'/FFMA/Stats/Hashtags';
    return this.http.get<Config>(this.chatUrl);
  }
  getLikeStats(){
    this.chatUrl = 'http://'+this.localUrl+'/FFMA/Stats/LikesPerDay';
    return this.http.get<Config>(this.chatUrl);
  }
  getDislikeStats(){
    this.chatUrl = 'http://'+this.localUrl+'/FFMA/Stats/DislikesPerDay';
    return this.http.get<Config>(this.chatUrl);
  }
  getRepliesStats(){
    this.chatUrl = 'http://'+this.localUrl+'/FFMA/Stats/RepliesPerDay';
    return this.http.get<Config>(this.chatUrl);
  }
  getMessageStats(){
    this.chatUrl = 'http://'+this.localUrl+'/FFMA/Stats/MessagesPerDay';
    return this.http.get<Config>(this.chatUrl);
  }
  getUserStats(){
    this.chatUrl = 'http://'+this.localUrl+'/FFMA/Stats/MostActiveUsers';
    return this.http.get<Config>(this.chatUrl);
  }
  

  constructor(private http:HttpClient) { }
}


