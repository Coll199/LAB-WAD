import { Component, OnInit } from '@angular/core';
import { Score } from '../../models/score.model';
import { LeaderboardService } from '../../services/leaderboard.service'

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  players: Score[]=[
  {name: 'Mr.Nice', score: 5000},
  {name: 'Rubberman', score: 222},
  {name: 'Bombasto', score: 411},
  {name: 'Dr.Strange', score: 603},
  {name: 'Dyama', score: 15},
  {name: 'Magma', score: 50},
  {name: 'Tornado', score: 1200},
  ];
  scores: Score[];
  constructor(private leaderboardService: LeaderboardService) { }

  getScores(): void {
    this.leaderboardService.getScores()
      .subscribe(
      scores => {
        this.scores = scores;
        console.log('this.scores=' + this.scores);
        console.log('this.scores.length=' + this.scores.length);
        console.log('this.scores[0]=' + this.scores[0]);
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
