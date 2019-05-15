import { Injectable, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';


export interface GroupChatsConfig {
  GroupChats: any[]

}
export interface UserConfig {
  User: any

}
export interface MessageConfig {
  mmessage: any, 
      mupload_date: any, 
      msize: number, 
      mlength: number, 
      mtype:any,
        mhashtag: any,
         image: any

}
export interface GroupChatConfig {
  GroupChat: any

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

    ngrokUrl: string = "1c98dd52.ngrok.io";
    chatUrl: string;
    
    getAllChats(){
      this.chatUrl = 'http://'+this.ngrokUrl+'/FFMA/groupChats/';
      return this.http.get<GroupChatsConfig>(this.chatUrl);
    }
    addUserToChat (userid1, groupchatid, userConfig: UserConfig): Observable<UserConfig>{
      this.chatUrl = 'http://'+this.ngrokUrl+'/FFMA/users/'+userid1+'/groupChats/'+groupchatid+'/users/';
      console.log(this.chatUrl);
      return this.http.post<UserConfig>(this.chatUrl, userConfig, httpOptions);
  
    }
    addMessage (userid1, groupchatid, userConfig: MessageConfig): Observable<MessageConfig>{
      this.chatUrl = 'http://'+this.ngrokUrl+'/FFMA/users/'+userid1+'/groupChats/'+groupchatid+'/messages/';
      console.log(this.chatUrl);
      return this.http.post<MessageConfig>(this.chatUrl, userConfig, httpOptions);
  
    }

    createGroupChat (userid1, userConfig: GroupChatConfig): Observable<GroupChatConfig>{
      this.chatUrl = 'http://'+this.ngrokUrl+'/FFMA/users/'+userid1+'/groupChats/';
      console.log(this.chatUrl);
      return this.http.post<GroupChatConfig>(this.chatUrl, userConfig, httpOptions);
  
    }
    
 
    
}
