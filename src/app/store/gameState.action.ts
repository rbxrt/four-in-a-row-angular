import { createAction, props } from '@ngrx/store';

export interface GameStateProps {
    gameover: boolean; 
    tie: boolean;
    player: number;
  }

export const setGameover = createAction('[Play Component] Set winner', props<Partial<GameStateProps>>());
export const switchPlayer = createAction('[Play Component] Switch player');
export const resetGame = createAction('[Play Component] Reset');