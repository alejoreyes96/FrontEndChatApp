import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
// import { AlertService, UserService, AuthenticationService } from '@/_services';

export interface UserConfig {
    Users: any[]
  }

  export interface UserConfig2 {
    Users: any
  }

@Component({
    templateUrl: 'register.component.html',
    selector: 'app-register',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    pfirst = "First name";
    plast = "Last name";
    pbirth = "Birth date";
    pphone = "Phone number";
    pusername = "Username";
    pemail = "Email address";
    ppassword = "Password";
    ppassword2 = "Retype password";

    addedUser: any[] = [{
   
    }]
    constructor(
        // private formBuilder: FormBuilder,
        private router: Router,
        private userService: UsersService
        // private authenticationService: AuthenticationService,
        // private userService: UserService,
        // private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // }
    }

    userConfig: UserConfig = {
        Users: ["No Users to be Shown"]
      }

      userConfig2: UserConfig2 = {
        Users: ["No Users to be Shown"]
      }  

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    getUsers() {
        (async () => {
        // Do something before delay

    
        this.userService.getUsers()
          .subscribe((data: UserConfig) => this.userConfig = {
    
            Users: data['Users']
          });
          await this.delay(1000);

        })();
      }

      getUserInfo(id) {
        (async () => {
        // Do something before delay
    
        this.userService.getUserInfo(id)
          .subscribe((data: UserConfig2) => this.userConfig2 = {
            Users: data['Users']
          });
        })();
      }

    ngOnInit() {
        this.registerForm = new FormGroup({
          firstName: new FormControl(),
          lastName: new FormControl(),
          username: new FormControl(),
          password: new FormControl()
      });
      this.getUsers();
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
      let month = Number(month0) + Number(month1);
      let day = Number(day0) + Number(day1);
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
          }else if(month >= 8 ){
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
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    addUser(first_name, last_name, birthdate, phone_number, username, email, password) {
  
      (async () => {
        await this.delay(250);
  
        this.userService.addUser(JSON.parse(JSON.stringify({ first_name: first_name.value, last_name: last_name.value, birth_date: birthdate.value, 
          phone: phone_number.value, username: username.value, email: email.value, password: password.value})))
          .subscribe(user => this.addedUser.push(user))
        await this.delay(500);
        this.getUsers();
  
      })();
    }

    onSubmit(first_name, last_name, birthdate, phone_number, username, email, password) {
        this.submitted = true;
        console.log("On Submit");
        if(!this.empty(first_name) && !this.empty(last_name) && this.validBirthdate(birthdate) && !this.empty(birthdate) && this.validPhone(phone_number)
        && !this.empty(phone_number) && this.checkUsername(username) && username.value.length >= 4 && this.checkEmail(email) && password.value.length >= 8){
          this.addUser(first_name, last_name, birthdate, phone_number, username, email, password);
          this.router.navigateByUrl('/log-in');
        }
    }
}