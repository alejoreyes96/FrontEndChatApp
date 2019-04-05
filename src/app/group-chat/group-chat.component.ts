import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  messages: any[] = [{
    text: "This is me",
    date: new Date(),
    reply: false,
    type: 'text',
    files: null,
    user:{
      name:'Bot',
      avatar:'https://i.gifer.com/no.gif'
    }
  }];


  sendMessage(event: any) {
    
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: '',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'Ale',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
}
}
