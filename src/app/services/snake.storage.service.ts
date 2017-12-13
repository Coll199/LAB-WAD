import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

interface User{
  id: string,
  username: string,
  email: string
}

@Injectable()
export class BestScoreManager {

  private ngxSnake = 'ngx_snake';
  api_url = 'http://localhost:3000/score';

  constructor(private http:HttpClient) { }

  public store(score: number) {
    let user = <User>JSON.parse(localStorage.getItem('user'));
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    localStorage.setItem(this.ngxSnake, JSON.stringify({ 'best_score': score }));
    var scores = {
      username:user.username,
      score:score
    }
    if(score > 1){
      this.http.post(this.api_url,scores,{headers: headers}).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
    }

  }

  public retrieve() {
    let storage = this.parse();
    if (!storage) {
      this.store(0);
      storage = this.parse();
    }

    return storage.best_score;
  }

  private parse() {
    return JSON.parse(localStorage.getItem(this.ngxSnake));
  }
}
