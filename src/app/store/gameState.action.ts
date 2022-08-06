import { createAction, props } from '@ngrx/store';
import { GameStateProps } from 'types';

enum GameStateActions {
  SetGameover = '[Play Component] Winner set',
  SwitchPlayer = '[Play Component] Player switched',
  ResetGame = '[Play Component] Game restarted',
}

export const setGameover = createAction(GameStateActions.SetGameover, props<{ props: Partial<GameStateProps> }>());
export const switchPlayer = createAction(GameStateActions.SwitchPlayer);
export const resetGame = createAction(GameStateActions.ResetGame);
