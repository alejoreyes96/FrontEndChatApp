import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';

export interface GroupChatsConfig {
  GroupChats: any[]

}
export interface OwnerConfig {
  Owner: any

}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }) 
}; 
@Injectable({
  providedIn: 'root',
})
export class GroupChatService {
  constructor(private http:HttpClient) { 
  }

    userId: number;
    chatUrl: string;
    getChats(data){
      this.createChatUrl(data);
      return this.http.get<GroupChatsConfig>(this.chatUrl);
    }
    createChatUrl(data){
      this.chatUrl = 'http://127.0.0.1:5000/FFMA/users/'+data+'/groupChats/';

    }
    getAllChats(){
      this.chatUrl = 'http://127.0.0.1:5000/FFMA/groupChats/';
      return this.http.get<GroupChatsConfig>(this.chatUrl);
   
    }
    getOwner(data){
      this.chatUrl = 'http://127.0.0.1:5000/FFMA/groupChats/'+data+'/owner/';
      return this.http.get<OwnerConfig>(this.chatUrl);

    }
    
}
