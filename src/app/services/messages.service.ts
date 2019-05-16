import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Config {
  Messages: any[]

}


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  localUrl: string = "127.0.0.1:5000";
  ngrokUrl: string = "1c98dd52.ngrok.io";
  chatUrl: string;
  getMessages(uid, gid){
    this.chatUrl = 'http://'+this.localUrl+'/FFMA/users/'+uid+'/groupChats/'+gid+'/messages';
    return this.http.get<Config>(this.chatUrl);
  }
  

  constructor(private http:HttpClient) { }
}
