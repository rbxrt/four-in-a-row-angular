import { createSelector } from '@ngrx/store';
import { GameStateProps } from './gameState.action';

export interface AppState {
  gameState: GameStateProps
}

export const selectGameState = (state: AppState) => state.gameState;
 
export const selectGameover = createSelector(
  selectGameState,
  (state: GameStateProps) => state.gameover
);

export const selectPlayer = createSelector(
  selectGameState,
  (state: GameStateProps) => state.player
);

export const selectTie = createSelector(
  selectGameState,
  (state: GameStateProps) => state.tie
);