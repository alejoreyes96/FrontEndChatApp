import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject(1);
  private user = new BehaviorSubject("");

  currentMessage = this.messageSource.asObservable();
  currentUser = this.user.asObservable();
  constructor() { }

  changeGid(message: number) {
    this.messageSource.next(message);

  }
  login(username: string){
    this.user.next(username);
  }

}