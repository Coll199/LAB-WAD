import {  Component, Input, OnInit, OnDestroy, 
    ViewChild, ViewContainerRef } from '@angular/core';

import { Game } from '../../models/game.model';
import { SnakeComponent } from '../snake/snake.component';
import { DynamicCreateService } from '../../services/dynamic.create.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
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
    this.service.createDynamicComponent(this.container,SnakeComponent,id);
  }

  addGame(){
    this.gameService.addGame(this.games.length+1,"snake").subscribe(res =>{
      console.log(res);
    })
    this.createComponent(this.games.length+1);
    this.games.push(new Game(this.games.length+1,"snake"));
  }

  deleteLast(){
    this.gameService.deleteGame(this.games.length)
      .subscribe(
      response => {
        console.log(response);
        this.container.remove();
        this.games.pop();
      }, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      })
  }
  
  ngOnDestroy() {  
  }

}
