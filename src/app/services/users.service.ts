import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Config {
  Users: any[]

}
@Injectable({
  providedIn: 'root'
})

export class UsersService {
  chatUrl = 'http://127.0.0.1:5000/FFMA/users'
  getUsers(){
    return this.http.get<Config>(this.chatUrl);
  }
  constructor(private http:HttpClient) { }
}
