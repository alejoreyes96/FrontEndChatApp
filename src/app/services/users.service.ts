import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Config {
  Users: any[]

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
  userUrl: string;
  getUsers(){
    this.userUrl = 'http://127.0.0.1:5000/FFMA/users/'
    return this.http.get<Config>(this.userUrl);
  }
  getUserInfo(id){
    this.userUrl = 'http://127.0.0.1:5000/FFMA/users/'+id+'/profile'
    return this.http.get<Config>(this.userUrl);
  }
  getUsersInChat(data){
    this.userUrl = 'http://127.0.0.1:5000/FFMA/users/1/groupChats/'+data+'/users';
    return this.http.get<Config>(this.userUrl);
    
  }
  constructor(private http:HttpClient) { }
}
