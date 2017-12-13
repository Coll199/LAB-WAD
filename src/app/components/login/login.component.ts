import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface LoginResponse{
  success: boolean,
  msg: string,
  token: string,
  user:{
    id: string,
    username: string,
    email: string
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {



  //placeholder will be implemented into an auth service
  private auth: boolean = false;

  constructor(
    private authService: AuthService,
    private router:Router
    ) { }

  ngOnInit() {
  }

  onClickMe(username: string, password: string) {
    var user = {
      username: username,
      password: password
    }

    this.authService.authenticateUser(user).subscribe(res => {
      let response = <LoginResponse> res;
      if(response.success){
        console.log(response);
        this.authService.storeUserData(response.token,response.user);
        this.router.navigate(['profile']);
      } else {
        console.log(response.msg);
        this.router.navigate(['login']);
      }
    })

 

  }
}
