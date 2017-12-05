import { Injectable }     from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Score } from '../models/score.model'

@Injectable()
export class LeaderboardService{
	constructor (private http: HttpClient) {}

	getScores(): Observable<Score[]> {
		 return this.http.get<Score[]>('http://localhost:3000/scoreList')
	}
}