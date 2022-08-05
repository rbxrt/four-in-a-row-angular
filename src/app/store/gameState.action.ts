import { createAction, props } from '@ngrx/store';

export interface GameStateProps {
    gameover: boolean; 
    draw: boolean;
    player: number;
}

export enum GameStateActions {
  SetGameover = '[Play Component] Winner set',
  SwitchPlayer = '[Play Component] Player switched',
  ResetGame = '[Play Component] Game restarted'
}

export const setGameover = createAction(GameStateActions.SetGameover, props<{props: Partial<GameStateProps>}>());
export const switchPlayer = createAction(GameStateActions.SwitchPlayer);
export const resetGame = createAction(GameStateActions.ResetGame);