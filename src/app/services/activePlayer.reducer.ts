import { createReducer, on } from '@ngrx/store';
import { switchPlayer, reset } from './activePlayer.action';

export const initialState = 0;

export const activePlayerReducer = createReducer(
  initialState,
  on(switchPlayer, (state): number => state + 1),
  on(reset, () => 0)
);