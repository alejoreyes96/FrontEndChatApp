import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject(1);
  private user = new BehaviorSubject("");
  private hash = new BehaviorSubject([]);
  private dislike = new BehaviorSubject([]);
  private like = new BehaviorSubject([]);
  private messages = new BehaviorSubject([]);
  private reply = new BehaviorSubject([]);


  currentMessage = this.messageSource.asObservable();
  currentUser = this.user.asObservable();
  currentHash = this.hash.asObservable();
  currentLike = this.like.asObservable();
  currentDislike = this.dislike.asObservable();
  currentMessages = this.messages.asObservable();
  currentReply = this.reply.asObservable();

  constructor(private http: HttpClient) { }

  changeGid(message: number) {
    this.messageSource.next(message);

  }

  login(username: string) {
    sessionStorage.setItem('user',username);

    // See if we have an autosave value
    // (this will only happen if the page is accidentally refreshed)
    if (sessionStorage.getItem("autosave")) {
      // Restore the contents of the text field
    }
      this.user.next(sessionStorage.getItem("user"));

    // // Listen for changes in the text field
    // field.addEventListener("change", function () {
    //   // And save the results into the session storage object
    //   sessionStorage.setItem("autosave", field.nodeValue);

    // });
  }
  // stats(hash, like, dislike, messages, reply) {
  //   this.hash.next(hash);
  //   this.like.next(like);
  //   this.dislike.next(dislike);
  //   this.messages.next(messages);
  //   this.reply.next(reply);

  // }
}