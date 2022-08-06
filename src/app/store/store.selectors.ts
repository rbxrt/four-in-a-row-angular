import { createSelector } from '@ngrx/store';
import { ColorEnum, GameSettingsProps, GameStateProps, ResultEnum } from 'types';

export interface AppState {
  gameState: GameStateProps;
  settings: GameSettingsProps;
}

export const selectGameState = (state: AppState) => state.gameState;
export const selectGameSettings = (state: AppState) => state.settings;

export const selectIsGameover = createSelector(selectGameState, (state: GameStateProps) => state.gameover);

export const selectWinner = createSelector(selectGameState, (state: GameStateProps) => {
  if (state.gameover) {
    if (state.draw) {
      return ResultEnum.None;
    } else {
      return state.player === 0 ? ResultEnum.Red : ResultEnum.Yellow;
    }
  }
  return ResultEnum.None;
});

export const selectCurrentPlayer = createSelector(selectGameState, (state: GameStateProps) => state.player);

export const selectCurrentColor = createSelector(selectGameState, (state: GameStateProps) => (state.player === 0 ? ColorEnum.RED : ColorEnum.YELLOW));

export const selectWidth = createSelector(selectGameSettings, (state: GameSettingsProps) => state.width);

export const selectHeight = createSelector(selectGameSettings, (state: GameSettingsProps) => state.height);
