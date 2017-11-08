import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  private auth: boolean = false;

  constructor() { }

  setAuth(auth: boolean): void{
    this.auth = auth;
    console.log(auth);
  }

   getAuth(): boolean{
    return this.auth;
  }
}