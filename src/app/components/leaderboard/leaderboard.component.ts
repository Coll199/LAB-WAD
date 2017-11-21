import { Component, OnInit } from '@angular/core';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  players: Player[]=[
  {name: 'Mr.Nice', score: 5000},
  {name: 'Rubberman', score: 222},
  {name: 'Bombasto', score: 411},
  {name: 'Dr.Strange', score: 603},
  {name: 'Dyama', score: 15},
  {name: 'Magma', score: 50},
  {name: 'Tornado', score: 1200},
  ];
  constructor() { }

  ngOnInit() {
  }

}
