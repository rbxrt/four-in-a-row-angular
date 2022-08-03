import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PlayComponent } from './views/play/play.component';
import { StatsComponent } from './views/stats/stats.component';
import { SettingsComponent } from './views/settings/settings.component';
import { HomeComponent } from './views/home/home.component';

import { GameoverComponent } from './components/gameover/gameover.component';
import { gameStateReducer } from './store/gameState.reducer';

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    StatsComponent,
    SettingsComponent,
    HomeComponent,
    GameoverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ gameState: gameStateReducer }),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
