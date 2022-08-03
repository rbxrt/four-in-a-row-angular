import { createReducer, on } from '@ngrx/store';
import { setGameover, switchPlayer, resetGame, GameStateProps } from './gameState.action';

export const initialState: GameStateProps = {
  gameover: false,
  tie: false,
  player: 0
};


export const gameStateReducer = createReducer(
  initialState,
  on(setGameover, (state, {gameover, tie}): GameStateProps => ({...state, 
    gameover: gameover ?? false, 
    tie: tie ?? false 
  })),
  on(switchPlayer, (state): GameStateProps => ({ ...state, 
    player: (state.player + 1) % 2 
  })),
  on(resetGame, (): GameStateProps => initialState)
);
