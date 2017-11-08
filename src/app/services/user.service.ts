import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

@Injectable()
export class UserService {

  private api_url = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  check(user: User) {
  	const url = `${this.api_url}/login`;

        return this.http.post(url, user);
   }

  create(user: User) {
	const url = `${this.api_url}/register`;

        return this.http.post(url, user);
   }

}