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

    firstNameEmpty(first_name){
        let empty = true;
        if(first_name.value.length > 0)
            empty = false;

        console.log("Empty: ", empty);
        return empty;
    }

    checkUsername(username){
        let valid = false;
        if(username.value.length > 2 && !this.verifyUsername(username.value)){
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
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        console.log("On Submit");
        // stop here if form is invalid
        // if (this.registerForm.invalid) {
        //     return;
        // }

        // this.loading = true;
        // this.userService.register(this.registerForm.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.alertService.success('Registration successful', true);
        //             this.router.navigate(['/login']);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }
}