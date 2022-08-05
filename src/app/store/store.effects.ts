import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { StatsService } from "../services/stats.service";
import { setGameover } from "./gameState.action";
import { AppState, selectPlayer } from "./store.selectors";
import { map, tap } from "rxjs"

@Injectable()
export class StoreEffects {
 
  //automatically update local storage after the "setGameover" event fires.
  persistWinner$ = createEffect(() => { 
    return this.actions.pipe(
      ofType(setGameover),
      concatLatestFrom(() => this.store.select(selectPlayer)),
      map(([_, player]) => player),
      tap((p) => p === 0
          ? this.statsService.increaseRedCounter()
          : this.statsService.increaseYellowCounter()
    ));
  }, {dispatch: false});
  
  constructor(
    private readonly statsService: StatsService,
    private readonly store: Store<AppState>,
    private readonly actions: Actions,
  ) {}
}