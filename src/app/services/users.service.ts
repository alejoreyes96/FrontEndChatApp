import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Config {
  Users: any[]

}
export interface OwnerConfig {
  Owner: any[]

}
@Injectable({
  providedIn: 'root'
})

export class UsersService {
  chatUrl: string;
  getUsers(){
    this.chatUrl = 'http://127.0.0.1:5000/FFMA/users'

    return this.http.get<Config>(this.chatUrl);
  }
  getUsersInChat(data){
    this.chatUrl = 'http://127.0.0.1:5000/FFMA/users/1/groupChats/'+data+'/users';
    return this.http.get<Config>(this.chatUrl);
    
  }
  getOwner(data){
    console.log(data)
    this.chatUrl = 'http://127.0.0.1:5000/FFMA/groupChats/'+data+'/owner/';
    return this.http.get<OwnerConfig>(this.chatUrl);
    
  }
  constructor(private http:HttpClient) { }
}
