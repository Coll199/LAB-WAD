import { Injectable }     from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Game } from '../models/game.model'

@Injectable()
export class GameService{
	api_url = 'http://localhost:3000/game/';
	constructor (private http: HttpClient) {}

	getGames(): Observable<Game[]> {
		 return this.http.get<Game[]>('http://localhost:3000/gameList')
	}

	addGame(id:number,type:string){
    	let headers = new HttpHeaders();
    	headers.append('Content-Type','application/json');
    	var game = {
      		gid:id,
      		type:type
    	}
    	return this.http.post(this.api_url,game,{headers: headers});
    }

  deleteGame(id:number){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.delete(this.api_url+id,{headers: headers});
  }
}