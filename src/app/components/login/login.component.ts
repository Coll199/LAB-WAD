import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User = {
  	username: '',
  	password: ''
  };

  //placeholder will be implemented into an auth service
  private auth: boolean = false;

  constructor(private userService: UserService,private authService: AuthService) { }

  ngOnInit() {
  }

  onClickMe(username: string, password: string) {
    this.user.username = username;
    this.user.password = password;
    console.log(this.user);
    if(this.user.username && this.user.password){
      this.userService.check(this.user).subscribe(res => this.auth = res as boolean);
    }
    console.log(this.auth);
    this.authService.setAuth(this.auth);   
  }

  getauth() : boolean{
  	return this.auth;
  }
}
