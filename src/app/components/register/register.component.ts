import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  private user: User = {
  	username: '',
  	password: ''
  };


  constructor(private userService: UserService) { }

  ngOnInit() {
  }

   onClickMe(username: string, password: string) {
    this.user.username = username;
    this.user.password = password;
    console.log(this.user);
    if(this.user.username && this.user.password){
      this.userService.create(this.user).subscribe(res => console.log(res));
    }
  }
}
