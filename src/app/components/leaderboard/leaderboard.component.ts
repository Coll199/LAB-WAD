import { Component, OnInit } from '@angular/core';
import { Score } from '../../models/score.model';
import { LeaderboardService } from '../../services/leaderboard.service'

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  id:number;
  scores: Score[];
  constructor(private leaderboardService: LeaderboardService) { }

  getScores(): void {
    this.leaderboardService.getScores()
      .subscribe(
      scores => {
        this.scores = scores;
      }, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      })
    }

  getScoresById(id){
    this.leaderboardService.getScoresById(id)
      .subscribe(
      scores => {
        this.scores = scores;
      }, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      })
  }

  ngOnInit() {
    this.getScoresById(this.id);
  }

}
