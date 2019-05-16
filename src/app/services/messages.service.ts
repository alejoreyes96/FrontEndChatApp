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
  // ngrokUrl: string = "1c98dd52.ngrok.io";
  ngrokUrl: string = 'localhost:5000';

  chatUrl: string;
  getMessages(uid, gid){
    this.chatUrl = 'http://'+this.ngrokUrl+'/FFMA/users/'+uid+'/groupChats/'+gid+'/messages';
    return this.http.get<Config>(this.chatUrl);
  }
  

  constructor(private http:HttpClient) { }
}
