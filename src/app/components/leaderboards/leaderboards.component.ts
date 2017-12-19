import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { Game } from '../../models/game.model';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { DynamicCreateService } from '../../services/dynamic.create.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css']
})
export class LeaderboardsComponent implements OnInit {
 @ViewChild("container", { read: ViewContainerRef }) container;
 games: Game[];


 constructor(private service: DynamicCreateService,
    private gameService: GameService) {}

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames()
      .subscribe(
      games => {
        this.games = games;
        for(var i=1;i<=this.games.length;i++){
          this.createComponent(i);
        }
      }, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      })
    }

  createComponent(id) {
    this.service.createDynamicComponent(this.container,LeaderboardComponent,id);
  }
}
