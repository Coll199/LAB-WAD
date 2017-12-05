import { Component, OnInit } from '@angular/core';
import { Score } from '../../models/score.model';
import { LeaderboardService } from '../../services/leaderboard.service'

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  scores: Score[];
  constructor(private leaderboardService: LeaderboardService) { }

  getScores(): void {
    this.leaderboardService.getScores()
      .subscribe(
      scores => {
        this.scores = scores;
        console.log('this.scores=' + this.scores);
        console.log('this.scores.length=' + this.scores.length);
        console.log('this.scores[0].username=' + this.scores[0].username);
      }, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      })
    }


  ngOnInit() {
    this.getScores();
  }

}
