import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  validEmail: boolean;
  state: any = [{
    email: '',
    password: ''
  }]
  constructor() {
  

    this.validEmail = false;

    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
}
 setState(name: any){
  this.state.email = name;
 }

handleChange(e){
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
        [name]:value
    });
}

handleSubmit(e){
    e.preventDefault();
    this.validEmail = this.validateEmail(this.state.email);
    if(!this.validEmail){
        console.log('Not Valid!');
    }
    console.log('The form was submitted with the following data:');
    console.log(this.state);
}

validateEmail(inputText){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.match(mailformat)){
        //document.form1.text1.focus();
        return true;
        } else {
            alert("You have entered an invalid email address!");
            //document.form1.text1.focus();
            return false;
        }
    }
  ngOnInit() {
  }

}
