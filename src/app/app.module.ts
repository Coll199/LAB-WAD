import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { GameService } from './services/game.service';
import { ValidateService } from './services/validate.service';
import { LeaderboardService } from './services/leaderboard.service';
import { BestScoreManager } from './services/snake.storage.service';
import { DynamicCreateService } from './services/dynamic.create.service';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { SnakeComponent } from './components/snake/snake.component';
import { GamesComponent } from './components/games/games.component';
import { LeaderboardsComponent } from './components/leaderboards/leaderboards.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    LeaderboardComponent,
    SnakeComponent,
    GamesComponent,
    LeaderboardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  entryComponents: [SnakeComponent,LeaderboardComponent],
  providers: [
    AuthService,
    ValidateService,
    GameService,
    LeaderboardService,
    BestScoreManager,
    DynamicCreateService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
