import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface UserConfig {
  Users: any[]
}
export interface UserConfig2 {
  Users: any
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  pfirst: string = "This is the first name";
  plast: string = "This is the lastname holder";
  pbirth: string = "This is the birth date holder";
  pphone: string = "This is the phone holder";
  pemail: string = "This is the email holder";
  ppassword: string = "This is the password holder";
  temp_pass: string = "";
  constructor(
    private router: Router,
    private userService: UsersService,
    private data: DataService) { }

  userConfig: UserConfig = {
    Users: ["No Users to be Shown"]
  }

  userConfig2: UserConfig2 = {
    Users: ["No Users to be Shown"]
  }

  submitted = false;
    addedUser: any[] = [{
   
    }]
  user: string;
  uid: number;
  number: number;
  profile_picture: string;

  ngOnInit() {
    this.data.currentUser.subscribe(user => this.user = user);
    console.log(this.user);
    this.getUsers();

  }

  setVariables() {
    console.log("Inside setVariables");
    this.pfirst = this.userConfig2.Users.first_name;
    this.plast = this.userConfig2.Users.last_name;
    this.pbirth = this.userConfig2.Users.birthdate;
    this.pphone = this.userConfig2.Users.phone_number;
    this.pemail = this.userConfig2.Users.huemail;
    this.ppassword = this.userConfig2.Users.hupassword;
    console.log("Length of password: ", this.ppassword.length);
    for (var i = 0; i < this.ppassword.length; i++) {
      var str: string = "*";
      this.temp_pass = this.temp_pass.concat(str);
      console.log(str);
      console.log(this.temp_pass);
    }
    console.log(this.temp_pass);
    console.log("First Name: ", this.pfirst);
    console.log("Last Name: ", this.plast);
    console.log("Birth Date: ", this.pbirth);
    console.log("Phone: ", this.pphone);
    console.log("Email: ", this.pemail);
    console.log("Password: ", this.ppassword);
  }

  findProfile() {
    console.log("Inside findProfile");
    console.log("Length of userConfig = ", this.userConfig.Users.length);
    for (var i = 0; i < this.userConfig.Users.length; i++) {
      if (this.user == this.userConfig.Users[i].uname) {
        this.number = i;
        this.uid = this.userConfig.Users[i].uid;
        this.profile_picture = this.userConfig.Users[i].profile_picture;
        console.log("this.number = ", this.number, "uid = ", this.userConfig.Users[i].uid)
        this.getUserInfo(this.userConfig.Users[i].uid);
        break;
      }
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  getUsers() {
    console.log("Inside getUsers");
    (async () => {
      // Do something before delay


      this.userService.getUsers()
        .subscribe((data: UserConfig) => this.userConfig = {

          Users: data['Users']
        });
      await this.delay(1000);
      this.findProfile();
    })();
  }
  getUserInfo(id) {
    console.log("Inside getUserInfo of: ", id);
    (async () => {
      // Do something before delay

      this.userService.getUserInfo(id)
        .subscribe((data: UserConfig2) => this.userConfig2 = {
          Users: data['Users']
        });
      await this.delay(200);
      console.log(this.userConfig2.Users);
      this.setVariables();
    })();
  }

  empty(param){
    let empty = true;
    if(param.value.length > 0)
        empty = false;

    console.log("Empty: ", empty);
    return empty;
}

validBirthdate(birthdate){
  let valid = false;
  let month0 = birthdate.value[0];
  let month1 = birthdate.value[1];
  let day0 = birthdate.value[3];
  let day1 = birthdate.value[4];
  let year0 = birthdate.value[6];
  let year1 = birthdate.value[7];
  let year2 = birthdate.value[8];
  let year3 = birthdate.value[9];
  let month = Number(month0)*10 + Number(month1);
  let day = Number(day0)*10 + Number(day1);
  let year = Number(year0)*1000 + Number(year1)*100 + Number(year2)*10 + Number(year3);
  let dayValid = false;
  let monthValid = false;
  let yearValid = false;
  if(birthdate.value.length == 10 && birthdate.value[2] == '/' && birthdate.value[5] == '/'){
    if(year >= 0){
      yearValid = true;
    }
    if(month >= 1 && month <= 12){
      monthValid = true;
    }
    if(day >= 1 && day <= 31){
      dayValid = true;
    }
    if(dayValid && monthValid && yearValid){
      if(month <= 7 && month%2 == 0){
        if(day <= 30 && month != 2){
          valid = true;
        }else if(month == 2 && year %4 == 0){
          if(day <= 29){
            valid = true;
          }
        }else if(month == 2){
          if(day <= 28){
            valid = true;
          }
        }
      }else if(month <= 7){
        valid = true;
      }else if(month >= 8 && month%2 == 1){
        if(day <= 30){
          valid = true;
        }
      }
    }
  }
  return valid;
}

validPhone(phone_number){
  let valid = false;
  if(!isNaN(Number(phone_number.value)) && phone_number.value.length == 10){
    valid = true;
  }
  return valid;
}

checkUsername(username){
    let valid = false;
    if(!this.verifyUsername(username.value)){
        valid = true;
    }
    console.log("Valid?", valid)
    return valid;
}

verifyUsername(username){
    let found = false;
        for(let i = 0; i < this.userConfig.Users.length; i++){
            if(this.userConfig.Users[i].uname === username){
                found = true;
                break;
            }
        }
      return found;
}

checkEmail(email){
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(email.value.match(mailformat)){
      // document.form1.text1.focus();
      return true;
      } else {
          // alert("You have entered an invalid email address!");
          //document.form1.text1.focus();
          return false;
      }
  }

  modifyUser(first_name, last_name, birthdate, phone_number, email, password) {
  
    (async () => {
      await this.delay(250);

      this.userService.modifyUser(this.uid, JSON.parse(JSON.stringify({ first_name: first_name.value, last_name: last_name.value, birth_date: birthdate.value, 
        phone: phone_number.value, username: this.user, email: email.value, password: password.value, profile_picture: this.profile_picture})))
        .subscribe(user => this.addedUser.push(user))
      await this.delay(250);
      this.getUsers();

    })();
  }

  onSubmit(first_name, last_name, birthdate, phone_number, email, password) {
    this.submitted = true;
    console.log("On Submit");
    if (!this.empty(first_name) && !this.empty(last_name) && this.validBirthdate(birthdate) && !this.empty(birthdate) && this.validPhone(phone_number)
      && !this.empty(phone_number) && this.checkEmail(email) && password.value.length >= 8) {
      this.modifyUser(first_name, last_name, birthdate, phone_number, email, password);
      this.router.navigateByUrl('/dashboard');
    }
  }

}
