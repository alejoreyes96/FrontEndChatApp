import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  Stats: any[]

}
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  ngrokUrl: string = "1c98dd52.ngrok.io";
chatUrl: string;
  getHashStats(){
    this.chatUrl = 'http://'+this.ngrokUrl+'/FFMA/Stats/Hashtags';
    return this.http.get<Config>(this.chatUrl);
  }
  getLikeStats(){
    this.chatUrl = 'http://'+this.ngrokUrl+'/FFMA/Stats/LikesPerDay';
    return this.http.get<Config>(this.chatUrl);
  }
  getDislikeStats(){
    this.chatUrl = 'http://'+this.ngrokUrl+'/FFMA/Stats/DislikesPerDay';
    return this.http.get<Config>(this.chatUrl);
  }
  getRepliesStats(){
    this.chatUrl = 'http://'+this.ngrokUrl+'/FFMA/Stats/RepliesPerDay';
    return this.http.get<Config>(this.chatUrl);
  }
  getMessageStats(){
    this.chatUrl = 'http://'+this.ngrokUrl+'/FFMA/Stats/MessagesPerDay';
    return this.http.get<Config>(this.chatUrl);
  }
  

  constructor(private http:HttpClient) { }
}


