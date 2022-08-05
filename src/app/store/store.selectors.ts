import { createSelector } from '@ngrx/store';
import { ColorEnum, ResultEnum } from '../types/game';
import { GameSettingsProps } from './gameSettings.action';
import { GameStateProps } from './gameState.action';

export interface AppState {
  gameState: GameStateProps;
  settings: GameSettingsProps;
}

export const selectGameState = (state: AppState) => state.gameState;
export const selectGameSettings = (state: AppState) => state.settings;
 
export const selectGameover = createSelector(
  selectGameState,
  (state: GameStateProps) => state.gameover
);

export const selectWinner = createSelector(
  selectGameState,
  (state: GameStateProps) => { 
    if(state.gameover) {
      if(state.draw) {
        return ResultEnum.None;
      } else {
        return state.player === 0 ? ResultEnum.Red : ResultEnum.Yellow;
      }
    }
    return ResultEnum.None;
  }
);

export const selectPlayer = createSelector(
  selectGameState,
  (state: GameStateProps) => state.player
);

export const selectColor = createSelector(
  selectGameState,
  (state: GameStateProps) => state.player === 0 ? ColorEnum.RED : ColorEnum.YELLOW
);
