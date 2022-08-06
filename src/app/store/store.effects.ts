import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StatsService } from '@services/stats.service';
import { map, tap } from 'rxjs';

import * as GameSettingsActions from './gameSettings.action';
import * as GameStateActions from './gameState.action';
import { AppState, selectCurrentPlayer } from './store.selectors';

@Injectable()
export class StoreEffects {
  //automatically update local storage after the "setGameover" event fires.
  persistWinner$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(GameStateActions.setGameover),
        concatLatestFrom(() => this.store.select(selectCurrentPlayer)),
        map(([_, player]) => player),
        tap((p) => (p === 0 ? this.statsService.increaseRedCounter() : this.statsService.increaseYellowCounter())),
      );
    },
    { dispatch: false },
  );

  //automatically update local storage after the "setGameover" event fires.
  persistDimensions$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(GameSettingsActions.setBoardDimensions),
        concatLatestFrom(() => this.store.select(selectCurrentPlayer)),
        map(([_, player]) => player),
        tap((p) => (p === 0 ? this.statsService.increaseRedCounter() : this.statsService.increaseYellowCounter())),
      );
    },
    { dispatch: false },
  );

  constructor(private readonly statsService: StatsService, private readonly store: Store<AppState>, private readonly actions: Actions) {}
}
