import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { StatsService } from '@services/stats.service';
import { tap } from 'rxjs';

import * as GameStateActions from './gameState.action';
import { AppState, selectCurrentPlayer } from './store.selectors';

@Injectable()
export class StoreEffects {
  private readonly statsService = inject(StatsService);
  private readonly store = inject<Store<AppState>>(Store);
  private readonly actions = inject(Actions);

  //automatically update local storage after the "setGameover" event fires.
  persistWinner$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(GameStateActions.setGameover),
        concatLatestFrom(() => this.store.select(selectCurrentPlayer)),
        tap(([{ props: { draw: isDraw } }, player]) => {
          if(isDraw) {
            this.statsService.increaseDrawCounter();
          } else if(player === 0) {
            this.statsService.increaseRedCounter();
          } else {
            this.statsService.increaseYellowCounter();
          }          
        }),
      );
    },
    { dispatch: false },
  );
}
