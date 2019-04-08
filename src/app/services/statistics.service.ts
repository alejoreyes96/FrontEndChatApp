import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  Stats: any[]

}
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
chatUrl: string;
  getHashStats(){
    this.chatUrl = 'http://127.0.0.1:5000/FFMA/Stats/Hashtags';
    return this.http.get<Config>(this.chatUrl);
  }
  

  constructor(private http:HttpClient) { }
}


