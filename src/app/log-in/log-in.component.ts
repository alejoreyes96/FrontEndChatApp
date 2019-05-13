import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
// import { truncate } from 'fs';

// import { AlertService, AuthenticationService } from '../_services';

export interface UserConfig {
    Users: any[]
  }
  export interface UserConfig2 {
    Users: any
  }

@Component({
    selector: 'app-log-in',
  styleUrls: ['./log-in.component.css'],
    templateUrl: 'log-in.component.html'
})

export class LogInComponent implements OnInit {
    @ViewChild('username', {read: ElementRef}) username: ElementRef<HTMLElement>;
    @ViewChild('password', {read: ElementRef}) password: ElementRef<HTMLElement>;
    validUsername: boolean;
    validPassword: boolean;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    condition = false;

    currentUser: string = "";

    constructor(
        // private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UsersService
        // private authenticationService: AuthenticationService,
        // private alertService: AlertService
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // }
        this.validUsername = false;

        this.validPassword = false;

        // this.handleChange = this.handleChange.bind(this);

        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    setCurrentUser(user){
      this.currentUser = user;
    }

    userConfig: UserConfig = {
        Users: ["No Users to be Shown"]
      }

      userConfig2: UserConfig2 = {
        Users: ["No Users to be Shown"]
      }  

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });

        this.getUsers();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    checkValid(username, password){
        
        // if(this.loginForm['username'] == undefined || this.loginForm['username'].length == 0){
        //     this.validUsername = false;
        // }else{
        //     this.validUsername = true;
        // }

        // if(this.loginForm['password'] == undefined || this.loginForm['password'].length < 6){
        //     this.validUsername = false;
        // }else{
        //     this.validUsername = true;
        // }
        if(this.username == undefined || this.username == null || this.username.nativeElement.nodeValue.length == 0){
            this.validUsername = false;
        }else{
            this.validUsername = true;
        }

        if(this.password == undefined || this.password == null || this.password.nativeElement.nodeValue.length < 6){
            this.validPassword = false;
        }else{
            this.validPassword = true;
        }
        console.log("works")
        console.log(this.validUsername)
        console.log(username)
        console.log(this.validPassword)
        console.log(password)
    }
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        // this.authenticationService.login(this.f.username.value, this.f.password.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }

    tryLogin(username, password){
      (async () => {
        await this.delay(500);

        let found = false;
        for(let i = 0; i < this.userConfig.Users.length; i++){
            this.getUserInfo(this.userConfig.Users[i].uid);
            await this.delay(200);
            if(this.userConfig2.Users[i].user_name === username.value && this.userConfig2.Users.hupassword === password.value){
                found = true;
                break;
            }
            await this.delay(200);
        }
        if(found){
          this.router.navigateByUrl('/dashboard');
        }

      })();
    }

    // setState(name, value){
    //     [name]:value;
    // }

    handleChange(e){
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    // this.setState({
    //     [name]:value
    // });
}

    // handleSubmit(e){
    // e.preventDefault();
    // this.validEmail = this.validateEmail(this.state.email);
    // if(!this.validEmail){
    //     console.log('Not Valid!');
    // }
    // console.log('The form was submitted with the following data:');
    // console.log(this.state);
// }

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

}

// import { Component, OnInit } from '@angular/core';


// @Component({
//   selector: 'app-log-in',
//   templateUrl: './log-in.component.html',
//   styleUrls: ['./log-in.component.css']
// })

// export class LogInComponent implements OnInit {
//   validEmail: boolean;
//   state: any = [{
//     email: '',
//     password: ''
//   }]
//   constructor() {
  

//     this.validEmail = false;

    // this.handleChange = this.handleChange.bind(this);

//     this.handleSubmit = this.handleSubmit.bind(this);
// }
//  setState(name: any){
//   this.state.email = name;
//  }

// handleChange(e){
//     let target = e.target;
//     let value = target.type === 'checkbox' ? target.checked : target.value;
//     let name = target.name;

//     this.setState({
//         [name]:value
//     });
// }

// handleSubmit(e){
//     e.preventDefault();
//     this.validEmail = this.validateEmail(this.state.email);
//     if(!this.validEmail){
//         console.log('Not Valid!');
//     }
//     console.log('The form was submitted with the following data:');
//     console.log(this.state);
// }

// validateEmail(inputText){
//     var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if(inputText.match(mailformat)){
//         //document.form1.text1.focus();
//         return true;
//         } else {
//             alert("You have entered an invalid email address!");
//             //document.form1.text1.focus();
//             return false;
//         }
//     }
//   ngOnInit() {
//   }

// }
