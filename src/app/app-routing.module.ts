import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { GamesComponent } from './components/games/games.component';
import { SnakeComponent } from './components/snake/snake.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LeaderboardsComponent } from './components/leaderboards/leaderboards.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'leaderboards', component: LeaderboardsComponent},
  { path: 'games', component: GamesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
