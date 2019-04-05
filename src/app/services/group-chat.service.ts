import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Config {
  GroupChats: any[]

}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}; 
@Injectable({
  providedIn: 'root'
})
export class GroupChatService {
 
    chatUrl = 'http://127.0.0.1:5000/FFMA/users/1/groupChats/'
    getChats(){
      return this.http.get<Config>(this.chatUrl);
    }
    
  constructor(private http:HttpClient) { }
}
