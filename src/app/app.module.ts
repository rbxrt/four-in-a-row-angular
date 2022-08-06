import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GameoverComponent } from './components/gameover/gameover.component';
import { MaterialModule } from './material.module';
import { gameSettingsReducer } from './store/gameSettings.reducer';
import { gameStateReducer } from './store/gameState.reducer';
import { StoreEffects } from './store/store.effects';
import { AppState } from './store/store.selectors';
import { HomeComponent } from './views/home/home.component';
import { PlayComponent } from './views/play/play.component';
import { SettingsComponent } from './views/settings/settings.component';
import { StatsComponent } from './views/stats/stats.component';

@NgModule({
  declarations: [AppComponent, PlayComponent, StatsComponent, SettingsComponent, HomeComponent, GameoverComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot<AppState>({
      gameState: gameStateReducer,
      settings: gameSettingsReducer,
    }),
    EffectsModule.forRoot([StoreEffects]),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
