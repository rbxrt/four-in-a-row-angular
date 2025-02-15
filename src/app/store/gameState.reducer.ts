import { createReducer, on } from '@ngrx/store';
import { GameStateProps } from 'types';

import { resetGame, setGameover, switchPlayer } from './gameState.action';

const randomBeginner = () => Math.random() < 0.5 ? 0 : 1;

export const initialState: GameStateProps = {
  gameover: false,
  draw: false,
  player: randomBeginner(),
};

export const gameStateReducer = createReducer(
  initialState,
  on(setGameover, (state, { props }): GameStateProps => ({ ...state, gameover: props.gameover ?? false, draw: props.draw ?? false })),
  on(switchPlayer, (state): GameStateProps => ({ ...state, player: (state.player + 1) % 2 })),
  on(resetGame, (): GameStateProps => initialState),
);
