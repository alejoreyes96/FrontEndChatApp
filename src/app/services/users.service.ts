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

export interface UserConfig {
  User: any

}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }) 
}; 

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  found = false;
  localUrl: string = "127.0.0.1:5000";
  ngrokUrl: string = "1c98dd52.ngrok.io";
  userUrl: string;
  addUser (userConfig: UserConfig): Observable<UserConfig>{
    this.userUrl = 'http://'+this.localUrl+'/FFMA/register/';
    console.log(this.userUrl);
    return this.http.post<UserConfig>(this.userUrl, userConfig, httpOptions);
  }
  modifyUser (id, userConfig: UserConfig): Observable<UserConfig>{
    this.userUrl = 'http://'+this.localUrl+'/FFMA/users/' + id + '/profile';
    console.log(this.userUrl);
    return this.http.put<UserConfig>(this.userUrl, userConfig, httpOptions);
  }
  getUsers(){
    this.userUrl = 'http://'+this.localUrl+'/FFMA/users/'
    return this.http.get<Config>(this.userUrl);
  }
  getUserInfo(id){
    this.userUrl = 'http://'+this.localUrl+'/FFMA/users/'+id+'/profile'
    return this.http.get<Config>(this.userUrl);
  }
  getUsersInChat(data){
    this.userUrl = 'http://'+this.localUrl+'/FFMA/users/1/groupChats/'+data+'/users';
    return this.http.get<Config>(this.userUrl); 
  }
  getOwner(data){
    console.log(data)
    this.userUrl = 'http://'+this.localUrl+'/FFMA/groupChats/'+data+'/owner/';
    return this.http.get<OwnerConfig>(this.userUrl);
    
  }
  setFound(cond){
    this.found = cond;
  }
  constructor(private http:HttpClient) { }
}
