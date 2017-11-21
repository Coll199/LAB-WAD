import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { ValidateService } from '../../services/validate.service'
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

interface RegisterResponse{
  success: boolean,
  msg: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  private user: User = {
    email: '',
  	username: '',
  	password: ''
  };


  constructor(
    private authService:AuthService,
    private validateService: ValidateService,
    private router: Router
    ) { }

  ngOnInit() {
  }

   onClickMe(email:string, username: string, password: string) {
    this.user.email = email;
    this.user.username = username;
    this.user.password = password;

    
    this.authService.registerUser(this.user).subscribe(res => {
      let response = <RegisterResponse> res;
      if(response.success){
        console.log(response.msg);
        this.router.navigate(['login']);
      }
      else{
        console.log(response.msg);
        this.router.navigate(['register']);
      }
    })

    
  }
}
